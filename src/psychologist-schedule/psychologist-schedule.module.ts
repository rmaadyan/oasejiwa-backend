import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PsychologistScheduleController } from './psychologist-schedule.controller';
import { PsychologistScheduleService } from './psychologist-schedule.service';

@Module({
  imports: [PrismaModule],
  controllers: [PsychologistScheduleController],
  providers: [PsychologistScheduleService],
})
export class PsychologistScheduleModule {}