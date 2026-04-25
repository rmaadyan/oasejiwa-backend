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

  async getAnalytics(params: { bookingMonth?: string; patientYear?: string }) {
    const now = new Date();

    const bookingMonth = params.bookingMonth || this.toYearMonth(now);
    const patientYear = Number(params.patientYear || now.getFullYear());

    const [bookingYear, bookingMonthIndex] = bookingMonth
      .split('-')
      .map(Number);

    const bookingStart = new Date(bookingYear, bookingMonthIndex - 1, 1);
    const bookingEnd = new Date(bookingYear, bookingMonthIndex, 1);

    const yearStart = new Date(patientYear, 0, 1);
    const yearEnd = new Date(patientYear + 1, 0, 1);

    const [
      totalUsers,
      revenueDp,
      revenuePaid,
      bookingsThisMonth,
      topServicesRaw,
      patientsRaw,
    ] = await Promise.all([
      this.prisma.user.count(),

      this.prisma.payment.aggregate({
        where: {
          type: 'DOWN_PAYMENT',
          status: 'PAID',
          paidAt: {
            gte: bookingStart,
            lt: bookingEnd,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      this.prisma.payment.aggregate({
        where: {
          type: 'FULL_PAYMENT',
          status: 'PAID',
          paidAt: {
            gte: bookingStart,
            lt: bookingEnd,
          },
        },
        _sum: {
          amount: true,
        },
      }),

      this.prisma.booking.findMany({
        where: {
          createdAt: {
            gte: bookingStart,
            lt: bookingEnd,
          },
        },
        select: {
          id: true,
          userId: true,
          createdAt: true,
        },
      }),

      this.prisma.booking.groupBy({
        by: ['serviceId'],
        where: {
          createdAt: {
            gte: bookingStart,
            lt: bookingEnd,
          },
        },
        _count: {
          serviceId: true,
        },
        orderBy: {
          _count: {
            serviceId: 'desc',
          },
        },
        take: 5,
      }),

      this.prisma.booking.findMany({
        where: {
          createdAt: {
            gte: yearStart,
            lt: yearEnd,
          },
        },
        include: {
          user: {
            include: {
              userProfile: true,
            },
          },
          service: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),
    ]);

    const monthlyPatients = await this.getMonthlyPatients(patientYear);
    const bookings = await this.getNewVsReturningBookings(
      bookingsThisMonth,
      bookingStart,
    );

    const services = await this.prisma.layanan.findMany({
      where: {
        id: {
          in: topServicesRaw.map((item) => item.serviceId),
        },
      },
    });

    const totalTopServiceBookings = topServicesRaw.reduce(
      (sum, item) => sum + item._count.serviceId,
      0,
    );

    const topServices = topServicesRaw.map((item) => {
      const service = services.find((s) => s.id === item.serviceId);
      const percentage =
        totalTopServiceBookings === 0
          ? 0
          : Math.round((item._count.serviceId / totalTopServiceBookings) * 100);

      return {
        id: item.serviceId,
        name: service?.nama ?? `Layanan ${item.serviceId}`,
        total: item._count.serviceId,
        percentage,
      };
    });

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

    for (const booking of patientsRaw) {
      const existing = patientMap.get(booking.userId);

      if (existing) {
        existing.bookingCount += 1;
        continue;
      }

      patientMap.set(booking.userId, {
        id: booking.userId,
        name: booking.user.userProfile?.fullName ?? booking.user.email,
        date: booking.createdAt.toISOString().slice(0, 10),
        service: booking.service.nama,
        description: booking.service.deskripsi ?? '-',
        bookingCount: 1,
      });
    }

    return {
      stats: {
        totalUsers,
        totalVisitors: 0,
      },
      revenue: {
        paid: revenuePaid._sum.amount ?? 0,
        dp: revenueDp._sum.amount ?? 0,
      },
      monthlyPatients,
      bookings,
      topServices,
      topTests: [],
      patients: Array.from(patientMap.values()),
    };
  }

private async getMonthlyPatients(year: number) {
  const result: Array<{ month: string; value: number }> = [];

    for (let month = 0; month < 12; month++) {
      const start = new Date(year, month, 1);
      const end = new Date(year, month + 1, 1);

      const count = await this.prisma.booking.count({
        where: {
          createdAt: {
            gte: start,
            lt: end,
          },
        },
      });

      result.push({
        month: MONTH_LABELS[month],
        value: count,
      });
    }

    return result;
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

  private toYearMonth(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');

    return `${year}-${month}`;
  }
}