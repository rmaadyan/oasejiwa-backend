import { Body, Controller, Post, UseGuards, Get, Param, Patch, Delete, Req, ParseIntPipe, Query } from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadedFile, UseInterceptors } from '@nestjs/common';
import { multerConfig } from './config/upload.config';
import { BookingService } from '../booking/booking.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
export class AdminController {
    constructor(
        private adminService: AdminService,
        private bookingService: BookingService,
    ){}

    @Post('psychologist')
    @UseInterceptors(FileInterceptor('avatar', multerConfig))
    createPsychologist(
        @Body() dto: CreatePsychologistDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.adminService.createPsychologist(dto, file);
    }

    @Get('psychologists')
    getAllPsychologists() {
        return this.adminService.getAllPsychologists();
    }

    @Get('psychologists/:id')
    getPsychologistById(@Param('id') id: string) {
        return this.adminService.getPsychologistById(id);
    }

    @Patch('psychologists/:id')
    @UseInterceptors(FileInterceptor('avatar', multerConfig))
    updatePsychologist(
        @Param('id') id: string,
        @Body() dto: UpdatePsychologistDto,
        @UploadedFile() file?: Express.Multer.File,
    ) {
        return this.adminService.updatePsychologist(id, dto, file);
    }

    @Delete('psychologists/:id')
    deletePsychologist(@Param('id') id: string) {
        return this.adminService.deletePsychologist(id);
    }

    @Get('users')
    getAllUsers() {
        return this.adminService.getAllUsers();
    }

    @Get('users/:id')
    getUserById(@Param('id') id: string) {
        return this.adminService.getUserById(id);
    }

    @Delete('users/:id')
    deleteUser(@Param('id') id: string) {
        return this.adminService.deleteUser(id);
    }

    // ─── Booking Management ──────────────────────────────────

    @Get('bookings')
    getAllBookings() {
        return this.bookingService.getAllBookings();
    }

    @Get('bookings/:id')
    getBookingDetail(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.bookingService.getBookingById(id, req.user.id, req.user.role);
    }

    @Patch('bookings/:id/approve')
    approveBooking(@Param('id', ParseIntPipe) id: number, @Req() req) {
        return this.bookingService.approveBooking(id, req.user.id);
    }

    @Patch('bookings/:id/reject')
    rejectBooking(
        @Param('id', ParseIntPipe) id: number,
        @Req() req,
        @Body('reason') reason?: string,
    ) {
        return this.bookingService.rejectBooking(id, req.user.id, reason);
    }
}

