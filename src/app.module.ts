import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { EmailModule } from './email/email.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AdminModule } from './admin/admin.module';
import { UserModule } from './user/user.module';
import {MailerModule} from '@nestjs-modules/mailer';
import { PsychologistModule } from './psychologist/psychologist.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    EmailModule,
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
    PsychologistModule,
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 3600000,
          limit: 3,     
        },
      ],
    }),
    AdminModule,
    UserModule,
    PsychologistModule,
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