import { Injectable } from '@nestjs/common';
import { BookingStatus } from '@prisma/client';
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

  private readonly ignoredBookingStatuses: BookingStatus[] = [
    BookingStatus.CANCELLED,
    BookingStatus.REJECTED,
  ];

  private toNumber(value: any) {
    if (value === null || value === undefined) return 0;
    return Number(value);
  }

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

    const validBookingStatusWhere = {
      notIn: this.ignoredBookingStatuses,
    };

    const [
      totalUsers,
      revenueDp,
      revenuePaid,
      bookingsThisMonth,
      bookingsForTopServices,
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
          booking: {
            status: validBookingStatusWhere,
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
          booking: {
            status: validBookingStatusWhere,
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
          status: validBookingStatusWhere,
        },
        select: {
          id: true,
          userId: true,
          createdAt: true,
        },
      }),

      this.prisma.booking.findMany({
        where: {
          createdAt: {
            gte: bookingStart,
            lt: bookingEnd,
          },
          status: validBookingStatusWhere,
        },
        include: {
          service: true,
        },
      }),

      this.prisma.booking.findMany({
        where: {
          createdAt: {
            gte: yearStart,
            lt: yearEnd,
          },
          status: validBookingStatusWhere,
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

    const topServices = this.buildTopServices(bookingsForTopServices);

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
        service: booking.service?.nama ?? '-',
        description: booking.service?.deskripsi ?? '-',
        bookingCount: 1,
      });
    }

    return {
      stats: {
        totalUsers,
        totalVisitors: 0,
      },
      revenue: {
        paid: this.toNumber(revenuePaid._sum?.amount),
        dp: this.toNumber(revenueDp._sum?.amount),
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
      const existing = serviceMap.get(booking.serviceId);

      if (existing) {
        existing.total += 1;
        continue;
      }

      serviceMap.set(booking.serviceId, {
        id: booking.serviceId,
        name: booking.service?.nama ?? `Layanan ${booking.serviceId}`,
        total: 1,
      });
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
          status: {
            notIn: this.ignoredBookingStatuses,
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
          status: {
            notIn: this.ignoredBookingStatuses,
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