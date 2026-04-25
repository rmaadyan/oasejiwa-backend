import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProcessPaymentDto } from './dto/process-payment.dto';

@Injectable()
export class PaymentService {
    constructor(private prisma: PrismaService) {}

    /**
     * USER: Bayar DP
     * - Validasi booking status = PENDING_DP
     * - Update Payment(DOWN_PAYMENT) → PAID
     * - Update Booking status → WAITING_APPROVAL
     */
    async payDP(userId: string, dto: ProcessPaymentDto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: dto.bookingId },
            include: {
                payments: {
                    where: { type: 'DOWN_PAYMENT' },
                },
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        if (booking.userId !== userId) {
            throw new ForbiddenException('Anda tidak memiliki akses ke booking ini');
        }

        if (booking.status !== 'PENDING_DP') {
            throw new BadRequestException(
                `Pembayaran DP tidak bisa dilakukan. Status booking: ${booking.status}`,
            );
        }

        const dpPayment = booking.payments[0];
        if (!dpPayment) {
            throw new BadRequestException('Data pembayaran DP tidak ditemukan');
        }

        // Cek apakah payment sudah expired
        if (dpPayment.expiredAt < new Date()) {
            throw new BadRequestException(
                'Waktu pembayaran DP sudah expired. Silakan buat booking baru.',
            );
        }

        await this.prisma.$transaction(async (prisma) => {
            // Update payment DP → PAID
            await prisma.payment.update({
                where: { id: dpPayment.id },
                data: {
                    status: 'PAID',
                    method: dto.method,
                    paymentProofUrl: dto.paymentProofUrl,
                    paidAt: new Date(),
                },
            });

            // Update booking status → WAITING_APPROVAL
            await prisma.booking.update({
                where: { id: dto.bookingId },
                data: { status: 'WAITING_APPROVAL' },
            });
        });

        return {
            message: 'Pembayaran DP berhasil. Menunggu approval dari admin.',
            data: {
                bookingId: dto.bookingId,
                bookingCode: booking.bookingCode,
                dpAmount: dpPayment.amount,
                status: 'WAITING_APPROVAL',
            },
        };
    }

    /**
     * USER: Bayar pelunasan
     * - Validasi booking status = APPROVED
     * - Update Payment(FULL_PAYMENT) → PAID
     * - Update Booking status → FULLY_PAID
     */
    async payFull(userId: string, dto: ProcessPaymentDto) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: dto.bookingId },
            include: {
                payments: {
                    where: { type: 'FULL_PAYMENT' },
                },
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        if (booking.userId !== userId) {
            throw new ForbiddenException('Anda tidak memiliki akses ke booking ini');
        }

        if (booking.status !== 'APPROVED') {
            throw new BadRequestException(
                `Pembayaran pelunasan tidak bisa dilakukan. Status booking: ${booking.status}`,
            );
        }

        const fullPayment = booking.payments[0];
        if (!fullPayment) {
            throw new BadRequestException('Data pembayaran pelunasan tidak ditemukan');
        }

        if (fullPayment.expiredAt < new Date()) {
            throw new BadRequestException('Waktu pembayaran pelunasan sudah expired.');
        }

        await this.prisma.$transaction(async (prisma) => {
            // Update payment pelunasan → PAID
            await prisma.payment.update({
                where: { id: fullPayment.id },
                data: {
                    status: 'PAID',
                    method: dto.method,
                    paymentProofUrl: dto.paymentProofUrl,
                    paidAt: new Date(),
                },
            });

            // Update booking status → FULLY_PAID
            await prisma.booking.update({
                where: { id: dto.bookingId },
                data: { status: 'FULLY_PAID' },
            });
        });

        return {
            message: 'Pembayaran pelunasan berhasil. Booking telah dikonfirmasi.',
            data: {
                bookingId: dto.bookingId,
                bookingCode: booking.bookingCode,
                amountPaid: fullPayment.amount,
                status: 'FULLY_PAID',
            },
        };
    }

    /**
     * Lihat semua payment untuk suatu booking
     */
    async getPaymentsByBooking(bookingId: number, userId: string, role: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        // User hanya bisa lihat payment booking miliknya
        if (role === 'USER' && booking.userId !== userId) {
            throw new ForbiddenException('Anda tidak memiliki akses ke data ini');
        }

        const payments = await this.prisma.payment.findMany({
            where: { bookingId },
            orderBy: { createdAt: 'asc' },
        });

        return {
            data: {
                bookingCode: booking.bookingCode,
                bookingStatus: booking.status,
                totalPrice: booking.totalPrice,
                dpAmount: booking.dpAmount,
                remainingAmount: booking.remainingAmount,
                payments,
            },
        };
    }
}
