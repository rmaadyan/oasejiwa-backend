import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type UiSessionStatus = 'upcoming' | 'completed' | 'cancelled';

@Injectable()
export class PsychologistScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPsychologistProfileId(userId: string) {
    const profile = await this.prisma.psychologistProfile.findFirst({
      where: {
        OR: [{ userId }, { id: userId }],
      },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundException('Akun ini bukan psikolog');
    }

    return profile.id;
  }

  private toDateOnly(date: Date) {
    const d = new Date(date);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private mapBookingStatus(status: string): UiSessionStatus {
    const s = String(status || '').toUpperCase();
    if (s === 'COMPLETED' || s === 'SELESAI') return 'completed';
    if (s === 'CANCELLED' || s === 'REJECTED' || s === 'BATAL') return 'cancelled';
    return 'upcoming';
  }

  private mapPaymentStatus(payments: any[]): 'paid' | 'pending' {
    const hasFullPaid = payments.some(
      (payment) => payment.type === 'FULL_PAYMENT' && String(payment.status).toUpperCase() === 'PAID',
    );
    if (hasFullPaid) return 'paid';
    return 'paid'; // Default booking valid dianggap paid
  }

  private getPatientName(booking: any) {
    return (
      booking.consultationForm?.fullName ||
      booking.user?.userProfile?.fullName ||
      booking.user?.email ||
      'Pasien'
    );
  }

  private mapBookingToSession(booking: any) {
    const isOffline =
      booking.user?.email?.endsWith('@oasejiwa.com') ||
      booking.notes?.toLowerCase().includes('offline') ||
      booking.notes?.toLowerCase().includes('psikolog');

    return {
      id: String(booking.id),
      bookingId: booking.id,
      patientId: booking.userId,
      patientName: this.getPatientName(booking),
      patientPhoto: null,
      service: booking.service?.nama || (isOffline ? 'Konseling Offline (Klinik)' : 'Konseling Online'),
      date: this.toDateOnly(booking.scheduledDate),
      time: booking.scheduledTime || '09:00 WIB',
      duration: booking.service?.durasiMenit || 60,
      status: this.mapBookingStatus(booking.status),
      paymentStatus: this.mapPaymentStatus(booking.payments || []),
      sessionNumber: 1,
      meetingLink: null,
      notes: booking.notes || null,
      bookingCode: booking.bookingCode,
      bookingStatus: booking.status,
      totalPrice: booking.totalPrice,
      dpAmount: booking.dpAmount,
      remainingAmount: booking.remainingAmount,
      payments: booking.payments || [],
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
    };
  }

  private parseBookingId(id: string | number) {
    const bookingId = Number(id);
    if (Number.isNaN(bookingId)) {
      throw new NotFoundException('Sesi tidak ditemukan');
    }
    return bookingId;
  }

  async getAll(currentUser: any, query: any) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);
    const { date, status } = query;

    const where: any = {
      psychologistId,
    };

    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(`${date}T23:59:59.999Z`);
      where.scheduledDate = {
        gte: start,
        lte: end,
      };
    }

    const bookings = await this.prisma.booking.findMany({
      where,
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        consultationForm: true,
        service: true,
        payments: true,
      },
      orderBy: [{ scheduledDate: 'asc' }, { scheduledTime: 'asc' }],
    });

    let sessions = bookings.map((booking) => this.mapBookingToSession(booking));

    if (status && status !== 'all') {
      sessions = sessions.filter((session) => session.status === status);
    }

    return {
      sessions,
      total: sessions.length,
      upcomingCount: sessions.filter((session) => session.status === 'upcoming').length,
      completedCount: sessions.filter((session) => session.status === 'completed').length,
      cancelledCount: sessions.filter((session) => session.status === 'cancelled').length,
    };
  }

  async getById(currentUser: any, id: string | number) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);
    const bookingId = this.parseBookingId(id);

    const booking = await this.prisma.booking.findFirst({
      where: {
        id: bookingId,
        psychologistId,
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        service: true,
        payments: true,
        consultationForm: true,
        consentForm: true,
        review: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Sesi tidak ditemukan');
    }

    return this.mapBookingToSession(booking);
  }

  async completeSession(currentUser: any, id: string | number) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);
    const bookingId = this.parseBookingId(id);

    const booking = await this.prisma.booking.findFirst({
      where: {
        id: bookingId,
        psychologistId,
      },
      select: {
        id: true,
        status: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Sesi tidak ditemukan');
    }

    const updatedBooking = await this.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: 'COMPLETED',
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        consultationForm: true,
        service: true,
        payments: true,
      },
    });

    return this.mapBookingToSession(updatedBooking);
  }

  async cancelSession(currentUser: any, id: string | number, payload?: { reason?: string }) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);
    const bookingId = this.parseBookingId(id);

    const booking = await this.prisma.booking.findFirst({
      where: {
        id: bookingId,
        psychologistId,
      },
      select: {
        id: true,
        status: true,
        notes: true,
      },
    });

    if (!booking) {
      throw new NotFoundException('Sesi tidak ditemukan');
    }

    const reason = payload?.reason?.trim();

    const updatedBooking = await this.prisma.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        status: 'CANCELLED',
        ...(reason && {
          notes: booking.notes
            ? `${booking.notes}\n\nAlasan pembatalan: ${reason}`
            : `Alasan pembatalan: ${reason}`,
        }),
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        consultationForm: true,
        service: true,
        payments: true,
      },
    });

    return this.mapBookingToSession(updatedBooking);
  }

  async deleteWeeklySchedule(currentUser: any, scheduleId: string) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);

    const schedule = await this.prisma.schedule.findFirst({
      where: {
        id: scheduleId,
        psychologistId,
      },
      include: {
        bookings: {
          where: {
            status: {
              notIn: ['CANCELLED', 'REJECTED'],
            },
          },
        },
      },
    });

    if (!schedule) {
      throw new NotFoundException('Jadwal tidak ditemukan');
    }

    if (schedule.bookings.length > 0) {
      throw new BadRequestException('Jadwal tidak dapat dihapus karena masih ada sesi aktif');
    }

    await this.prisma.schedule.delete({
      where: { id: scheduleId },
    });

    return { message: 'Jadwal berhasil dihapus', id: scheduleId };
  }
}