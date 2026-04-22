import {
  INestApplication,
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '../../.prisma-client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error('DATABASE_URL tidak ditemukan di environment variables');
    }

    const adapter = new PrismaPg({ connectionString });

    super({ adapter });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✓ Database connected successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : '';
      this.logger.error(`✗ Database connection failed: ${message}`, stack);
      throw new Error('Failed to initialize Prisma service');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('✓ Database disconnected');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      this.logger.error(`✗ Error disconnecting database: ${message}`);
    }
  }

  enableShutdownHooks(app: INestApplication): void {
    process.on('beforeExit', () => {
      void app.close();
    });
  }
}