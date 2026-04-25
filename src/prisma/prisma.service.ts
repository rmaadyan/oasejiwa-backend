import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { PrismaClient } from '../../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  private readonly adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
  });

  private readonly client: any = new PrismaClient({
    adapter: this.adapter,
  });

  async onModuleInit() {
    await this.client.$connect();
    this.logger.log('✓ Database connected successfully');
  }

  async onModuleDestroy() {
    await this.client.$disconnect();
    this.logger.log('✓ Database disconnected');
  }

  get user() {
    return this.client.user;
  }

  get userProfile() {
    return this.client.userProfile;
  }

  get authProvider() {
    return this.client.authProvider;
  }

  get passwordReset() {
    return this.client.passwordReset;
  }

  get psychologistProfile() {
    return this.client.psychologistProfile;
  }

  get education() {
    return this.client.education;
  }

  get experience() {
    return this.client.experience;
  }

  get specialization() {
    return this.client.specialization;
  }

  get expertise() {
    return this.client.expertise;
  }

  get schedule() {
    return this.client.schedule;
  }

  get emailVerification() {
    return this.client.emailVerification;
  }

  get sessionNote() {
    return this.client.sessionNote;
  }

    $connect() {
    return this.client.$connect();
  }

  $disconnect() {
    return this.client.$disconnect();
  }

  $transaction(arg: any) {
    return this.client.$transaction(arg);
  }

  $queryRaw(...args: any[]) {
    return this.client.$queryRaw(...args);
  }

  $executeRaw(...args: any[]) {
    return this.client.$executeRaw(...args);
  }
}