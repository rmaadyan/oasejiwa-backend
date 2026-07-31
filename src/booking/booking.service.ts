import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service'; // Adjust path sesuai struktur foldermu
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';
import * as crypto from 'crypto';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService, // Inject EmailService
  ) {}

  /**
   * Generate kode booking unik: OJ-YYYYMMDD-XXXX
   */
  private generateBookingCode(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = crypto.randomBytes(2).toString('hex').toUpperCase();
    return `OJ-${dateStr}-${random}`;
  }

  /**
   * USER: Buat booking baru
   */
  /**
   * USER: Buat booking baru
   */
  async createBooking(userId: string, dto: CreateBookingDto) {
    // 1. Validasi User & Profil
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { userProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    // 2. Validasi layanan
    const layanan = await this.prisma.layanan.findUnique({
      where: { id: dto.serviceId },
    });

    if (!layanan) {
      throw new NotFoundException('Layanan tidak ditemukan');
    }

    // 3. Validasi psikolog
    const psychologist = await this.prisma.psychologistProfile.findUnique({
      where: { id: dto.psychologistId },
      include: {
        user: {
          include: { userProfile: true },
        },
      },
    });

    if (!psychologist) {
      throw new NotFoundException('Psikolog tidak ditemukan');
    }

    // 🟢 Ambil string tanggal spesifik pilihan user (contoh: "2026-08-12")
    const rawDateStr =
      typeof dto.scheduledDate === 'string'
        ? dto.scheduledDate.split('T')[0]
        : new Date(dto.scheduledDate).toISOString().split('T')[0];

    // 🟢 4. CARI JADWAL PSIKOLOG (Tanpa membatasi ke date di tabel Schedule)
    let schedule;
    if (dto.scheduleId) {
      schedule = await this.prisma.schedule.findFirst({
        where: {
          id: dto.scheduleId,
          psychologistId: dto.psychologistId,
        },
      });
    } else {
      schedule = await this.prisma.schedule.findFirst({
        where: {
          psychologistId: dto.psychologistId,
          startTime: dto.scheduledTime,
        },
      });
    }

    if (!schedule) {
      throw new BadRequestException('Jadwal psikolog tidak ditemukan.');
    }

    const scheduledDate = new Date(`${rawDateStr}T00:00:00.000Z`);

    // 🟢 Cek apakah slot pada TANGGAL SPESIFIK & JAM tersebut sudah dibooking orang lain
    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        psychologistId: dto.psychologistId,
        scheduledDate,
        scheduledTime: dto.scheduledTime,
        status: {
          notIn: ['CANCELLED', 'REJECTED'],
        },
      },
    });

    if (existingBooking) {
      throw new BadRequestException(
        `Sesi pada tanggal ${rawDateStr} jam ${dto.scheduledTime} sudah dibooking oleh pasien lain.`,
      );
    }

    // Hitung Nominal
    const totalPrice = layanan.harga;
    const dpAmount = Math.ceil(totalPrice * 0.5);
    const remainingAmount = totalPrice - dpAmount;
    const bookingCode = this.generateBookingCode();

    // 5. Simpan ke Database
    const booking = await this.prisma.$transaction(async (prisma) => {
      const newBooking = await prisma.booking.create({
        data: {
          bookingCode,
          userId,
          psychologistId: dto.psychologistId,
          serviceId: dto.serviceId,
          scheduleId: schedule.id,
          scheduledDate, // 👈 TERSIMPAN TANGGAL SPESIFIK DARI PILIHAN USER
          scheduledTime: dto.scheduledTime,
          totalPrice,
          dpAmount,
          remainingAmount,
          status: 'PENDING_DP',
          notes: dto.notes,
        },
      });

      const dpExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 jam

      await prisma.payment.create({
        data: {
          bookingId: newBooking.id,
          type: 'DOWN_PAYMENT',
          amount: dpAmount,
          method: 'PENDING',
          orderId: `DP-${bookingCode}`,
          status: 'PENDING',
          expiredAt: dpExpiry,
        },
      });

      if (dto.consultationForm) {
        await prisma.consultationForm.create({
          data: {
            bookingId: newBooking.id,
            ...dto.consultationForm,
          },
        });
      }

      if (dto.consentForm) {
        await prisma.consentForm.create({
          data: {
            bookingId: newBooking.id,
            consentDate: new Date(dto.consentForm.consentDate),
            clientNameConfirmation: dto.consentForm.clientNameConfirmation,
            signatureData: dto.consentForm.signatureData,
            signatureType: dto.consentForm.signatureType,
            agreedToTerms: dto.consentForm.agreedToTerms,
            ipAddress: dto.consentForm.ipAddress,
          },
        });
      }

      return newBooking;
    });

    // 🚀 TRIGGER EMAIL: Kirim email notifikasi dengan TANGGAL PILIHAN USER
    this.emailService
      .sendNewBookingEmails({
        bookingCode: booking.bookingCode,
        userEmail: user.email,
        userName: user.userProfile?.fullName || 'Klien',
        psychologistEmail: psychologist.user.email,
        psychologistName: psychologist.fullName,
        serviceName: layanan.nama,
        scheduledDate: rawDateStr, // 👈 TERKIRIM TANGGAL PILIHAN USER (contoh: "2026-08-12")
        scheduledTime: dto.scheduledTime,
        totalPrice,
        dpAmount,
        notes: dto.notes,
      })
      .catch((err) => console.error('Gagal mengirim email booking:', err));

    return {
      message: 'Booking berhasil dibuat. Silakan lakukan pembayaran DP.',
      data: {
        id: booking.id,
        bookingCode: booking.bookingCode,
        status: booking.status,
        totalPrice,
        dpAmount,
        remainingAmount,
        scheduledDate: rawDateStr,
        scheduledTime: dto.scheduledTime,
      },
    };
  }

  /**
   * USER: Lihat semua booking miliknya
   */
  async getMyBookings(userId: string) {
    const bookings = await this.prisma.booking.findMany({
      where: { userId },
      include: {
        service: {
          select: { nama: true, jenis: true, kategori: true },
        },
        psychologist: {
          select: { fullName: true, avatarUrl: true },
        },
        payments: {
          select: { type: true, amount: true, status: true, method: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { data: bookings };
  }

  /**
   * USER/ADMIN: Lihat detail booking by ID
   */
  async getBookingById(bookingId: number, userId?: string, role?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            userProfile: {
              select: {
                fullName: true,
                phone: true,
              },
            },
          },
        },
        service: true,
        psychologist: {
          select: {
            id: true,
            fullName: true,
            avatarUrl: true,
            sipp: true,
          },
        },
        payments: true,
        consultationForm: true,
        consentForm: true,
        review: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking tidak ditemukan');
    }

    if (role === 'USER' && booking.userId !== userId) {
      throw new ForbiddenException('Anda tidak memiliki akses ke booking ini');
    }

    return { data: booking };
  }

  /**
   * ADMIN: Lihat semua booking
   */
  async getAllBookings() {
    const bookings = await this.prisma.booking.findMany({
      include: {
        user: {
          select: { id: true, email: true },
        },
        service: {
          select: { nama: true, jenis: true },
        },
        psychologist: {
          select: { fullName: true },
        },
        payments: {
          select: { type: true, amount: true, status: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { data: bookings };
  }

  /**
   * ADMIN: Approve booking
   */
  /**
 * ADMIN: Approve booking (Setelah bukti bayar DP diverifikasi)
 */
async approveBooking(bookingId: number, adminId: string) {
  const booking = await this.prisma.booking.findUnique({
    where: { id: bookingId },
    include: {
      user: { include: { userProfile: true } },
      psychologist: { include: { user: true } },
      service: true,
    },
  });

  if (!booking) {
    throw new NotFoundException('Booking tidak ditemukan');
  }

  if (booking.status !== 'WAITING_APPROVAL') {
    throw new BadRequestException(
      `Booking tidak bisa di-approve. Status saat ini: ${booking.status}`,
    );
  }

  await this.prisma.$transaction(async (prisma) => {
    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        status: 'APPROVED',
        adminApprovedBy: adminId,
        approvedAt: new Date(),
      },
    });

    const fullPaymentExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await prisma.payment.create({
      data: {
        bookingId,
        type: 'FULL_PAYMENT',
        amount: booking.remainingAmount,
        method: 'PENDING',
        orderId: `FP-${booking.bookingCode}`,
        status: 'PENDING',
        expiredAt: fullPaymentExpiry,
      },
    });
  });

  // 🚀 TRIGGER EMAIL: Kirim email konfirmasi DP + instruksi sisa pelunasan
  const rawDateStr = booking.scheduledDate.toISOString().split('T')[0];

  this.emailService
    .sendBookingApprovalEmail({
      bookingCode: booking.bookingCode,
      userEmail: booking.user.email,
      userName: booking.user.userProfile?.fullName || 'Klien',
      psychologistEmail: booking.psychologist.user.email,
      psychologistName: booking.psychologist.fullName,
      serviceName: booking.service.nama,
      scheduledDate: rawDateStr,
      scheduledTime: booking.scheduledTime,
      totalPrice: booking.totalPrice,
      dpAmount: booking.dpAmount,
    })
    .catch((err) => console.error('Gagal mengirim email approval:', err));

  return {
    message:
      'Booking berhasil di-approve. Email instruksi pelunasan telah dikirimkan ke klien.',
  };
}

  /**
   * ADMIN: Reject booking
   */
  async rejectBooking(bookingId: number, adminId: string, reason?: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: { include: { userProfile: true } },
        psychologist: true,
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking tidak ditemukan');
    }

    if (booking.status !== 'WAITING_APPROVAL') {
      throw new BadRequestException(
        `Booking tidak bisa di-reject. Status saat ini: ${booking.status}`,
      );
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          status: 'REJECTED',
          adminApprovedBy: adminId,
          rejectionReason: reason,
        },
      });

      await prisma.schedule.updateMany({
        where: {
          psychologistId: booking.psychologistId,
          date: booking.scheduledDate,
          startTime: booking.scheduledTime,
        },
        data: { isAvailable: true },
      });
    });

    // TRIGGER EMAIL: Kirim email rejection
    this.emailService
      .sendBookingRejectionEmails({
        bookingCode: booking.bookingCode,
        userEmail: booking.user.email,
        userName: booking.user.userProfile?.fullName || 'Klien',
        psychologistEmail: '',
        psychologistName: booking.psychologist.fullName,
        serviceName: booking.service.nama,
        scheduledDate: booking.scheduledDate.toISOString().split('T')[0],
        scheduledTime: booking.scheduledTime,
        totalPrice: booking.totalPrice,
        dpAmount: booking.dpAmount,
        rejectionReason: reason,
      })
      .catch((err) => console.error('Gagal mengirim email rejection:', err));

    return {
      message: 'Booking berhasil di-reject. Jadwal psikolog dibuka kembali.',
    };
  }

  /**
   * USER: Reschedule booking
   */
  async rescheduleBooking(
    bookingId: number,
    userId: string,
    dto: RescheduleBookingDto,
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: { include: { userProfile: true } },
        psychologist: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking tidak ditemukan');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('Anda tidak memiliki akses ke booking ini');
    }

    if (!['APPROVED', 'FULLY_PAID'].includes(booking.status)) {
      throw new BadRequestException(
        `Booking tidak bisa di-reschedule. Status saat ini: ${booking.status}`,
      );
    }

    const newDate = new Date(dto.newScheduledDate);
    const newSchedule = await this.prisma.schedule.findFirst({
      where: {
        psychologistId: booking.psychologistId,
        date: newDate,
        startTime: dto.newScheduledTime,
        isAvailable: true,
      },
    });

    if (!newSchedule) {
      throw new BadRequestException('Jadwal baru yang dipilih tidak tersedia');
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.schedule.updateMany({
        where: {
          psychologistId: booking.psychologistId,
          date: booking.scheduledDate,
          startTime: booking.scheduledTime,
        },
        data: { isAvailable: true },
      });

      await prisma.schedule.update({
        where: { id: newSchedule.id },
        data: { isAvailable: false },
      });

      await prisma.booking.update({
        where: { id: bookingId },
        data: {
          scheduledDate: newDate,
          scheduledTime: dto.newScheduledTime,
        },
      });
    });

    // TRIGGER EMAIL: Kirim email reschedule
    this.emailService
      .sendRescheduleEmails({
        bookingCode: booking.bookingCode,
        userEmail: booking.user.email,
        userName: booking.user.userProfile?.fullName || 'Klien',
        psychologistEmail: '',
        psychologistName: booking.psychologist.fullName,
        serviceName: '',
        scheduledDate: booking.scheduledDate.toISOString().split('T')[0],
        scheduledTime: booking.scheduledTime,
        totalPrice: booking.totalPrice,
        dpAmount: booking.dpAmount,
        newScheduledDate: dto.newScheduledDate,
        newScheduledTime: dto.newScheduledTime,
      })
      .catch((err) => console.error('Gagal mengirim email reschedule:', err));

    return {
      message: 'Booking berhasil di-reschedule.',
      data: {
        bookingId,
        oldDate: booking.scheduledDate,
        oldTime: booking.scheduledTime,
        newDate: dto.newScheduledDate,
        newTime: dto.newScheduledTime,
      },
    };
  }

  async confirmFullPayment(bookingId: number, adminId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
    });

    if (!booking) throw new NotFoundException('Booking tidak ditemukan');

    if (booking.status !== 'APPROVED') {
      throw new BadRequestException(
        `Booking tidak bisa dikonfirmasi. Status saat ini: ${booking.status}`,
      );
    }

    await this.prisma.$transaction(async (prisma) => {
      await prisma.booking.update({
        where: { id: bookingId },
        data: { status: 'FULLY_PAID' },
      });

      const fullPayment = await prisma.payment.findFirst({
        where: { bookingId, type: 'FULL_PAYMENT' },
      });

      if (fullPayment) {
        await prisma.payment.update({
          where: { id: fullPayment.id },
          data: { status: 'PAID', method: 'OFFLINE', paidAt: new Date() },
        });
      } else {
        await prisma.payment.create({
          data: {
            bookingId,
            type: 'FULL_PAYMENT',
            amount: booking.remainingAmount,
            method: 'OFFLINE',
            orderId: `FP-OFFLINE-${booking.bookingCode}`,
            status: 'PAID',
            paidAt: new Date(),
            expiredAt: new Date(),
          },
        });
      }
    });

    return { message: 'Pelunasan berhasil dikonfirmasi.' };
  }

  // 🟢 Helper Mengambil Daftar Tanggal YYYY-MM-DD yang Sudah Terisi
  async getBookedDates(psychologistId: string, time: string) {
    const bookings = await this.prisma.booking.findMany({
      where: {
        psychologistId,
        scheduledTime: time,
        status: {
          notIn: ['CANCELLED', 'REJECTED'],
        },
      },
      select: {
        scheduledDate: true,
      },
    });

    // Kembalikan array string tanggal ["2026-08-01", ...]
    return bookings.map(
      (b) => b.scheduledDate.toISOString().split('T')[0],
    );
  }
}