import { Injectable, Logger } from '@nestjs/common';
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
  private readonly logger = new Logger(AdminAnalyticsService.name);

  constructor(private readonly prisma: PrismaService) {}

  private readonly ignoredBookingStatuses = ['CANCELLED', 'REJECTED'];

  async getAnalytics(params: { bookingMonth?: string; patientYear?: string }) {
    try {
      const now = new Date();

      let targetYear = Number(params.patientYear) || now.getFullYear();
      let targetMonth = now.getMonth(); // 0-11

      if (params.bookingMonth && params.bookingMonth.includes('-')) {
        const [y, m] = params.bookingMonth.split('-').map(Number);
        if (!isNaN(y)) targetYear = y;
        if (!isNaN(m)) targetMonth = m - 1;
      }

      const bookingStart = new Date(targetYear, targetMonth, 1);
      const bookingEnd = new Date(targetYear, targetMonth + 1, 1);

      const yearStart = new Date(targetYear, 0, 1);
      const yearEnd = new Date(targetYear + 1, 0, 1);

      // 🟢 1. Hitung total user dengan role USER (aman dari enum mismatch)
      const totalUsers = await this.prisma.user.count({
        where: {
          role: 'USER',
        },
      });

      // 🟢 2. Ambil seluruh booking aktif
      const allActiveBookings = await this.prisma.booking.findMany({
        where: {
          status: {
            notIn: this.ignoredBookingStatuses as any,
          },
        },
        include: {
          service: true,
          user: {
            include: {
              userProfile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      let revenuePaid = 0;
      let revenueDp = 0;
      const bookingsThisMonth: typeof allActiveBookings = [];
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
        const rawDate = booking.scheduledDate || booking.createdAt;
        const bDate = new Date(rawDate);

        const isThisMonth = bDate >= bookingStart && bDate < bookingEnd;

        if (isThisMonth) {
          bookingsThisMonth.push(booking);

          const total = Number(booking.totalPrice || 0);
          const dp = Number(booking.dpAmount || total * 0.5);
          const status = String(booking.status).toUpperCase();

          if (status === 'FULLY_PAID' || status === 'COMPLETED') {
            revenuePaid += total;
          } else {
            revenueDp += dp;
          }
        }

        // Pasien tahun ini
        if (bDate >= yearStart && bDate < yearEnd && booking.user) {
          const existing = patientMap.get(booking.userId);
          if (existing) {
            existing.bookingCount += 1;
          } else {
            const userName =
              booking.user.userProfile?.fullName ||
              booking.user.email?.split('@')[0] ||
              'Pasien';

            patientMap.set(booking.userId, {
              id: booking.userId,
              name: userName,
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
          const d = new Date(b.scheduledDate || b.createdAt);
          return d.getFullYear() === targetYear && d.getMonth() === idx;
        }).length;
        return { month: monthLabel, value: count, count };
      });

      // Top Services
      const topServices = this.buildTopServices(
        bookingsThisMonth.length > 0 ? bookingsThisMonth : allActiveBookings,
      );

      // New vs Returning Bookings
      const bookingsCount = {
        returning: 0,
        new: bookingsThisMonth.length,
      };

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
        bookings: bookingsCount,
        topServices,
        topTests: [],
        patients: Array.from(patientMap.values()),
      };
    } catch (error) {
      this.logger.error('Error saat kalkulasi analitik admin:', error);
      return {
        stats: { totalUsers: 0, totalVisitors: 0 },
        revenue: { paid: 0, dp: 0 },
        monthlyPatients: [],
        bookings: { returning: 0, new: 0 },
        topServices: [],
        topTests: [],
        patients: [],
      };
    }
  }

  private buildTopServices(
    bookings: Array<{
      serviceId?: number;
      service?: {
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
      const sId = booking.service?.id || booking.serviceId || 1;
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

    const totalCount = services.reduce((sum, s) => sum + s.total, 0);

    return services.map((s) => ({
      id: s.id,
      name: s.name,
      total: s.total,
      percentage: totalCount === 0 ? 0 : Math.round((s.total / totalCount) * 100),
    }));
  }
}