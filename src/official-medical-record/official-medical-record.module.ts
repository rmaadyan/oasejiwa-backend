import { Module } from '@nestjs/common';
import { OfficialMedicalRecordService } from './official-medical-record.service';
import { OfficialMedicalRecordController } from './official-medical-record.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [OfficialMedicalRecordController],
  providers: [OfficialMedicalRecordService],
  exports: [OfficialMedicalRecordService],
})
export class OfficialMedicalRecordModule {}
