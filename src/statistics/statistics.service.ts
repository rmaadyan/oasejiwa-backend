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

  constructor(
    private readonly prisma: PrismaService,
    private readonly googleReviewsService: GoogleReviewsService,
  ) {}

  async getPublicStatistics(): Promise<PublicStatisticsResponse> {
    try {
      const totalPsychologists = await this.prisma.psychologistProfile.count();
      const googleData = await this.googleReviewsService.getReviews();
      return {
        totalClients: 250,
        totalPsychologists: Math.max(totalPsychologists, 1),
        averageRating: googleData.rating || 4.9,
        totalReviews: googleData.totalReviews || 157,
        lastUpdated: new Date().toISOString(),
      };
    } catch {
      return {
        totalClients: 250,
        totalPsychologists: 1,
        averageRating: 4.9,
        totalReviews: 157,
        lastUpdated: new Date().toISOString(),
      };
    }
  }

  async getAdminStatistics(query: { bookingMonth?: string; patientYear?: string }) {
    try {
      // 1. Ambil total user
      const totalUsers = await this.prisma.user.count({
        where: { role: { in: ['USER', 'PATIENT'] as any } },
      });

      // 2. Ambil seluruh booking aktif
      const allBookings = await this.prisma.booking.findMany({
        where: {
          status: { notIn: ['CANCELLED', 'REJECTED'] },
        },
        include: { service: true, user: true },
        orderBy: { createdAt: 'desc' },
      });

      let totalLunas = 0;
      let totalDP = 0;
      let klienLamaCount = 0;
      let klienBaruCount = 0;
      const serviceCountMap: Record<string, { name: string; count: number }> = {};

      for (const booking of allBookings) {
        const rawTotal = Number(booking.totalPrice || 0);
        const rawDP = Number(booking.dpAmount || rawTotal * 0.5);
        const status = String(booking.status).toUpperCase();

        if (status === 'FULLY_PAID' || status === 'COMPLETED') {
          totalLunas += rawTotal;
        } else {
          totalDP += rawDP;
        }

        if (booking.userId) {
          klienBaruCount++;
        }

        const serviceName = booking.service?.nama || 'Konseling';
        if (!serviceCountMap[serviceName]) {
          serviceCountMap[serviceName] = { name: serviceName, count: 0 };
        }
        serviceCountMap[serviceName].count++;
      }

      // Grafik Pasien Bulanan Sepanjang Tahun
      const currentYear = Number(query.patientYear) || new Date().getFullYear();
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
      const monthlyPatients = months.map((m, idx) => {
        const count = allBookings.filter((b) => {
          const d = b.scheduledDate ? new Date(b.scheduledDate) : new Date(b.createdAt);
          return d.getFullYear() === currentYear && d.getMonth() === idx;
        }).length;
        return { month: m, count, patients: count };
      });

      const topServices = Object.values(serviceCountMap).sort((a, b) => b.count - a.count);

      // Return gabungan (kompatibel untuk format objek maupun array)
      return {
        stats: {
          totalUsers: Math.max(totalUsers, allBookings.length),
          totalBookings: allBookings.length,
          klienLama: klienLamaCount,
          klienBaru: klienBaruCount || allBookings.length,
          totalRevenue: totalLunas + totalDP,
          lunas: totalLunas,
          dp: totalDP,
        },
        bookings: allBookings,
        revenue: {
          lunas: totalLunas,
          dp: totalDP,
          total: totalLunas + totalDP,
        },
        monthlyPatients,
        topServices,
        topTests: [],
        patients: allBookings.map((b) => b.user).filter(Boolean),
      };
    } catch (error) {
      this.logger.error('Gagal mengambil data statistik admin:', error);
      return {
        stats: { totalUsers: 0, totalBookings: 0, klienLama: 0, klienBaru: 0, totalRevenue: 0, lunas: 0, dp: 0 },
        bookings: [],
        revenue: { lunas: 0, dp: 0, total: 0 },
        monthlyPatients: [],
        topServices: [],
        topTests: [],
        patients: [],
      };
    }
  }
}