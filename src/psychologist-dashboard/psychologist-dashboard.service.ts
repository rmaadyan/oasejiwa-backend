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
        userId: true,
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

    // Ambil target ID yang mencakup profile id maupun user id
    const validPsychologistIds = [psychologist.id, psychologist.userId].filter(Boolean);

    const now = new Date();
    const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
    const endToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999);
    const sevenDaysLater = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 7, 23, 59, 59, 999);

    const allBookings = await this.prisma.booking.findMany({
      where: {
        psychologistId: { in: validPsychologistIds },
      },
      include: {
        user: { include: { userProfile: true } },
        service: true,
        payments: true,
        consultationForm: true,
      },
      orderBy: [{ scheduledDate: 'asc' }, { scheduledTime: 'asc' }],
    });

    const activeBookings = allBookings.filter((b) =>
      ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID', 'COMPLETED'].includes(b.status),
    );

    // Filter sesi hari ini (toleransi tanggal yang sama)
    const todayBookings = activeBookings.filter((b) => {
      const bDate = new Date(b.scheduledDate);
      return (
        bDate.getFullYear() === now.getFullYear() &&
        bDate.getMonth() === now.getMonth() &&
        bDate.getDate() === now.getDate()
      );
    });

    const weekBookings = activeBookings.filter((b) => {
      const bTime = new Date(b.scheduledDate).getTime();
      return bTime >= startToday.getTime() && bTime <= sevenDaysLater.getTime();
    });

    const upcomingBookings = activeBookings.filter((b) =>
      ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'].includes(b.status),
    );

    const patientBookings = allBookings.filter((booking) =>
      this.isPatientBookingStatus(booking.status),
    );

    const uniquePatientIds = new Set(patientBookings.map((b) => b.userId));

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