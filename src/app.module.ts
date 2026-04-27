import 'dotenv/config';
import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigService } from './config/config.service';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';

import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import { LayananModule } from './layanan/layanan.module';
import { TesModule } from './tes/tes.module';
import { UploadModule } from './upload/upload.module';
import { PsychologistModule } from './psychologist/psychologist.module';

import { PsychologistNotesModule } from './psychologist-notes/psychologist-notes.module';
import { PsychologistProfileModule } from './psychologist-profile/psychologist-profile.module';
import { PsychologistPatientsModule } from './psychologist-patients/psychologist-patients.module';
import { PsychologistScheduleModule } from './psychologist-schedule/psychologist-schedule.module';
import { PsychologistDashboardModule } from './psychologist-dashboard/psychologist-dashboard.module';

import { AdminUsersModule } from './admin-users/admin-users.module';
import { AdminDashboardModule } from './admin-dashboard/admin-dashboard.module';
import { AdminAnalyticsModule } from './admin-analytics/admin-analytics.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmailModule,

    AdminModule,
    UserModule,
    LayananModule,
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

    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      },
      defaults: {
        from: `"Oase Jiwa" <${process.env.EMAIL_USER}>`,
      },
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
    ConfigService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}