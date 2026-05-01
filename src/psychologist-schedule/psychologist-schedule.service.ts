import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type UiSessionStatus = 'upcoming' | 'completed' | 'cancelled';

@Injectable()
export class PsychologistScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPsychologistProfileId(userId: string) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundException('Akun ini bukan psikolog');
    }

    return profile.id;
  }

  private toDateOnly(date: Date) {
    return date.toISOString().split('T')[0];
  }

  private mapBookingStatus(status: string): UiSessionStatus {
    if (status === 'COMPLETED') return 'completed';

    if (status === 'CANCELLED' || status === 'REJECTED') {
      return 'cancelled';
    }

    return 'upcoming';
  }

  private mapPaymentStatus(payments: any[]): 'paid' | 'pending' {
    const hasFullPaid = payments.some(
      (payment) => payment.type === 'FULL_PAYMENT' && payment.status === 'PAID',
    );

    if (hasFullPaid) return 'paid';

    return 'pending';
  }

  private getPatientName(booking: any) {
    return (
      booking.user?.userProfile?.fullName ||
      booking.user?.email ||
      'Pasien'
    );
  }

  private mapBookingToSession(booking: any) {
    return {
      id: String(booking.id),
      bookingId: booking.id,

      patientId: booking.userId,
      patientName: this.getPatientName(booking),
      patientPhoto: null,

      service: booking.service?.nama || 'Konseling',
      date: this.toDateOnly(booking.scheduledDate),
      time: booking.scheduledTime,
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

  private parseBookingId(id: string) {
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
      upcomingCount: sessions.filter((session) => session.status === 'upcoming')
        .length,
      completedCount: sessions.filter(
        (session) => session.status === 'completed',
      ).length,
      cancelledCount: sessions.filter(
        (session) => session.status === 'cancelled',
      ).length,
    };
  }

  async getById(currentUser: any, id: string) {
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

  async completeSession(currentUser: any, id: string) {
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
        service: true,
        payments: true,
      },
    });

    return this.mapBookingToSession(updatedBooking);
  }

  async cancelSession(
    currentUser: any,
    id: string,
    payload?: { reason?: string },
  ) {
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
        service: true,
        payments: true,
      },
    });

    return this.mapBookingToSession(updatedBooking);
  }
}