import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller()
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // 1. Endpoint Statistik Publik (Landing Page)
  @Get(['statistics', 'api/statistics', 'analytics/public', 'api/analytics/public'])
  async getPublicStatistics() {
    return this.statisticsService.getPublicStatistics();
  }

  // 2. Endpoint Statistik Admin Dashboard
  @Get([
    'admin-analytics',
    'api/admin-analytics',
    'analytics/admin',
    'api/analytics/admin',
    'statistics/admin',
    'api/statistics/admin',
  ])
  async getAdminStatistics(
    @Query('bookingMonth') bookingMonth?: string,
    @Query('patientYear') patientYear?: string,
  ) {
    return this.statisticsService.getAdminStatistics({ bookingMonth, patientYear });
  }
}