import {
    Injectable,
    NotFoundException,
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { RescheduleBookingDto } from './dto/reschedule-booking.dto';
import * as crypto from 'crypto';

@Injectable()
export class BookingService {
    constructor(private prisma: PrismaService) {}

    /**
     * Generate kode booking unik: OJ-YYYYMMDD-XXXX
     */
    private generateBookingCode(): string {
        const date = new Date();
        const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
        const random = crypto.randomBytes(2).toString('hex').toUpperCase();
        return `OJ-${dateStr}-${random}`;
    }

    /**
     * USER: Buat booking baru
     * - Validasi layanan, psikolog, jadwal tersedia
     * - Lock jadwal (isAvailable = false)
     * - Hitung harga (DP = 50%)
     * - Buat record Booking + Payment(DOWN_PAYMENT)
     */
    async createBooking(userId: string, dto: CreateBookingDto) {
        // 1. Validasi layanan
        const layanan = await this.prisma.layanan.findUnique({
            where: { id: dto.serviceId },
        });
        if (!layanan) {
            throw new NotFoundException('Layanan tidak ditemukan');
        }

        // 2. Validasi psikolog
        const psychologist = await this.prisma.psychologistProfile.findUnique({
            where: { id: dto.psychologistId },
        });
        if (!psychologist) {
            throw new NotFoundException('Psikolog tidak ditemukan');
        }

        // 3. Validasi jadwal tersedia
        const scheduledDate = new Date(dto.scheduledDate);
        const schedule = await this.prisma.schedule.findFirst({
            where: {
                psychologistId: dto.psychologistId,
                date: scheduledDate,
                startTime: dto.scheduledTime,
                isAvailable: true,
            },
        });
        if (!schedule) {
            throw new BadRequestException('Jadwal yang dipilih tidak tersedia');
        }

        // 4. Hitung harga
        const totalPrice = layanan.harga;
        const dpAmount = Math.ceil(totalPrice * 0.5); // DP 50%
        const remainingAmount = totalPrice - dpAmount;

        // 5. Generate booking code
        const bookingCode = this.generateBookingCode();

        // 6. Atomic transaction: buat booking + lock jadwal + buat payment
        const booking = await this.prisma.$transaction(async (prisma) => {
            // Lock jadwal
            await prisma.schedule.update({
                where: { id: schedule.id },
                data: { isAvailable: false },
            });

            // Buat booking
            const newBooking = await prisma.booking.create({
                data: {
                    bookingCode,
                    userId,
                    psychologistId: dto.psychologistId,
                    serviceId: dto.serviceId,
                    scheduledDate,
                    scheduledTime: dto.scheduledTime,
                    totalPrice,
                    dpAmount,
                    remainingAmount,
                    status: 'PENDING_DP',
                    notes: dto.notes,
                },
            });

            // Buat payment record untuk DP
            const dpExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 jam
            await prisma.payment.create({
                data: {
                    bookingId: newBooking.id,
                    type: 'DOWN_PAYMENT',
                    amount: dpAmount,
                    method: 'PENDING',
                    orderId: `DP-${bookingCode}`,
                    status: 'PENDING',
                    expiredAt: dpExpiry,
                },
            });

            return newBooking;
        });

        return {
            message: 'Booking berhasil dibuat. Silakan lakukan pembayaran DP.',
            data: {
                id: booking.id,
                bookingCode: booking.bookingCode,
                status: booking.status,
                totalPrice,
                dpAmount,
                remainingAmount,
                scheduledDate: dto.scheduledDate,
                scheduledTime: dto.scheduledTime,
            },
        };
    }

    /**
     * USER: Lihat semua booking miliknya
     */
    async getMyBookings(userId: string) {
        const bookings = await this.prisma.booking.findMany({
            where: { userId },
            include: {
                service: {
                    select: { nama: true, jenis: true, kategori: true },
                },
                psychologist: {
                    select: { fullName: true, avatarUrl: true },
                },
                payments: {
                    select: { type: true, amount: true, status: true, method: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return { data: bookings };
    }

    /**
     * USER/ADMIN: Lihat detail booking by ID
     */
    async getBookingById(bookingId: number, userId?: string, role?: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
            include: {
                service: true,
                psychologist: {
                    select: {
                        id: true,
                        fullName: true,
                        avatarUrl: true,
                        sipp: true,
                    },
                },
                payments: true,
                consultationForm: true,
                consentForm: true,
                review: true,
            },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        // User hanya bisa lihat booking miliknya
        if (role === 'USER' && booking.userId !== userId) {
            throw new ForbiddenException('Anda tidak memiliki akses ke booking ini');
        }

        return { data: booking };
    }

    /**
     * ADMIN: Lihat semua booking
     */
    async getAllBookings() {
        const bookings = await this.prisma.booking.findMany({
            include: {
                user: {
                    select: { id: true, email: true },
                },
                service: {
                    select: { nama: true, jenis: true },
                },
                psychologist: {
                    select: { fullName: true },
                },
                payments: {
                    select: { type: true, amount: true, status: true },
                },
            },
            orderBy: { createdAt: 'desc' },
        });

        return { data: bookings };
    }

    /**
     * ADMIN: Approve booking
     * - Update status → APPROVED
     * - Buat Payment record baru untuk pelunasan (FULL_PAYMENT)
     */
    async approveBooking(bookingId: number, adminId: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        if (booking.status !== 'WAITING_APPROVAL') {
            throw new BadRequestException(
                `Booking tidak bisa di-approve. Status saat ini: ${booking.status}`,
            );
        }

        await this.prisma.$transaction(async (prisma) => {
            // Update booking status
            await prisma.booking.update({
                where: { id: bookingId },
                data: {
                    status: 'APPROVED',
                    adminApprovedBy: adminId,
                    approvedAt: new Date(),
                },
            });

            // Buat payment record untuk pelunasan
            const fullPaymentExpiry = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 hari
            await prisma.payment.create({
                data: {
                    bookingId,
                    type: 'FULL_PAYMENT',
                    amount: booking.remainingAmount,
                    method: 'PENDING',
                    orderId: `FP-${booking.bookingCode}`,
                    status: 'PENDING',
                    expiredAt: fullPaymentExpiry,
                },
            });
        });

        return {
            message: 'Booking berhasil di-approve. Menunggu pembayaran pelunasan dari user.',
        };
    }

    /**
     * ADMIN: Reject booking
     * - Update status → REJECTED
     * - Kembalikan jadwal (isAvailable = true)
     */
    async rejectBooking(bookingId: number, adminId: string, reason?: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        if (booking.status !== 'WAITING_APPROVAL') {
            throw new BadRequestException(
                `Booking tidak bisa di-reject. Status saat ini: ${booking.status}`,
            );
        }

        await this.prisma.$transaction(async (prisma) => {
            // Update booking status
            await prisma.booking.update({
                where: { id: bookingId },
                data: {
                    status: 'REJECTED',
                    adminApprovedBy: adminId,
                    rejectionReason: reason,
                },
            });

            // Kembalikan jadwal
            await prisma.schedule.updateMany({
                where: {
                    psychologistId: booking.psychologistId,
                    date: booking.scheduledDate,
                    startTime: booking.scheduledTime,
                },
                data: { isAvailable: true },
            });
        });

        return {
            message: 'Booking berhasil di-reject. Jadwal psikolog dibuka kembali.',
        };
    }

    /**
     * USER: Reschedule booking
     * - Kembalikan jadwal lama
     * - Lock jadwal baru
     * - Update tanggal booking
     */
    async rescheduleBooking(
        bookingId: number,
        userId: string,
        dto: RescheduleBookingDto,
    ) {
        const booking = await this.prisma.booking.findUnique({
            where: { id: bookingId },
        });

        if (!booking) {
            throw new NotFoundException('Booking tidak ditemukan');
        }

        if (booking.userId !== userId) {
            throw new ForbiddenException('Anda tidak memiliki akses ke booking ini');
        }

        // Hanya bisa reschedule jika statusnya APPROVED atau FULLY_PAID
        if (!['APPROVED', 'FULLY_PAID'].includes(booking.status)) {
            throw new BadRequestException(
                `Booking tidak bisa di-reschedule. Status saat ini: ${booking.status}`,
            );
        }

        // Validasi jadwal baru tersedia
        const newDate = new Date(dto.newScheduledDate);
        const newSchedule = await this.prisma.schedule.findFirst({
            where: {
                psychologistId: booking.psychologistId,
                date: newDate,
                startTime: dto.newScheduledTime,
                isAvailable: true,
            },
        });

        if (!newSchedule) {
            throw new BadRequestException('Jadwal baru yang dipilih tidak tersedia');
        }

        await this.prisma.$transaction(async (prisma) => {
            // Kembalikan jadwal lama
            await prisma.schedule.updateMany({
                where: {
                    psychologistId: booking.psychologistId,
                    date: booking.scheduledDate,
                    startTime: booking.scheduledTime,
                },
                data: { isAvailable: true },
            });

            // Lock jadwal baru
            await prisma.schedule.update({
                where: { id: newSchedule.id },
                data: { isAvailable: false },
            });

            // Update booking
            await prisma.booking.update({
                where: { id: bookingId },
                data: {
                    scheduledDate: newDate,
                    scheduledTime: dto.newScheduledTime,
                },
            });
        });

        return {
            message: 'Booking berhasil di-reschedule.',
            data: {
                bookingId,
                oldDate: booking.scheduledDate,
                oldTime: booking.scheduledTime,
                newDate: dto.newScheduledDate,
                newTime: dto.newScheduledTime,
            },
        };
    }
}
