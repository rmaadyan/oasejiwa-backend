import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PsychologistNotesService } from './psychologist-notes.service';
import { CreatePsychologistNoteDto } from './dto/create-psychologist-note.dto';
import { UpdatePsychologistNoteDto } from './dto/update-psychologist-note.dto';
import { QueryPsychologistNoteDto } from './dto/query-psychologist-note.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';
import type { AuthUser } from '../common/interfaces/auth-user.interface';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('psychologist')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PSYCHOLOGIST')
export class PsychologistNotesController {
  constructor(
    private readonly psychologistNotesService: PsychologistNotesService,
  ) {}

  @Post('notes')
  create(
    @CurrentUser() user: AuthUser,
    @Body() dto: CreatePsychologistNoteDto,
  ) {
    return this.psychologistNotesService.create(user, dto);
  }

  @Get('notes')
  findAll(
    @CurrentUser() user: AuthUser,
    @Query() query: QueryPsychologistNoteDto,
  ) {
    return this.psychologistNotesService.findAll(user, query);
  }

  @Get('notes/:id')
  findOne(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.psychologistNotesService.findOne(user, id);
  }

  @Get('sessions/:sessionId/notes')
  findBySessionId(
    @CurrentUser() user: AuthUser,
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ) {
    return this.psychologistNotesService.findBySessionId(user, sessionId);
  }

  @Put('notes/:id')
  update(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdatePsychologistNoteDto,
  ) {
    return this.psychologistNotesService.update(user, id, dto);
  }

  @Delete('notes/:id')
  remove(
    @CurrentUser() user: AuthUser,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.psychologistNotesService.remove(user, id);
  }
}