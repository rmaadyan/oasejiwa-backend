import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { AdminAnalyticsService } from './admin-analytics.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller(['admin-analytics', 'api/admin-analytics'])
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminAnalyticsController {
  constructor(private readonly adminAnalyticsService: AdminAnalyticsService) {}

  @Get()
  getAnalytics(
    @Query('bookingMonth') bookingMonth?: string,
    @Query('patientYear') patientYear?: string,
  ) {
    return this.adminAnalyticsService.getAnalytics({
      bookingMonth,
      patientYear,
    });
  }
}