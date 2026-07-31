import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Body,
  Req,
  Query,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('bookings')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  /**
   * PUBLIK: Cek tanggal mana saja yang sudah dibooking (Tanpa Guard)
   * GET /bookings/public/booked-dates?psychologistId=xxx&time=16:10
   */
  @Get('public/booked-dates')
  getBookedDates(
    @Query('psychologistId') psychologistId: string,
    @Query('time') time: string,
  ) {
    return this.bookingService.getBookedDates(psychologistId, time);
  }

  /**
   * USER: Buat booking baru
   * POST /bookings
   */
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  createBooking(@Req() req, @Body() dto: CreateBookingDto) {
    return this.bookingService.createBooking(req.user.id, dto);
  }

  /**
   * USER: Lihat semua booking miliknya
   * GET /bookings/my-bookings
   */
  @Get('my-bookings')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  getMyBookings(@Req() req) {
    return this.bookingService.getMyBookings(req.user.id);
  }

  /**
   * ADMIN: Lihat seluruh transaksi booking
   * GET /bookings/all
   */
  @Get('all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  /**
   * USER/ADMIN: Lihat detail booking berdasarkan ID
   * GET /bookings/:id
   */
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getBookingById(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.bookingService.getBookingById(id, req.user.id, req.user.role);
  }

  /**
   * USER: Reschedule booking
   * PATCH /bookings/:id/reschedule
   */
  @Patch(':id/reschedule')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('USER')
  rescheduleBooking(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
    @Body() dto: RescheduleBookingDto,
  ) {
    return this.bookingService.rescheduleBooking(id, req.user.id, dto);
  }

  /**
   * ADMIN: Konfirmasi Pelunasan
   * PATCH /bookings/:id/confirm-full-payment
   */
  @Patch(':id/confirm-full-payment')
  @UseGuards(JwtAuthGuard)
  confirmFullPayment(
    @Param('id', ParseIntPipe) id: number,
    @Req() req,
  ) {
    return this.bookingService.confirmFullPayment(id, req.user.id);
  }
}