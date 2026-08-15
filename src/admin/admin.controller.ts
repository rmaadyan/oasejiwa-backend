import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePsychologistByAdminDto } from './dto/create-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { BookingService } from '../booking/booking.service';

@Controller('admin')
export class AdminController {
  // 🟢 HANYA INJECT AdminService (Hapus PsychologistService dari sini)
  constructor(
    private readonly adminService: AdminService,
    private readonly bookingService: BookingService,
  ) {}

  // Endpoint Statistik Dashboard
  @Get('dashboard/stats')
  async getDashboardStats() {
    return this.adminService.getDashboardStats();
  }

  // Endpoint Get Semua User (Pasien & Psikolog)
  @Get('users')
  async getAllUsers() {
    return this.adminService.getAllUsers();
  }

  // Endpoint Detail User berdasarkan ID
  @Get('users/:id')
  async getUserDetail(@Param('id') id: string) {
    return this.adminService.getUserDetailByAdmin(id);
  }

  // 1. GET: Ambil Semua Daftar Psikolog dari Database
  @Get('psychologist')
  async getAllPsychologists() {
    return this.adminService.getAllPsychologists();
  }

  // 2. POST: Tambah Psikolog Baru & Kirim Email Kredensial
  @Post('psychologist')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createPsychologist(@Body() dto: CreatePsychologistByAdminDto) {
    return this.adminService.createPsychologist(dto);
  }

  // 3. PATCH: Edit Data Psikolog Berdasarkan ID Profile
  @Patch('psychologist/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async updatePsychologist(
    @Param('id') id: string,
    @Body() dto: UpdatePsychologistDto,
  ) {
    return this.adminService.updatePsychologist(id, dto);
  }

  // 4. DELETE: Hapus Akun Psikolog Berdasarkan ID Profile
  @Delete('psychologist/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async deletePsychologist(@Param('id') id: string) {
    return this.adminService.deletePsychologist(id);
  }

  // 🟢 5. POST: Kirim Email Pengingat Update Profil Psikolog
  @Post('psychologist/:id/send-reminder')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async sendReminderEmail(@Param('id') id: string) {
    // Dipanggil langsung lewat adminService!
    return this.adminService.sendPsychologistReminder(id);
  }

  // 6. ADMIN: Lihat semua booking
  @Get('bookings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  // 7. ADMIN: Lihat detail booking
  @Get('bookings/:id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getBookingDetail(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.bookingService.getBookingById(id, req.user.id, req.user.role);
  }

  // 8. ADMIN: Approve booking
  @Patch('bookings/:id/approve')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async approveBooking(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.bookingService.approveBooking(id, req.user.id);
  }

  // 9. ADMIN: Reject booking
  @Patch('bookings/:id/reject')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async rejectBooking(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body('reason') reason?: string,
  ) {
    return this.bookingService.rejectBooking(id, req.user.id, reason);
  }
  // 🟢 10. ADMIN: Reschedule Booking & Kirim Notifikasi ke User & Psikolog
  @Patch('bookings/:id/reschedule')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async rescheduleBooking(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body() dto: { newDate: string; newTime: string; reason?: string },
  ) {
    return this.bookingService.rescheduleBookingByAdmin(id, req.user.id, dto);
  }
}

