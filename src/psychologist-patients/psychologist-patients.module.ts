import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { PsychologistPatientsController } from './psychologist-patients.controller';
import { PsychologistPatientsService } from './psychologist-patients.service';

@Module({
  imports: [PrismaModule],
  controllers: [PsychologistPatientsController],
  providers: [PsychologistPatientsService],
})
export class PsychologistPatientsModule {}