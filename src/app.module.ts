import 'dotenv/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config'; // 👈 Tambahkan ConfigModule & ConfigService

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { LayananModule } from './layanan/layanan.module';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { PaymentModule } from './payment/payment.module';
import { PsychologistModule } from './psychologist/psychologist.module';
import { TesModule } from './tes/tes.module';
import { UploadModule } from './upload/upload.module';
import { EmailModule } from './email/email.module';
import { PsychologistNotesModule } from './psychologist-notes/psychologist-notes.module';
import { PsychologistProfileModule } from './psychologist-profile/psychologist-profile.module';
import { PsychologistPatientsModule } from './psychologist-patients/psychologist-patients.module';
import { PsychologistScheduleModule } from './psychologist-schedule/psychologist-schedule.module';
import { PsychologistDashboardModule } from './psychologist-dashboard/psychologist-dashboard.module';
import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AdminAnalyticsModule } from './admin-analytics/admin-analytics.module';
import { AdminMedicalRecordsModule } from './admin-medical-records/admin-medical-records.module';
import { GoogleReviewsModule } from './google-reviews/google-reviews.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    // 1. Tambahkan ConfigModule global agar .env dijamin terbaca sempurna
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    PrismaModule,
    AuthModule,
    EmailModule,
    GoogleReviewsModule,
    StatisticsModule,

    AdminModule,
    UserModule,
    LayananModule,
    BookingModule,
    PaymentModule,
    TesModule,
    UploadModule,
    PsychologistModule,

    PsychologistNotesModule,
    PsychologistProfileModule,
    PsychologistPatientsModule,
    PsychologistScheduleModule,
    PsychologistDashboardModule,

    AdminUsersModule,
    AdminDashboardModule,
    AdminAnalyticsModule,
    AdminMedicalRecordsModule,

    // 2. Gunakan forRootAsync agar aman dari undefined
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('MAIL_HOST') || 'smtp.gmail.com',
          port: Number(config.get('MAIL_PORT')) || 465,
          secure: Number(config.get('MAIL_PORT')) === 465, // true untuk port 465
          auth: {
            user: config.get('MAIL_USER') || process.env.EMAIL_USER,
            pass: config.get('MAIL_PASS') || process.env.EMAIL_PASS,
          },
        },
        defaults: {
          from: config.get('MAIL_FROM') || `"Oase Jiwa" <${config.get('MAIL_USER')}>`,
        },
      }),
      inject: [ConfigService],
    }),

    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 60,
        },
      ],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}