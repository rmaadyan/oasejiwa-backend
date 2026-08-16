import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agu',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

@Injectable()
export class AdminAnalyticsService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly ignoredBookingStatuses = ['CANCELLED', 'REJECTED'];

  async getAnalytics(params: { bookingMonth?: string; patientYear?: string }) {
    const now = new Date();

    let targetYear = Number(params.patientYear) || now.getFullYear();
    let targetMonth = now.getMonth(); // 0-indexed

    if (params.bookingMonth) {
      const cleanMonth = params.bookingMonth.trim().toLowerCase();
      if (cleanMonth.includes('-')) {
        const [y, m] = cleanMonth.split('-').map(Number);
        if (!isNaN(y)) targetYear = y;
        if (!isNaN(m)) targetMonth = m - 1;
      }
    }

    const bookingStart = new Date(targetYear, targetMonth, 1);
    const bookingEnd = new Date(targetYear, targetMonth + 1, 1);

    const yearStart = new Date(targetYear, 0, 1);
    const yearEnd = new Date(targetYear + 1, 0, 1);

    const validBookingStatusWhere: any = {
      notIn: this.ignoredBookingStatuses,
    };

    // 🟢 Ambil user dan booking aktif
    const [totalUsers, allActiveBookings] = await Promise.all([
      this.prisma.user.count({
        where: { role: { in: ['USER', 'PATIENT'] as any } },
      }),
      this.prisma.booking.findMany({
        where: {
          status: validBookingStatusWhere,
        },
        include: {
          service: true,
          user: {
            include: {
              userProfile: true,
            },
          },
          payments: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    let revenuePaid = 0;
    let revenueDp = 0;
    const bookingsThisMonth: typeof allActiveBookings = [];
    const bookingsForTopServices: typeof allActiveBookings = [];
    const patientMap = new Map<
      string,
      {
        id: string;
        name: string;
        date: string;
        service: string;
        description: string;
        bookingCount: number;
      }
    >();

    for (const booking of allActiveBookings) {
      const bDate = booking.scheduledDate
        ? new Date(booking.scheduledDate)
        : new Date(booking.createdAt);

      const isThisMonth = bDate >= bookingStart && bDate < bookingEnd;

      // 🟢 Hitung Revenue & Booking Bulan Ini
      if (isThisMonth) {
        bookingsThisMonth.push(booking);
        bookingsForTopServices.push(booking);

        const total = Number(booking.totalPrice || 0);
        const dp = Number(booking.dpAmount || total * 0.5);
        const status = String(booking.status).toUpperCase();

        if (status === 'FULLY_PAID' || status === 'COMPLETED') {
          revenuePaid += total;
        } else if (
          status === 'APPROVED' ||
          status === 'WAITING_APPROVAL' ||
          status === 'PENDING_DP'
        ) {
          revenueDp += dp;
        }
      }

      // 🟢 Mapping Data Pasien Tahun Ini
      if (bDate >= yearStart && bDate < yearEnd && booking.user) {
        const existing = patientMap.get(booking.userId);
        if (existing) {
          existing.bookingCount += 1;
        } else {
          patientMap.set(booking.userId, {
            id: booking.userId,
            name:
              booking.user.userProfile?.fullName ||
              booking.user.email.split('@')[0],
            date: bDate.toISOString().slice(0, 10),
            service: booking.service?.nama ?? 'Konseling',
            description: booking.service?.deskripsi ?? '-',
            bookingCount: 1,
          });
        }
      }
    }

    // Grafik Pasien Bulanan
    const monthlyPatients = MONTH_LABELS.map((monthLabel, idx) => {
      const count = allActiveBookings.filter((b) => {
        const d = b.scheduledDate ? new Date(b.scheduledDate) : new Date(b.createdAt);
        return d.getFullYear() === targetYear && d.getMonth() === idx;
      }).length;
      return { month: monthLabel, value: count };
    });

    const bookings = await this.getNewVsReturningBookings(
      bookingsThisMonth,
      bookingStart,
    );

    const topServices = this.buildTopServices(
      bookingsForTopServices.length > 0 ? bookingsForTopServices : allActiveBookings,
    );

    return {
      stats: {
        totalUsers: Math.max(totalUsers, allActiveBookings.length),
        totalVisitors: totalUsers,
      },
      revenue: {
        paid: revenuePaid,
        dp: revenueDp,
      },
      monthlyPatients,
      bookings,
      topServices,
      topTests: [],
      patients: Array.from(patientMap.values()),
    };
  }

  private buildTopServices(
    bookings: Array<{
      serviceId: number;
      service: {
        id: number;
        nama: string;
      } | null;
    }>,
  ) {
    const serviceMap = new Map<
      number,
      {
        id: number;
        name: string;
        total: number;
      }
    >();

    for (const booking of bookings) {
      const sId = booking.serviceId || (booking.service ? booking.service.id : 1);
      const existing = serviceMap.get(sId);

      if (existing) {
        existing.total += 1;
      } else {
        serviceMap.set(sId, {
          id: sId,
          name: booking.service?.nama ?? `Layanan ${sId}`,
          total: 1,
        });
      }
    }

    const services = Array.from(serviceMap.values())
      .sort((a, b) => b.total - a.total)
      .slice(0, 5);

    const totalTopServiceBookings = services.reduce(
      (sum, service) => sum + service.total,
      0,
    );

    return services.map((service) => ({
      id: service.id,
      name: service.name,
      total: service.total,
      percentage:
        totalTopServiceBookings === 0
          ? 0
          : Math.round((service.total / totalTopServiceBookings) * 100),
    }));
  }

  private async getNewVsReturningBookings(
    bookingsThisMonth: Array<{ id: number; userId: string; createdAt: Date }>,
    bookingStart: Date,
  ) {
    let newCount = 0;
    let returningCount = 0;

    for (const booking of bookingsThisMonth) {
      const previousBooking = await this.prisma.booking.findFirst({
        where: {
          userId: booking.userId,
          createdAt: {
            lt: bookingStart,
          },
          status: {
            notIn: this.ignoredBookingStatuses,
          } as any,
        },
        select: {
          id: true,
        },
      });

      if (previousBooking) {
        returningCount += 1;
      } else {
        newCount += 1;
      }
    }

    return {
      returning: returningCount,
      new: newCount,
    };
  }
}