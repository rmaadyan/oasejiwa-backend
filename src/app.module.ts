import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PsychologistNotesModule } from './psychologist-notes/psychologist-notes.module';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PsychologistProfileModule } from './psychologist-profile/psychologist-profile.module';
import { PsychologistPatientsModule } from './psychologist-patients/psychologist-patients.module';
import { PsychologistScheduleModule } from './psychologist-schedule/psychologist-schedule.module';
import { PsychologistDashboardModule } from './psychologist-dashboard/psychologist-dashboard.module';
import { AdminUsersModule } from './admin-users/admin-users.module';

@Module({
  imports: [  PrismaModule,
  AuthModule,
  PsychologistNotesModule,
  PsychologistProfileModule,
  PsychologistPatientsModule,
  PsychologistScheduleModule,
  PsychologistDashboardModule,
  AdminUsersModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}