import {
  Controller,
  Get,
  Put,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { PsychologistService } from './psychologist.service';
import { SkipThrottle } from '@nestjs/throttler';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@SkipThrottle()
@Controller(['psychologist', 'psychologists'])
export class PsychologistController {
  constructor(private readonly psychologistService: PsychologistService) {}

  // =========================================================
  // 🟢 ROUTE PUBLIC (DITARUH DI ATAS AGAR TIDAK BENTROK PATTERN)
  // =========================================================

  @Get('public/all')
  getAllPsychologistsPublicAll() {
    return this.psychologistService.getAllPsychologists();
  }

  @Get('public')
  getAllPsychologistsPublic() {
    return this.psychologistService.getAllPsychologists();
  }

  @Get('public/:id')
  getPsychologistByIdPublic(@Param('id') id: string) {
    return this.psychologistService.getPsychologistById(id);
  }

  @Get()
  getAllPsychologists() {
    return this.psychologistService.getAllPsychologists();
  }

  // =========================================================
  // 🟢 ROUTE PRIVATE (MENGGUNAKAN JWT AUTH GUARD)
  // =========================================================

  @Get('dashboard')
  @UseGuards(JwtAuthGuard)
  getDashboard(@Req() req: any) {
    return this.psychologistService.getDashboard(req.user.id);
  }

  @Get('sessions')
  @UseGuards(JwtAuthGuard)
  getAllSessions(@Req() req: any) {
    return this.psychologistService.getAllSessions(req.user.id);
  }

  @Get('patients')
  @UseGuards(JwtAuthGuard)
  getAllPatients(@Req() req: any) {
    return this.psychologistService.getAllPatients(req.user.id);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req: any) {
    return this.psychologistService.getProfile(req.user.id);
  }

  @Put('profile')
  @UseGuards(JwtAuthGuard)
  updateProfile(@Req() req: any, @Body() dto: any) {
    return this.psychologistService.updateProfile(req.user.id, dto);
  }

  @Post('schedule')
  @UseGuards(JwtAuthGuard)
  addSchedule(@Req() req: any, @Body() dto: { date?: string; day?: string; time: string }) {
    return this.psychologistService.addSchedule(req.user.id, dto);
  }

  @Delete('schedule/:id')
  @UseGuards(JwtAuthGuard)
  deleteSchedule(@Req() req: any, @Param('id') id: string) {
    return this.psychologistService.deleteSchedule(req.user.id, id);
  }

  @Patch('sessions/:id/status')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('PSYCHOLOGIST', 'ADMIN') // 🟢 Pastikan mengizinkan role Psikolog & Admin
updateSessionStatus(
  @Req() req: any,
  @Param('id') id: string,
  @Body() body: { status: string; reason?: string },
) {
  return this.psychologistService.updateSessionStatus(req.user.id, id, body);
}

  @Get(':id')
  getPsychologistById(@Param('id') id: string) {
    return this.psychologistService.getPsychologistById(id);
  }
  @Get('notes')
  @UseGuards(JwtAuthGuard)
  getAllNotes(@Req() req: any, @Query() query: any) {
    return this.psychologistService.getAllNotes(req.user.id, query);
  }

  @Get('notes/:id')
  @UseGuards(JwtAuthGuard)
  getNoteById(@Req() req: any, @Param('id') id: string) {
    return this.psychologistService.getNoteById(req.user.id, id);
  }
  
}