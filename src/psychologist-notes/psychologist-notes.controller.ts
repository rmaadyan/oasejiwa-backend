import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PsychologistNotesService } from './psychologist-notes.service';
import { CreatePsychologistNoteDto } from './dto/create-psychologist-note.dto';
import { UpdatePsychologistNoteDto } from './dto/update-psychologist-note.dto';
import { QueryPsychologistNoteDto } from './dto/query-psychologist-note.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('psychologist')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PSYCHOLOGIST')
export class PsychologistNotesController {
  constructor(
    private readonly psychologistNotesService: PsychologistNotesService,
  ) {}

  @Post('notes')
  create(
    @CurrentUser() user: any,
    @Body() dto: CreatePsychologistNoteDto,
  ) {
    return this.psychologistNotesService.create(user, dto);
  }

  @Get('notes')
  findAll(
    @CurrentUser() user: any,
    @Query() query: QueryPsychologistNoteDto,
  ) {
    return this.psychologistNotesService.findAll(user, query);
  }

  @Get('notes/:id')
  findOne(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.psychologistNotesService.findOne(user, id);
  }

  @Get('sessions/:scheduleId/notes')
  findByScheduleId(
    @CurrentUser() user: any,
    @Param('scheduleId') scheduleId: string,
  ) {
    return this.psychologistNotesService.findByScheduleId(user, scheduleId);
  }

  @Put('notes/:id')
  update(
    @CurrentUser() user: any,
    @Param('id') id: string,
    @Body() dto: UpdatePsychologistNoteDto,
  ) {
    return this.psychologistNotesService.update(user, id, dto);
  }

  @Delete('notes/:id')
  remove(
    @CurrentUser() user: any,
    @Param('id') id: string,
  ) {
    return this.psychologistNotesService.remove(user, id);
  }
}