import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';

/**
 * PrismaService - Manages Prisma ORM client lifecycle
 *
 * This service:
 * - Dynamically imports Prisma Client in ESM context
 * - Ensures database connection on module initialization
 * - Gracefully disconnects on module destruction
 * - Provides proxy access to Prisma models and operations
 */

let PrismaClientClass: any;
let prismaClientLoaded = false;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private client: any;

  async onModuleInit() {
    try {
      if (!prismaClientLoaded) {
        // Dynamic import from .prisma-client/client.js (ESM format)
        // Both src/ and dist/ paths work with this approach
        const clientModule = await import('../.prisma-client/client.js');
        PrismaClientClass = clientModule.PrismaClient;
        prismaClientLoaded = true;
      }

      this.client = new PrismaClientClass();
      await this.client.$connect();
      this.logger.log('✓ Database connected successfully');
    } catch (error) {
      this.logger.error(
        `✗ Database connection failed: ${error instanceof Error ? error.message : String(error)}`,
        error instanceof Error ? error.stack : ''
      );
      throw new Error('Failed to initialize Prisma service');
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      try {
        await this.client.$disconnect();
        this.logger.log('✓ Database disconnected');
      } catch (error) {
        this.logger.error(
          `✗ Error disconnecting database: ${error instanceof Error ? error.message : String(error)}`
        );
      }
    }
  }

  // Delegate all Prisma operations to the client instance
  $connect() {
    return this.client?.$connect();
  }

  $disconnect() {
    return this.client?.$disconnect();
  }

  $transaction(fn: any) {
    return this.client?.$transaction(fn);
  }

  // Proxy all model access (user, post, etc.) to the client
  [key: string]: any;
}
