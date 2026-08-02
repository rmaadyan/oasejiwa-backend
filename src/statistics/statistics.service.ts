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

  private readonly CACHE_TTL_MS = 5 * 1000; // 5 detik untuk respon real-time cepat

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
      // 1. Unique patient count from SessionNote (Rekam Medis Digital)
      const uniquePatients = await this.prisma.sessionNote.findMany({
        where: {
          deletedAt: null,
        },
        distinct: ['userId'],
        select: { userId: true },
      });
      const totalClients = uniquePatients.length;

      // 2. Total active psychologists count
      const totalPsychologists = await this.prisma.psychologistProfile.count();

      // 3. Google Reviews statistics
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

      // Fallback response if DB error occurs
      if (this.cache.data) {
        return this.cache.data;
      }

      return {
        totalClients: 0,
        totalPsychologists: 1,
        averageRating: 4.9,
        totalReviews: 157,
        lastUpdated: now.toISOString(),
      };
    }
  }
}
