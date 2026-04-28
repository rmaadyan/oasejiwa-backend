import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboard() {
    const now = new Date();

    const startToday = new Date(now);
    startToday.setHours(0, 0, 0, 0);

    const endToday = new Date(now);
    endToday.setHours(23, 59, 59, 999);

    const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const startLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [
      totalPatients,
      newPatientsThisMonth,
      todayBookings,
      upcomingBookings,
      pendingPayments,
      monthlyRevenue,
      lastMonthRevenue,
      recentBookings,
      pendingPaymentList,
      todaySchedule,
    ] = await Promise.all([
      this.prisma.user.count({
        where: { role: 'USER' },
      }),

      this.prisma.user.count({
        where: {
          role: 'USER',
          createdAt: {
            gte: startThisMonth,
            lt: startNextMonth,
          },
        },
      }),

      this.prisma.booking.count({
        where: {
          scheduledDate: {
            gte: startToday,
            lte: endToday,
          },
        },
      }),

      this.prisma.booking.count({
        where: {
          scheduledDate: {
            gt: now,
          },
          status: {
            in: ['APPROVED', 'FULLY_PAID'],
          },
        },
      }),

      this.prisma.payment.count({
        where: {
          status: 'PENDING',
        },
      }),

      this.prisma.payment.aggregate({
        where: {
          status: 'PAID',
          paidAt: {
            gte: startThisMonth,
            lt: startNextMonth,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      this.prisma.payment.aggregate({
        where: {
          status: 'PAID',
          paidAt: {
            gte: startLastMonth,
            lt: startThisMonth,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      this.prisma.booking.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        include: {
          user: {
            include: {
              userProfile: true,
            },
          },
          psychologist: true,
          service: true,
        },
      }),

      this.prisma.payment.findMany({
        take: 3,
        where: {
          status: 'PENDING',
        },
        orderBy: { createdAt: 'asc' },
        include: {
          booking: {
            include: {
              user: {
                include: {
                  userProfile: true,
                },
              },
              service: true,
            },
          },
        },
      }),

      this.prisma.booking.findMany({
        where: {
          scheduledDate: {
            gte: startToday,
            lte: endToday,
          },
        },
        orderBy: { scheduledTime: 'asc' },
        include: {
          user: {
            include: {
              userProfile: true,
            },
          },
          psychologist: true,
          service: true,
        },
      }),
    ]);

    const thisRevenue = monthlyRevenue._sum.amount ?? 0;
    const previousRevenue = lastMonthRevenue._sum.amount ?? 0;

    const revenueGrowth =
      previousRevenue === 0
        ? thisRevenue > 0
          ? 100
          : 0
        : Math.round(((thisRevenue - previousRevenue) / previousRevenue) * 100);

    return {
      stats: {
        totalPatients,
        newPatientsThisMonth,
        todayBookings,
        upcomingBookings,
        pendingPayments,
        monthlyRevenue: thisRevenue,
        revenueGrowth,
      },
      recentBookings: recentBookings.map((booking) => ({
        id: booking.id,
        patient: booking.user.userProfile?.fullName ?? booking.user.email,
        service: booking.service.nama,
        psychologist: booking.psychologist.fullName,
        date: booking.scheduledDate.toISOString().slice(0, 10),
        time: booking.scheduledTime,
        status: this.mapBookingStatus(booking.status),
      })),
      pendingPayments: pendingPaymentList.map((payment) => ({
        id: payment.id,
        patient:
          payment.booking.user.userProfile?.fullName ?? payment.booking.user.email,
        service: payment.booking.service.nama,
        amount: payment.amount,
        uploadedAt: payment.createdAt.toISOString().slice(0, 10),
        urgent: payment.expiredAt < new Date(Date.now() + 6 * 60 * 60 * 1000),
      })),
      todaySchedule: todaySchedule.map((booking) => ({
        time: booking.scheduledTime,
        psychologist: booking.psychologist.fullName,
        patient: booking.user.userProfile?.fullName ?? booking.user.email,
        service: booking.service.nama,
      })),
      alerts: [],
    };
  }

  private mapBookingStatus(status: string) {
    if (status === 'PENDING_DP' || status === 'WAITING_APPROVAL') return 'pending';
    if (status === 'APPROVED' || status === 'FULLY_PAID') return 'confirmed';
    if (status === 'COMPLETED') return 'completed';
    if (status === 'CANCELLED' || status === 'REJECTED') return 'cancelled';

    return 'pending';
  }
}