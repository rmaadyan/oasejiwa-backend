import { Pool } from 'pg';
import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  constructor() {
    let connectionString = process.env.DATABASE_URL || 'postgresql://oasejiwa:sosok_menginspirasi@postgres:5432/oase_jiwa_db';
    if (connectionString.includes('localhost') || connectionString.includes('127.0.0.1')) {
      // In Docker networking, convert localhost/127.0.0.1 to postgres:5432
      const isDocker = process.env.NODE_ENV === 'production' || process.cwd().includes('app') || require('fs').existsSync('/.dockerenv');
      if (isDocker) {
        connectionString = connectionString
          .replace('localhost:5433', 'postgres:5432')
          .replace('127.0.0.1:5433', 'postgres:5432')
          .replace('localhost:5432', 'postgres:5432')
          .replace('127.0.0.1:5432', 'postgres:5432');
      }
    }
    const pool = new Pool({ connectionString });
    const adapter = new PrismaPg(pool);
    super({ adapter });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected successfully');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('Database disconnected');
  }
}