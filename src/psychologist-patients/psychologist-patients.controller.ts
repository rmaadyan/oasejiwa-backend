import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Query,
  UseGuards,
  Patch,
  Body,
} from '@nestjs/common';
import { PsychologistPatientsService } from './psychologist-patients.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { UpdatePatientMedicalDto } from './dto/update-patient-medical.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

@Controller('psychologist/patients')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PSYCHOLOGIST')
export class PsychologistPatientsController {
  constructor(
    private readonly service: PsychologistPatientsService,
  ) {}

  @Get()
  getAll(@CurrentUser() user: any, @Query() query: any) {
    return this.service.getAll(user, query);
  }

  @Post()
  createPatient(@CurrentUser() user: any, @Body() dto: any) {
    return this.service.createPatient(user, dto);
  }

  @Get(':id')
  getById(@CurrentUser() user: any, @Param('id') id: string) {
    return this.service.getById(user, id);
  }

  @Patch(':id/medical')
  updateMedical(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdatePatientMedicalDto,
  ) {
    return this.service.updateMedical(user, id, dto);
  }

  @Patch(':id/emergency-contact')
  updateEmergencyContact(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdateEmergencyContactDto,
  ) {
    return this.service.updateEmergencyContact(user, id, dto);
  }

  @Delete(':id')
  deletePatient(@CurrentUser() user: any, @Param('id') id: string) {
    return this.service.deletePatient(user, id);
  }
}