import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PsychologistScheduleService } from './psychologist-schedule.service';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('psychologist')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PSYCHOLOGIST')
export class PsychologistScheduleController {
  constructor(private readonly service: PsychologistScheduleService) {}

  @Get('sessions')
  getAll(@CurrentUser() user: any, @Query() query: any) {
    return this.service.getAll(user, query);
  }

  @Get('sessions/:id')
  getById(@CurrentUser() user: any, @Param('id') id: string) {
    return this.service.getById(user, id);
  }

  @Patch('sessions/:id/complete')
  completeSession(@CurrentUser() user: any, @Param('id') id: string) {
    return this.service.completeSession(user, id);
  }

  @Patch('sessions/:id/cancel')
  cancelSession(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() body: { reason?: string },
  ) {
    return this.service.cancelSession(user, id, body);
  }
}