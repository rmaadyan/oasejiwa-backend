import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { OfficialMedicalRecordService } from './official-medical-record.service';
import { CreateOfficialMedicalRecordDto } from './dto/create-official-medical-record.dto';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('official-medical-records')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OfficialMedicalRecordController {
  constructor(
    private readonly officialMedicalRecordService: OfficialMedicalRecordService,
  ) {}

  @Post()
  @Roles('PSYCHOLOGIST')
  create(@Req() req: any, @Body() dto: CreateOfficialMedicalRecordDto) {
    return this.officialMedicalRecordService.create(req.user, dto);
  }

  @Get()
  @Roles('PSYCHOLOGIST', 'ADMIN')
  findAllForPsychologist(@Req() req: any) {
    if (req.user?.role === 'ADMIN') {
      return this.officialMedicalRecordService.findPatientRecords('');
    }
    return this.officialMedicalRecordService.findAllForPsychologist(req.user);
  }

  @Get('patient/:patientId')
  @Roles('PSYCHOLOGIST', 'ADMIN')
  findPatientRecords(@Param('patientId') patientId: string) {
    return this.officialMedicalRecordService.findPatientRecords(patientId);
  }

  @Get(':id')
  @Roles('PSYCHOLOGIST', 'ADMIN')
  findOne(@Param('id') id: string) {
    return this.officialMedicalRecordService.findOne(id);
  }
}
