import { Module } from '@nestjs/common';
import { AdminMedicalRecordsController } from './admin-medical-records.controller';
import { AdminMedicalRecordsService } from './admin-medical-records.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [AdminMedicalRecordsController],
  providers: [AdminMedicalRecordsService],
  exports: [AdminMedicalRecordsService],
})
export class AdminMedicalRecordsModule {}
