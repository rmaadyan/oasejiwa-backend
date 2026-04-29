import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookingScheduler {
    constructor(private prisma: PrismaService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async cancelExpiredBookings() {
        try {
        const expiredPayments = await this.prisma.payment.findMany({
            where: {
            type: 'DOWN_PAYMENT',
            status: 'PENDING',
            expiredAt: { lte: new Date() },
            },
            include: { booking: true },
        });

        for (const payment of expiredPayments) {
            if (!payment.booking || payment.booking.status !== 'PENDING_DP') continue;

            const { booking } = payment;

            try {
            await this.prisma.$transaction(async (prisma) => {
                // 1. Hapus consultation & consent form (child records)
                await prisma.consultationForm.deleteMany({
                where: { bookingId: booking.id },
                });
                await prisma.consentForm.deleteMany({
                where: { bookingId: booking.id },
                });

                // 2. Hapus semua payment terkait booking
                await prisma.payment.deleteMany({
                where: { bookingId: booking.id },
                });

                // 3. Hapus booking
                await prisma.booking.delete({
                where: { id: booking.id },
                });

                // 4. Kembalikan jadwal jadi available
                await prisma.schedule.updateMany({
                where: {
                    psychologistId: booking.psychologistId,
                    date: booking.scheduledDate,
                    startTime: booking.scheduledTime,
                },
                data: { isAvailable: true },
                });
            });
            } catch (err) {
            console.error(`Gagal cancel bookingId ${booking.id}:`, err);
            }
        }
        } catch (err) {
        console.error('cancelExpiredBookings error:', err);
        }
    }
}