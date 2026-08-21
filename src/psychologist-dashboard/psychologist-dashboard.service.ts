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
    const hasFullPaid = payments?.some(
      (payment) => payment.type === 'FULL_PAYMENT' && String(payment.status).toUpperCase() === 'PAID',
    );
    return hasFullPaid ? 'paid' : 'paid';
  }

  private getPatientName(booking: any) {
    return (
      booking.consultationForm?.fullName ||
      booking.user?.userProfile?.fullName ||
      booking.user?.email ||
      'Pasien'
    );
  }

  private isPatientBookingStatus(status: string) {
    const s = String(status).toUpperCase();
    return s !== 'CANCELLED' && s !== 'REJECTED';
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
      service: booking.service?.nama || booking.service?.name || (isOffline ? 'Konseling Offline (Klinik)' : 'Konseling Individu'),
      serviceName: booking.service?.nama || booking.service?.name || (isOffline ? 'Konseling Offline (Klinik)' : 'Konseling Individu'),
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
    };
  }

  async getDashboard(currentUser: any) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    // Ambil rentang hari ini dengan buffer timezone
    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);

    const sevenDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59, 999);

    const [todayBookings, weekBookings, upcomingBookings, allBookings] =
      await this.prisma.$transaction([
        // 1. Sesi Hari Ini
        this.prisma.booking.findMany({
          where: {
            psychologistId: psychologist.id,
            scheduledDate: {
              gte: new Date(startToday.getTime() - 24 * 60 * 60 * 1000), // Buffer 1 hari timezone
              lte: endToday,
            },
            status: { in: ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'] },
          },
          include: {
            user: { include: { userProfile: true } },
            service: true,
            payments: true,
            consultationForm: true,
          },
          orderBy: { scheduledTime: 'asc' },
        }),

        // 2. Sesi Minggu Ini
        this.prisma.booking.findMany({
          where: {
            psychologistId: psychologist.id,
            scheduledDate: {
              gte: startToday,
              lte: sevenDaysLater,
            },
            status: { in: ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'] },
          },
          include: {
            user: { include: { userProfile: true } },
            service: true,
            payments: true,
            consultationForm: true,
          },
        }),

        // 3. Sesi Mendatang
        this.prisma.booking.findMany({
          where: {
            psychologistId: psychologist.id,
            status: { in: ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'] },
          },
          include: {
            user: { include: { userProfile: true } },
            service: true,
            payments: true,
            consultationForm: true,
          },
          orderBy: [{ scheduledDate: 'asc' }, { scheduledTime: 'asc' }],
          take: 10,
        }),

        // 4. Semua Riwayat
        this.prisma.booking.findMany({
          where: {
            psychologistId: psychologist.id,
          },
          include: {
            user: { include: { userProfile: true } },
            service: true,
            payments: true,
            consultationForm: true,
          },
          orderBy: { scheduledDate: 'desc' },
        }),
      ]);

    const patientBookings = allBookings.filter((booking) =>
      this.isPatientBookingStatus(booking.status),
    );

    const uniquePatientIds = new Set(
      patientBookings.map((booking) => booking.userId),
    );

    const mappedTodaySchedule = todayBookings.map((b) => this.mapBookingToSession(b));
    const mappedUpcomingSessions = upcomingBookings.map((b) => this.mapBookingToSession(b));

    return {
      psychologistName: psychologist.fullName || 'Psikolog',
      todaySessionsCount: todayBookings.length,
      weeklySessionsCount: weekBookings.length,
      totalPatients: uniquePatientIds.size,
      todaySessions: mappedTodaySchedule,
      upcomingSessions: mappedUpcomingSessions,
      stats: {
        todaySessions: todayBookings.length,
        todayCompleted: todayBookings.filter((b) => String(b.status).toUpperCase() === 'COMPLETED').length,
        weekSessions: weekBookings.length,
        totalPatients: uniquePatientIds.size,
        totalLifetimeSessions: patientBookings.length,
        averageRating: 0,
        nextSessionTime: upcomingBookings[0]?.scheduledTime || null,
      },
      todaySchedule: mappedTodaySchedule,
    };
  }
}