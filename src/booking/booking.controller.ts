import {
    Controller,
    Post,
    Get,
    Patch,
    Param,
    Body,
    Req,
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
@UseGuards(JwtAuthGuard)
export class BookingController {
    constructor(private bookingService: BookingService) {}

    /**
     * USER: Buat booking baru
     * POST /bookings
     */
    @Post()
    @UseGuards(RolesGuard)
    @Roles('USER')
    createBooking(@Req() req, @Body() dto: CreateBookingDto) {
        return this.bookingService.createBooking(req.user.id, dto);
    }

    /**
     * USER: Lihat semua booking miliknya
     * GET /bookings
     */
    @Get()
    @UseGuards(RolesGuard)
    @Roles('USER')
    getMyBookings(@Req() req) {
        return this.bookingService.getMyBookings(req.user.id);
    }

    /**
     * USER/ADMIN: Lihat detail booking by ID
     * GET /bookings/:id
     */
    @Get(':id')
    getBookingById(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.bookingService.getBookingById(id, req.user.id, req.user.role);
    }

    /**
     * USER: Reschedule booking
     * PATCH /bookings/:id/reschedule
     */
    @Patch(':id/reschedule')
    @UseGuards(RolesGuard)
    @Roles('USER')
    rescheduleBooking(
        @Param('id', ParseIntPipe) id: number,
        @Req() req,
        @Body() dto: RescheduleBookingDto,
    ) {
        return this.bookingService.rescheduleBooking(id, req.user.id, dto);
    }
}
