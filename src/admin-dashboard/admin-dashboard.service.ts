import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly ignoredBookingStatuses = ['CANCELLED', 'REJECTED'];

  private toNumber(value: any) {
    if (value === null || value === undefined) return 0;
    return Number(value);
  }

  async getDashboard() {
    const now = new Date();

    const startToday = new Date(now);
    startToday.setHours(0, 0, 0, 0);

    const endToday = new Date(now);
    endToday.setHours(23, 59, 59, 999);

    const startThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const startLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const validRevenuePaymentWhere: any = {
      status: 'PAID',
      booking: {
        is: {
          status: {
            notIn: this.ignoredBookingStatuses,
          },
        },
      },
    };

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
          } as any,
        },
      }),

      /**
       * Pembayaran yang perlu divalidasi admin.
       * Patokannya booking yang sudah upload bukti dan menunggu approval.
       */
      this.prisma.booking.count({
        where: {
          status: 'WAITING_APPROVAL' as any,
        },
      }),

      /**
       * Revenue bulan ini.
       * Payment PAID dari booking CANCELLED / REJECTED tidak ikut dihitung.
       */
      this.prisma.payment.aggregate({
        where: {
          ...validRevenuePaymentWhere,
          paidAt: {
            gte: startThisMonth,
            lt: startNextMonth,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      /**
       * Revenue bulan lalu.
       * Dipakai untuk menghitung revenueGrowth.
       */
      this.prisma.payment.aggregate({
        where: {
          ...validRevenuePaymentWhere,
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

      /**
       * List pembayaran pending yang ditampilkan di dashboard.
       * ID yang dikirim adalah booking.id supaya tombol "Validasi Sekarang"
       * bisa langsung ke /admin/bookings/{id}.
       */
      this.prisma.booking.findMany({
        take: 3,
        where: {
          status: 'WAITING_APPROVAL' as any,
        },
        orderBy: { updatedAt: 'asc' },
        include: {
          user: {
            include: {
              userProfile: true,
            },
          },
          service: true,
          payments: {
            orderBy: {
              createdAt: 'desc',
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

    const thisRevenue = this.toNumber(monthlyRevenue._sum?.amount);
    const previousRevenue = this.toNumber(lastMonthRevenue._sum?.amount);

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

      pendingPayments: pendingPaymentList.map((booking) => {
        const latestPayment = booking.payments?.[0];

        return {
          id: booking.id,
          patient: booking.user.userProfile?.fullName ?? booking.user.email,
          service: booking.service.nama,
          amount: this.toNumber(
            latestPayment?.amount ?? booking.dpAmount ?? booking.totalPrice,
          ),
          uploadedAt: latestPayment?.createdAt
            ? latestPayment.createdAt.toISOString().slice(0, 10)
            : booking.updatedAt.toISOString().slice(0, 10),
          urgent: latestPayment?.expiredAt
            ? latestPayment.expiredAt <
              new Date(Date.now() + 6 * 60 * 60 * 1000)
            : false,
        };
      }),

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
    if (status === 'PENDING_DP' || status === 'WAITING_APPROVAL') {
      return 'pending';
    }

    if (status === 'APPROVED' || status === 'FULLY_PAID') {
      return 'confirmed';
    }

    if (status === 'COMPLETED') {
      return 'completed';
    }

    if (status === 'CANCELLED' || status === 'REJECTED') {
      return 'cancelled';
    }

    return 'pending';
  }
}