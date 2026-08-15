import { Controller, Get, Query } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller(['statistics', 'api/statistics', 'analytics', 'api/analytics', 'admin-analytics', 'api/admin-analytics'])
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getPublicStatistics() {
    return this.statisticsService.getPublicStatistics();
  }

  // 🟢 Melayani endpoint /analytics/admin & /api/analytics/admin
  @Get('admin')
  async getAdminStatistics(
    @Query('bookingMonth') bookingMonth?: string,
    @Query('patientYear') patientYear?: string,
  ) {
    if (typeof (this.statisticsService as any).getAdminStatistics === 'function') {
      return (this.statisticsService as any).getAdminStatistics({ bookingMonth, patientYear });
    }
    return this.statisticsService.getPublicStatistics();
  }
}