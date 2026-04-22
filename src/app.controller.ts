import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

interface HealthStatus {
  status: 'ok' | 'degraded';
  timestamp: string;
  message: string;
  database?: boolean;
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly prismaService: PrismaService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('health')
  async getHealth(): Promise<HealthStatus> {
    try {
      // Try to ping the database
      await this.prismaService.$queryRaw`SELECT 1`;

      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        message: 'Application is healthy',
        database: true,
      };
    } catch {
      return {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        message: 'Database connection failed',
        database: false,
      };
    }
  }
}
