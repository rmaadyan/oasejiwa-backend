import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: ['error', 'warn'],
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      this.logger.log('✓ Database connected successfully');
    } catch (error) {
      this.logger.error(
        `✗ Database connection failed: ${
          error instanceof Error ? error.message : String(error)
        }`,
        error instanceof Error ? error.stack : '',
      );

      throw new Error('Failed to initialize Prisma service');
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      this.logger.log('✓ Database disconnected');
    } catch (error) {
      this.logger.error(
        `✗ Error disconnecting database: ${
          error instanceof Error ? error.message : String(error)
        }`,
      );
    }
  }
}