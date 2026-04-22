import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
  INestApplication,
} from '@nestjs/common';

let PrismaClientClass: any;
let prismaClientLoaded = false;

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);
  private client: any;

  async onModuleInit() {
    try {
      if (!prismaClientLoaded) {
        // Try to load Prisma client from generated files
        // Support both development and production paths
        let clientModule: any;

        try {
          // Try explicit path first for ESM
          clientModule = await import('../../.prisma-client/client.js');
        } catch {
          try {
            // Fallback to CommonJS require - uses eslint-disable due to project requirements
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            clientModule = require('../../.prisma-client/client.js');
          } catch {
            this.logger.error(
              'Could not load Prisma client from .prisma-client',
            );
            throw new Error('Failed to load Prisma client module');
          }
        }

        // Extract PrismaClient from module
        PrismaClientClass =
          clientModule?.PrismaClient ||
          clientModule?.default?.PrismaClient ||
          clientModule;
        prismaClientLoaded = true;
      }

      this.client = new PrismaClientClass();
      await this.client.$connect();
      this.logger.log('✓ Database connected successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      const stack = err instanceof Error ? err.stack : '';
      this.logger.error(`✗ Database connection failed: ${message}`, stack);
      throw new Error('Failed to initialize Prisma service');
    }
  }

  async onModuleDestroy() {
    if (this.client) {
      try {
        await this.client.$disconnect();
        this.logger.log('✓ Database disconnected');
      } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        this.logger.error(`✗ Error disconnecting database: ${message}`);
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

  // Proxy method for raw queries
  $queryRaw(query: any, ...values: any[]) {
    return this.client?.$queryRaw(query, ...values);
  }

  // Proxy specific models used in the application
  get user() {
    return this.client?.user;
  }

  get psychologist() {
    return this.client?.psychologist;
  }

  get session() {
    return this.client?.session;
  }

  get sessionNote() {
    return this.client?.sessionNote;
  }

  get auditLog() {
    return this.client?.auditLog;
  }

  // Shutdown hook support for backwards compatibility
  enableShutdownHooks(app: INestApplication): void {
    process.on('beforeExit', () => {
      void this.client?.$disconnect();
      void app.close();
    });
  }

  // Generic proxy for any other models not explicitly defined
  [key: string]: any;
}
