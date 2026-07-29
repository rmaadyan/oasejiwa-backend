import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AdminMedicalRecordsService } from './admin-medical-records.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';

@Controller('admin-medical-records')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminMedicalRecordsController {
  constructor(
    private readonly adminMedicalRecordsService: AdminMedicalRecordsService,
  ) {}

  @Get()
  getAllMedicalRecords(@Query() query: any) {
    return this.adminMedicalRecordsService.getAllMedicalRecords(query);
  }

  @Get(':id')
  getPatientMedicalRecord(@Param('id') id: string) {
    return this.adminMedicalRecordsService.getPatientMedicalRecord(id);
  }
}
