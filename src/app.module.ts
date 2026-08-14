import 'dotenv/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

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
import { OfficialMedicalRecordModule } from './official-medical-record/official-medical-record.module';
import { GoogleReviewsModule } from './google-reviews/google-reviews.module';
import { StatisticsModule } from './statistics/statistics.module';

@Module({
  imports: [
    // 1. ConfigModule global agar .env selalu terbaca
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
    OfficialMedicalRecordModule,

    AdminUsersModule,
    AdminDashboardModule,
    AdminAnalyticsModule,
    AdminMedicalRecordsModule,

    // Mailer Module dengan proteksi sanitasi password dan fleksibilitas env
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        const host = config.get('MAIL_HOST') || 'smtp.gmail.com';
        const port = Number(config.get('MAIL_PORT')) || 587;
        const user = config.get('MAIL_USER') || process.env.EMAIL_USER || '';
        const rawPass = config.get('MAIL_PASS') || process.env.EMAIL_PASS || '';
        const pass = rawPass.replace(/\s+/g, '');
        const from = config.get('MAIL_FROM') || `"Oase Jiwa" <${user}>`;
        const secure = port === 465;

        return {
          transport: {
            host,
            port,
            secure,
            auth: {
              user,
              pass,
            },
            tls: {
              rejectUnauthorized: false,
            },
          },
          defaults: {
            from,
          },
        };
      },
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