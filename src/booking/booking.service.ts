import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';
import * as crypto from 'crypto';
import PDFDocument from 'pdfkit';

@Injectable()
export class BookingService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  private generateBookingCode(): string {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = crypto.randomBytes(2).toString('hex').toUpperCase();
    return `OJ-${dateStr}-${random}`;
  }

  async createBooking(userId: string, dto: CreateBookingDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { userProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const layanan = await this.prisma.layanan.findUnique({
      where: { id: dto.serviceId },
    });

    if (!layanan) {
      throw new NotFoundException('Layanan tidak ditemukan');
    }

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

    const rawDateStr =
      typeof dto.scheduledDate === 'string'
        ? dto.scheduledDate.split('T')[0]
        : new Date(dto.scheduledDate).toISOString().split('T')[0];

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

    const totalPrice = layanan.harga;
    const dpAmount = Math.ceil(totalPrice * 0.5);
    const remainingAmount = totalPrice - dpAmount;
    const bookingCode = this.generateBookingCode();

    const booking = await this.prisma.$transaction(async (prisma) => {
      const newBooking = await prisma.booking.create({
        data: {
          bookingCode,
          userId,
          psychologistId: dto.psychologistId,
          serviceId: dto.serviceId,
          scheduleId: schedule.id,
          scheduledDate,
          scheduledTime: dto.scheduledTime,
          totalPrice,
          dpAmount,
          remainingAmount,
          status: 'PENDING_DP',
          notes: dto.notes,
        },
      });

      const dpExpiry = new Date(Date.now() + 60 * 60 * 1000);

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
            ...(dto.consultationForm as any),
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
          } as any,
        });
      }

      return newBooking;
    });

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

  async approveBooking(bookingId: number, adminId: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: { include: { userProfile: true } },
        psychologist: { include: { user: true } },
        service: true,
        payments: true, // 🟢 1. Pastikan payments di-include
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

    const rawDateStr = booking.scheduledDate.toISOString().split('T')[0];

    // 🟢 2. Ambil metode bayar DP yang digunakan (QRIS / Bank Transfer)
    const dpPayment = booking.payments?.find((p) => p.type === 'DOWN_PAYMENT');
    const rawMethod = (dpPayment?.method || '').toUpperCase();
    const formattedPaymentMethod = rawMethod.includes('QRIS')
      ? 'QRIS'
      : rawMethod.includes('MANDIRI')
      ? 'Transfer Bank Mandiri'
      : rawMethod.includes('BCA')
      ? 'Transfer Bank BCA'
      : dpPayment?.method || 'Transfer Bank';

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
        paymentMethod: formattedPaymentMethod, // 🟢 3. Kirim metode bayar yang akurat
      })
      .catch((err) => console.error('Gagal mengirim email approval:', err));

    return {
      message:
        'Booking berhasil di-approve. Email instruksi pelunasan telah dikirimkan ke klien.',
    };
  }

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

  async rescheduleBooking(
    bookingId: number,
    userId: string,
    dto: RescheduleBookingDto,
  ) {
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

    this.emailService
      .sendRescheduleEmails({
        bookingCode: booking.bookingCode,
        userEmail: booking.user.email,
        userName: booking.user.userProfile?.fullName || 'Klien',
        psychologistEmail: booking.psychologist?.user?.email || '',
        psychologistName: booking.psychologist?.fullName || 'Psikolog',
        serviceName: booking.service?.nama || 'Konseling',
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

    return bookings.map(
      (b) => b.scheduledDate.toISOString().split('T')[0],
    );
  }

  async rescheduleBookingByAdmin(
    bookingId: number,
    adminId: string,
    dto: { newDate: string; newTime: string; reason?: string },
  ) {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        user: { include: { userProfile: true } },
        psychologist: { include: { user: true } },
        service: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Data booking tidak ditemukan');
    }

    const rawNewDateStr =
      typeof dto.newDate === 'string'
        ? dto.newDate.split('T')[0]
        : new Date(dto.newDate).toISOString().split('T')[0];

    const newScheduledDate = new Date(`${rawNewDateStr}T00:00:00.000Z`);

    const conflictBooking = await this.prisma.booking.findFirst({
      where: {
        id: { not: bookingId },
        psychologistId: booking.psychologistId,
        scheduledDate: newScheduledDate,
        scheduledTime: dto.newTime,
        status: {
          notIn: ['CANCELLED', 'REJECTED'],
        },
      },
    });

    if (conflictBooking) {
      throw new BadRequestException(
        `Jadwal pada tanggal ${rawNewDateStr} pukul ${dto.newTime} WIB sudah terisi oleh pasien lain.`,
      );
    }

    const oldDateStr = booking.scheduledDate.toISOString().split('T')[0];
    const oldTimeStr = booking.scheduledTime;

    const updatedBooking = await this.prisma.booking.update({
      where: { id: bookingId },
      data: {
        scheduledDate: newScheduledDate,
        scheduledTime: dto.newTime,
        adminApprovedBy: adminId,
        notes: dto.reason ? `[Reschedule: ${dto.reason}]` : booking.notes,
      },
    });

    if (booking.user?.email) {
      this.emailService
        .sendRescheduleEmails({
          bookingCode: booking.bookingCode,
          userEmail: booking.user.email,
          userName: booking.user.userProfile?.fullName || 'Klien Oase Jiwa',
          psychologistEmail: booking.psychologist?.user?.email || '',
          psychologistName: booking.psychologist?.fullName || 'Psikolog',
          serviceName: booking.service?.nama || 'Layanan Konseling',
          scheduledDate: oldDateStr,
          scheduledTime: oldTimeStr,
          newScheduledDate: rawNewDateStr,
          newScheduledTime: dto.newTime,
          totalPrice: booking.totalPrice,
          dpAmount: booking.dpAmount,
          reason: dto.reason || 'Penyesuaian jadwal oleh admin klinik',
        })
        .catch((err: any) =>
          console.error('Gagal mengirim email reschedule:', err),
        );
    }

    return {
      statusCode: 200,
      message:
        'Jadwal booking berhasil diperbarui dan notifikasi email telah dikirimkan.',
      data: updatedBooking,
    };
  }

  async generateConsultationFormPdf(
    userId: string,
    bookingId: number,
  ): Promise<Buffer> {
    const booking = await this.prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        consultationForm: true,
        consentForm: true,
        service: true,
        psychologist: {
          include: {
            user: {
              include: {
                userProfile: true,
              },
            },
          },
        },
        user: {
          include: {
            userProfile: true,
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking tidak ditemukan');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('Anda tidak memiliki akses ke booking ini');
    }

    if (!booking.consultationForm) {
      throw new NotFoundException('Formulir konsultasi belum diisi');
    }

    const cf = booking.consultationForm;
    const consent = booking.consentForm;
    const psychologistName =
      booking.psychologist?.fullName ||
      booking.psychologist?.user?.userProfile?.fullName ||
      'Psikolog';
    const clientName =
      (consent as any)?.clientName ||
      consent?.clientNameConfirmation ||
      booking.user?.userProfile?.fullName ||
      'Klien';
    const serviceName = booking.service?.nama || 'Konseling';
    const scheduledDateStr = booking.scheduledDate
      ? new Date(booking.scheduledDate).toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        })
      : '-';

    return new Promise<Buffer>((resolve, reject) => {
      try {
        const doc = new PDFDocument({
          size: 'A4',
          margin: 40,
          info: {
            Title: `Formulir Konsultasi - ${booking.bookingCode}`,
            Author: 'Oase Jiwa',
          },
        });

        const chunks: Buffer[] = [];
        doc.on('data', (chunk) => chunks.push(chunk));
        doc.on('end', () => resolve(Buffer.concat(chunks)));
        doc.on('error', (err) => reject(err));

        // Format enum helpers
        const formatEnum = (val?: string | null) => {
          if (!val) return '-';
          const dict: Record<string, string> = {
            LESS_THAN_1_MONTH: '< 1 Bulan (Kurang dari 1 bulan)',
            ONE_TO_3_MONTHS: '1 - 3 Bulan',
            THREE_TO_6_MONTHS: '3 - 6 Bulan',
            MORE_THAN_6_MONTHS: '> 6 Bulan (Lebih dari 6 bulan)',
            DAILY: 'Setiap Hari',
            WEEKLY: 'Setiap Minggu',
            MONTHLY: 'Setiap Bulan',
            RARELY: 'Jarang',
            NONE: 'Tidak Ada',
            MILD: 'Ringan',
            MODERATE: 'Sedang',
            SEVERE: 'Berat',
            NEVER: 'Tidak Pernah',
            SOMETIMES: 'Kadang-kadang',
            FREQUENT: 'Sering',
            GOOD: 'Baik',
            FAIR: 'Cukup',
            POOR: 'Buruk',
            DISTURBED: 'Sangat Terganggu',
            REGULAR: 'Teratur',
            IRREGULAR: 'Tidak Teratur',
            OVEREATING: 'Makan Berlebihan',
            UNDEREATING: 'Kurang Nafsu Makan',
            REGULARLY: 'Rutin / Teratur',
            LOW: 'Rendah',
            MODERATE_STRESS: 'Sedang',
            HIGH: 'Tinggi',
            VERY_HIGH: 'Sangat Tinggi',
            DIRECTIVE: 'Direktif (Psikolog memberi arahan & instruksi jelas)',
            COLLABORATIVE:
              'Kolaboratif (Diskusi bersama & eksplorasi solusi)',
            NO_PREFERENCE: 'Tidak Ada Preferensi Khusus',
          };
          return dict[val] || val.replace(/_/g, ' ');
        };

        const formatBoolWithDetail = (
          has: boolean,
          detail?: string | null,
        ) => {
          if (!has) return 'Tidak';
          return detail ? `Ya (${detail})` : 'Ya';
        };

        // Header
        doc
          .fillColor('#0D5C75')
          .fontSize(18)
          .font('Helvetica-Bold')
          .text('OASE JIWA', { align: 'center' });
        doc
          .fillColor('#334155')
          .fontSize(12)
          .font('Helvetica-Bold')
          .text('Formulir Konsultasi Psikologi', { align: 'center' });
        doc.moveDown(0.6);

        // Info Booking Box
        const boxTop = doc.y;
        doc.rect(40, boxTop, 515, 60).fillAndStroke('#F8FAFC', '#CBD5E1');

        doc.fillColor('#1E293B').fontSize(9).font('Helvetica');
        doc
          .text('Kode Booking: ', 52, boxTop + 10, { continued: true })
          .font('Helvetica-Bold')
          .text(booking.bookingCode, { continued: false });
        doc
          .font('Helvetica')
          .text('Layanan: ', 52, boxTop + 24, { continued: true })
          .font('Helvetica-Bold')
          .text(serviceName, { continued: false });
        doc
          .font('Helvetica')
          .text('Nama Klien: ', 52, boxTop + 38, { continued: true })
          .font('Helvetica-Bold')
          .text(clientName, { continued: false });

        doc
          .font('Helvetica')
          .text('Tanggal: ', 300, boxTop + 10, { continued: true })
          .font('Helvetica-Bold')
          .text(scheduledDateStr, { continued: false });
        doc
          .font('Helvetica')
          .text('Waktu: ', 300, boxTop + 24, { continued: true })
          .font('Helvetica-Bold')
          .text(`${booking.scheduledTime} WIB`, { continued: false });
        doc
          .font('Helvetica')
          .text('Psikolog: ', 300, boxTop + 38, { continued: true })
          .font('Helvetica-Bold')
          .text(psychologistName, { continued: false });

        doc.y = boxTop + 70;

        // Garis Pemisah
        doc
          .moveTo(40, doc.y)
          .lineTo(555, doc.y)
          .strokeColor('#CBD5E1')
          .lineWidth(1)
          .stroke();
        doc.moveDown(0.5);

        const renderSectionHeader = (title: string) => {
          if (doc.y > 710) {
            doc.addPage();
          }
          const y = doc.y;
          doc.rect(40, y, 515, 18).fill('#F1F5F9');
          doc
            .fillColor('#0F172A')
            .fontSize(10)
            .font('Helvetica-Bold')
            .text(title, 48, y + 4);
          doc.y = y + 23;
        };

        const renderField = (
          label: string,
          value: string | undefined | null,
        ) => {
          if (doc.y > 750) {
            doc.addPage();
          }
          const startX = 48;
          const labelWidth = 160;
          const curY = doc.y;

          doc
            .fillColor('#475569')
            .fontSize(9)
            .font('Helvetica-Bold')
            .text(label, startX, curY, { width: labelWidth });

          const valueY = curY;
          doc
            .fillColor('#0F172A')
            .fontSize(9)
            .font('Helvetica')
            .text(value || '-', startX + labelWidth + 5, valueY, {
              width: 330,
            });

          doc.moveDown(0.25);
        };

        // A. ALASAN KONSULTASI
        renderSectionHeader('A. ALASAN KONSULTASI');
        renderField('Alasan Utama', cf.mainReason);
        renderField(
          'Tujuan Konsultasi',
          cf.consultationGoals?.length
            ? cf.consultationGoals.join(', ')
            : '-',
        );
        renderField('Durasi Masalah', formatEnum(cf.problemDuration));
        renderField('Frekuensi Gejala', formatEnum(cf.symptomFrequency));
        renderField('Dampak Harian', formatEnum(cf.dailyImpact));

        // B. RIWAYAT KESEHATAN
        renderSectionHeader('B. RIWAYAT KESEHATAN');
        renderField('Pikiran Menyakiti Diri', formatEnum(cf.selfHarmThoughts));
        renderField(
          'Riwayat Serupa',
          formatBoolWithDetail(cf.hasSimilarHistory, cf.similarHistoryDetail),
        );
        renderField(
          'Riwayat Keluarga',
          formatBoolWithDetail(cf.hasFamilyHistory, cf.familyHistoryDetail),
        );
        renderField(
          'Peristiwa Traumatis',
          formatBoolWithDetail(cf.hasTraumaticEvent, cf.traumaticEventDetail),
        );
        renderField(
          'Pengobatan Medis',
          formatBoolWithDetail(
            cf.hasMedicalTreatment,
            cf.medicalTreatmentDetail,
          ),
        );
        renderField(
          'Obat Psikiatri',
          cf.takingPsychiatricMeds ? 'Ya' : 'Tidak',
        );
        renderField(
          'Zat Adiktif',
          formatBoolWithDetail(
            cf.usesAddictiveSubstances,
            cf.addictiveSubstancesDetail,
          ),
        );

        // C. GAYA HIDUP
        renderSectionHeader('C. GAYA HIDUP');
        renderField('Kualitas Tidur', formatEnum(cf.sleepQuality));
        renderField('Pola Makan', formatEnum(cf.eatingPattern));
        renderField('Frekuensi Olahraga', formatEnum(cf.exerciseFrequency));
        renderField('Tingkat Stres', formatEnum(cf.stressLevel));

        // D. PREFERENSI TERAPI
        renderSectionHeader('D. PREFERENSI TERAPI');
        renderField('Preferensi Terapi', formatEnum(cf.therapyPreference));

        // E. PERSETUJUAN
        renderSectionHeader('E. PERSETUJUAN');
        const agreementDate =
          (consent as any)?.agreementDate ||
          consent?.consentDate ||
          consent?.createdAt;
        const agreementDateStr = agreementDate
          ? new Date(agreementDate).toLocaleDateString('id-ID', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })
          : '-';

        renderField('Nama Klien', clientName);
        renderField('Tanggal Persetujuan', agreementDateStr);

        // Tanda tangan
        if (consent?.signatureData) {
          if (doc.y > 670) {
            doc.addPage();
          }
          doc.moveDown(0.4);
          doc
            .fillColor('#475569')
            .fontSize(9)
            .font('Helvetica-Bold')
            .text('Tanda Tangan:', 48);
          doc.moveDown(0.2);

          try {
            const rawSig = consent.signatureData;
            if (rawSig.startsWith('data:image')) {
              const base64Data = rawSig.split('base64,')[1] || rawSig;
              const imgBuffer = Buffer.from(base64Data, 'base64');
              doc.image(imgBuffer, { fit: [140, 50] });
              doc.moveDown(0.5);
            } else if (
              consent.signatureType === 'DRAWING' ||
              rawSig.length > 100
            ) {
              const imgBuffer = Buffer.from(rawSig, 'base64');
              doc.image(imgBuffer, { fit: [140, 50] });
              doc.moveDown(0.5);
            } else {
              doc
                .font('Helvetica-Oblique')
                .fontSize(10)
                .fillColor('#1E293B')
                .text(`( ${rawSig} )`, 52);
              doc.moveDown(0.3);
            }
          } catch {
            doc
              .font('Helvetica-Oblique')
              .fontSize(9)
              .fillColor('#64748B')
              .text(`[Tanda tangan digital: ${clientName}]`, 48);
            doc.moveDown(0.3);
          }
        }

        // Footer
        const nowStr = new Date().toLocaleString('id-ID', {
          timeZone: 'Asia/Jakarta',
          dateStyle: 'full',
          timeStyle: 'medium',
        });
        doc
          .fillColor('#94A3B8')
          .fontSize(8)
          .font('Helvetica')
          .text(
            `Dokumen ini digenerate pada ${nowStr} WIB`,
            40,
            795,
            { align: 'center', width: 515 },
          );

        doc.end();
      } catch (err) {
        reject(err);
      }
    });
  }
}