import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GoogleReviewsService } from './google-reviews.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('google-reviews')
export class GoogleReviewsController {
  constructor(private readonly googleReviewsService: GoogleReviewsService) {}

  @Get()
  async getPublicReviews() {
    return this.googleReviewsService.getReviews(false);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async getAdminReviews() {
    const data = await this.googleReviewsService.getReviews(false);
    return {
      ...data,
      accessMode: 'READ_ONLY',
      note: 'Admin dapat memantau data ulasan Google secara real-time.',
    };
  }

  @UseGuards(JwtAuthGuard)
  @Post('sync')
  async syncAdminReviews() {
    const data = await this.googleReviewsService.getReviews(true);
    return {
      ...data,
      message: 'Berhasil melakukan sinkronisasi dengan Google Business Profile!',
    };
  }
}
