import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleReviewsService } from '../google-reviews/google-reviews.service';

export interface PublicStatisticsResponse {
  totalClients: number;
  totalPsychologists: number;
  averageRating: number;
  totalReviews: number;
  lastUpdated: string;
}

@Injectable()
export class StatisticsService {
  private readonly logger = new Logger(StatisticsService.name);
  private cache: {
    data: PublicStatisticsResponse | null;
    lastFetchedAt: Date | null;
  } = { data: null, lastFetchedAt: null };

  private readonly CACHE_TTL_MS = 5 * 1000;

  constructor(
    private readonly prisma: PrismaService,
    private readonly googleReviewsService: GoogleReviewsService,
  ) {}

  async getPublicStatistics(): Promise<PublicStatisticsResponse> {
    const now = new Date();

    if (
      this.cache.data &&
      this.cache.lastFetchedAt &&
      now.getTime() - this.cache.lastFetchedAt.getTime() < this.CACHE_TTL_MS
    ) {
      return this.cache.data;
    }

    try {
      const totalClients = 250;
      const totalPsychologists = await this.prisma.psychologistProfile.count();
      const googleData = await this.googleReviewsService.getReviews();

      const response: PublicStatisticsResponse = {
        totalClients,
        totalPsychologists: Math.max(totalPsychologists, 1),
        averageRating: googleData.rating || 4.9,
        totalReviews: googleData.totalReviews || 157,
        lastUpdated: now.toISOString(),
      };

      this.cache = { data: response, lastFetchedAt: now };
      return response;
    } catch (err) {
      this.logger.error('Gagal mengambil statistik publik dari database:', err);

      if (this.cache.data) {
        return this.cache.data;
      }

      return {
        totalClients: 250,
        totalPsychologists: 1,
        averageRating: 4.9,
        totalReviews: 157,
        lastUpdated: now.toISOString(),
      };
    }
  }

  // 🟢 METHOD ADMIN ANALYTICS
  async getAdminStatistics(query: { bookingMonth?: string; patientYear?: string }) {
    const currentMonth = query.bookingMonth || new Date().toISOString().slice(0, 7); // Format "YYYY-MM"
    const currentYear = Number(query.patientYear) || new Date().getFullYear();

    const [year, month] = currentMonth.split('-').map(Number);
    const startDateMonth = new Date(year, month - 1, 1);
    const endDateMonth = new Date(year, month, 0, 23, 59, 59, 999);

    const startDateYear = new Date(currentYear, 0, 1);
    const endDateYear = new Date(currentYear, 11, 31, 23, 59, 59, 999);

    try {
      // 1. Ambil total user terdaftar
      const totalUsers = await this.prisma.user.count({
        where: {
          role: { in: ['USER', 'PATIENT'] as any },
        },
      });

      // 2. Ambil booking pada bulan yang dipilih
      const monthBookings = await this.prisma.booking.findMany({
        where: {
          scheduledDate: {
            gte: startDateMonth,
            lte: endDateMonth,
          },
          status: {
            notIn: ['CANCELLED', 'REJECTED'],
          },
        },
        include: {
          service: true,
          user: true,
        },
      });

      // Hitung Pendapatan Lunas & DP
      let totalLunas = 0;
      let totalDP = 0;
      let totalBooking = monthBookings.length;
      let klienLamaCount = 0;
      let klienBaruCount = 0;

      // Hitung frekuensi layanan terpopuler
      const serviceCountMap: Record<string, { name: string; count: number }> = {};

      for (const booking of monthBookings) {
        const rawTotal = Number(booking.totalPrice || 0);
        const rawDP = Number(booking.dpAmount || rawTotal * 0.5);

        const status = String(booking.status).toUpperCase();

        if (status === 'FULLY_PAID' || status === 'COMPLETED') {
          totalLunas += rawTotal;
        } else if (status === 'APPROVED' || status === 'DP_PAID' || status === 'PENDING_PAYMENT') {
          totalDP += rawDP;
        }

        // Hitung Klien Baru vs Klien Lama
        if (booking.userId) {
          const userBookingsCount = await this.prisma.booking.count({
            where: {
              userId: booking.userId,
              createdAt: { lt: booking.createdAt },
            },
          });
          if (userBookingsCount > 0) {
            klienLamaCount++;
          } else {
            klienBaruCount++;
          }
        } else {
          klienBaruCount++;
        }

        // Catat nama layanan
        const serviceName = booking.service?.nama || 'Konseling';
        if (!serviceCountMap[serviceName]) {
          serviceCountMap[serviceName] = { name: serviceName, count: 0 };
        }
        serviceCountMap[serviceName].count++;
      }

      // 3. Ambil data tren pasien per bulan sepanjang tahun yang dipilih
      const yearBookings = await this.prisma.booking.findMany({
        where: {
          scheduledDate: {
            gte: startDateYear,
            lte: endDateYear,
          },
          status: {
            notIn: ['CANCELLED', 'REJECTED'],
          },
        },
        select: {
          scheduledDate: true,
        },
      });

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const monthlyPatients = months.map((m, idx) => {
        const count = yearBookings.filter((b) => {
          if (!b.scheduledDate) return false;
          return new Date(b.scheduledDate).getMonth() === idx;
        }).length;
        return { month: m, count };
      });

      const topServices = Object.values(serviceCountMap).sort((a, b) => b.count - a.count);

      return {
        totalUsers,
        totalBookings: totalBooking,
        klienLama: klienLamaCount,
        klienBaru: klienBaruCount,
        revenue: {
          lunas: totalLunas,
          dp: totalDP,
          total: totalLunas + totalDP,
        },
        monthlyPatients,
        topServices,
      };
    } catch (error) {
      this.logger.error('Gagal mengambil data statistik admin:', error);
      return {
        totalUsers: 0,
        totalBookings: 0,
        klienLama: 0,
        klienBaru: 0,
        revenue: { lunas: 0, dp: 0, total: 0 },
        monthlyPatients: [],
        topServices: [],
      };
    }
  }
}