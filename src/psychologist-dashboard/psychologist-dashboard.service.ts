import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

type UiSessionStatus = 'upcoming' | 'completed' | 'cancelled';

@Injectable()
export class PsychologistDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPsychologistProfile(currentUser: any) {
    const profile = await this.prisma.psychologistProfile.findFirst({
      where: {
        OR: [{ userId: currentUser.id }, { id: currentUser.id }],
      },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Akun ini bukan psikolog');
    }

    return profile;
  }

  private toDateOnly(date: Date) {
    return date.toISOString().split('T')[0];
  }

  private mapBookingStatus(status: string): UiSessionStatus {
    const s = String(status || '').toUpperCase();
    if (s === 'COMPLETED' || s === 'SELESAI') return 'completed';
    if (s === 'CANCELLED' || s === 'REJECTED' || s === 'BATAL') return 'cancelled';
    return 'upcoming';
  }

  private mapPaymentStatus(payments: any[]): 'paid' | 'pending' {
    const hasFullPaid = payments?.some(
      (payment) => payment.type === 'FULL_PAYMENT' && String(payment.status).toUpperCase() === 'PAID',
    );
    return hasFullPaid ? 'paid' : 'pending';
  }

  private getPatientName(booking: any) {
    return (
      booking.user?.userProfile?.fullName ||
      booking.user?.email ||
      'Pasien Oase Jiwa'
    );
  }

  private isUpcomingBooking(status: string) {
    return ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID', 'UPCOMING'].includes(
      String(status).toUpperCase(),
    );
  }

  private isPatientBookingStatus(status: string) {
    const s = String(status).toUpperCase();
    return s !== 'CANCELLED' && s !== 'REJECTED';
  }

  private mapBookingToSession(booking: any) {
    return {
      id: String(booking.id),
      bookingId: booking.id,
      patientId: booking.userId,
      patientName: this.getPatientName(booking),
      patientPhoto: null,
      service: booking.service?.nama || booking.service?.name || 'Konseling',
      serviceName: booking.service?.nama || booking.service?.name || 'Konseling',
      date: this.toDateOnly(booking.scheduledDate),
      time: booking.scheduledTime || '09:00',
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
    };
  }

  async getDashboard(currentUser: any) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    const now = new Date();
    const todayOnly = this.toDateOnly(now);

    const startToday = new Date(`${todayOnly}T00:00:00.000Z`);
    const endToday = new Date(`${todayOnly}T23:59:59.999Z`);

    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    const [todayBookings, weekBookings, upcomingBookings, allBookings, notes] =
      await this.prisma.$transaction([
        this.prisma.booking.findMany({
          where: {
            psychologistId: psychologist.id,
            scheduledDate: {
              gte: startToday,
              lte: endToday,
            },
          },
          include: {
            user: { include: { userProfile: true } },
            service: true,
            payments: true,
          },
          orderBy: { scheduledTime: 'asc' },
        }),

        this.prisma.booking.findMany({
          where: {
            psychologistId: psychologist.id,
            scheduledDate: {
              gte: startToday,
              lte: sevenDaysLater,
            },
          },
          include: {
            user: { include: { userProfile: true } },
            service: true,
            payments: true,
          },
        }),

        this.prisma.booking.findMany({
          where: {
            psychologistId: psychologist.id,
            scheduledDate: {
              gte: startToday,
              lte: sevenDaysLater,
            },
            status: {
              in: ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'],
            },
          },
          include: {
            user: { include: { userProfile: true } },
            service: true,
            payments: true,
          },
          orderBy: [{ scheduledDate: 'asc' }, { scheduledTime: 'asc' }],
          take: 5,
        }),

        this.prisma.booking.findMany({
          where: {
            psychologistId: psychologist.id,
          },
          include: {
            user: { include: { userProfile: true } },
            service: true,
            payments: true,
          },
          orderBy: { scheduledDate: 'desc' },
        }),

        this.prisma.sessionNote.findMany({
          where: {
            psychologistProfileId: psychologist.id,
            deletedAt: null,
          },
          orderBy: { createdAt: 'desc' },
        }),
      ]);

    const patientBookings = allBookings.filter((booking) =>
      this.isPatientBookingStatus(booking.status),
    );

    const uniquePatientIds = new Set(
      patientBookings.map((booking) => booking.userId),
    );

    const activePatientsThisMonth = new Set(
      patientBookings
        .filter((booking) => {
          const bookingDate = new Date(booking.scheduledDate);
          return (
            bookingDate.getMonth() === now.getMonth() &&
            bookingDate.getFullYear() === now.getFullYear()
          );
        })
        .map((booking) => booking.userId),
    );

    const mappedTodaySchedule = todayBookings.map((b) => this.mapBookingToSession(b));
    const mappedUpcomingSessions = upcomingBookings.map((b) => this.mapBookingToSession(b));

    // 🟢 RETURN FORMAT KOMPATIBEL DENGAN SEMUA KOMPONEN FRONTEND
    return {
      // Properti untuk Frontend Format Baru
      psychologistName: psychologist.fullName || 'Psikolog',
      todaySessionsCount: todayBookings.length,
      weeklySessionsCount: weekBookings.length,
      totalPatients: uniquePatientIds.size,
      todaySessions: mappedTodaySchedule,
      upcomingSessions: mappedUpcomingSessions,

      // Properti untuk Frontend Format Lama
      profile: {
        id: psychologist.id,
        name: psychologist.fullName,
        avatarUrl: psychologist.avatarUrl,
      },
      stats: {
        todaySessions: todayBookings.length,
        todayCompleted: todayBookings.filter((b) => String(b.status).toUpperCase() === 'COMPLETED').length,
        weekSessions: weekBookings.length,
        totalPatients: uniquePatientIds.size,
        activePatientsThisMonth: activePatientsThisMonth.size,
        totalLifetimeSessions: patientBookings.length,
        averageRating: 0,
        nextSessionTime: upcomingBookings[0]?.scheduledTime || null,
      },
      todaySchedule: mappedTodaySchedule,
    };
  }
}