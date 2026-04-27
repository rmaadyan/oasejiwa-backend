import {
    Controller,
    Post,
    Get,
    Param,
    Body,
    Req,
    UseGuards,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { PaymentService } from './payment.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { multerConfig } from '../admin/config/upload.config';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('payments')
@UseGuards(JwtAuthGuard)
export class PaymentController {
    constructor(private paymentService: PaymentService) {}

    /**
     * USER: Bayar DP
     * POST /payments/dp
     */
    @Post('dp')
    @UseGuards(RolesGuard)
    @Roles('USER')
    @UseInterceptors(FileInterceptor('file', multerConfig)) 
    payDP(
        @Req() req, 
        @Body() dto: ProcessPaymentDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.paymentService.payDP(req.user.id, dto, file);
    }

    /**
     * USER: Bayar pelunasan
     * POST /payments/full
     */
    @Post('full')
    @UseGuards(RolesGuard)
    @Roles('USER')
    @UseInterceptors(FileInterceptor('file', multerConfig))
    payFull(
        @Req() req, 
        @Body() dto: ProcessPaymentDto,
        @UploadedFile() file: Express.Multer.File
    ) {
        return this.paymentService.payFull(req.user.id, dto, file);
    }

    /**
     * USER/ADMIN: Lihat payment berdasarkan booking
     * GET /payments/booking/:bookingId
     */
    @Get('booking/:bookingId')
    getPaymentsByBooking(
        @Param('bookingId', ParseIntPipe) bookingId: number,
        @Req() req,
    ) {
        return this.paymentService.getPaymentsByBooking(
            bookingId,
            req.user.id,
            req.user.role,
        );
    }
}
