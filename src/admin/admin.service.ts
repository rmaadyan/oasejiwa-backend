import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePsychologistDto } from './dto/create-psychologist.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import { CloudinaryService } from './cloudinary.service';

@Injectable()
export class AdminService {
    constructor(
        private prisma: PrismaService,
        private cloudinaryService: CloudinaryService,
    ){}

    private formatDateString(dateVal?: string | Date): string {
        if (!dateVal) return '';
        if (typeof dateVal === 'string') {
            return dateVal.split('T')[0];
        }
        if (dateVal instanceof Date) {
            return dateVal.toISOString().split('T')[0];
        }
        return String(dateVal).split('T')[0];
    }

    async createPsychologist(dto: CreatePsychologistDto, file?: Express.Multer.File){
        const avatarUrl = file ? file.path : undefined;
        const existingUser = await this.prisma.user.findUnique({
            where: {email: dto.email},
        });

        if (existingUser){
            throw new ConflictException('Email sudah terdaftar');
        }

        const tempPassword = crypto.randomBytes(8).toString('hex');
        const passwordHash = await bcrypt.hash(tempPassword, 10);

        const user = await this.prisma.user.create({
            data:{
                email: dto.email,
                role: 'PSYCHOLOGIST',
                isEmailVerified: true,
                isProfileComplete: true,
                isFirstLogin: true,
                authProvider: {
                    create: {
                        provider: 'local',
                        passwordHash,
                    },
                },
                psychologistProfile: {
                    create: {
                        fullName: dto.fullName,
                        sipp: dto.sipp,
                        str: dto.str,
                        about: dto.about,
                        avatarUrl,
                        educations: {
                            create: dto.educations,
                        },
                        experiences: {
                            create: dto.experiences.map(name => ({name})),
                        },
                        specializations: {
                            create: dto.specializations.map(name => ({name})),
                        },
                        expertises: {
                            create: dto.expertises.map(name => ({name})),
                        },
                        schedules: dto.schedules ? {
                            create: dto.schedules.map(s => {
                                const dateStr = this.formatDateString(s.date);
                                return {
                                    date: new Date(dateStr + 'T17:00:00.000Z'),
                                    startTime: s.startTime,
                                    duration: s.duration,
                                    isAvailable: s.isAvailable ?? true,
                                };
                            }),
                        } : undefined,
                    },
                },
            },
        });

        return {
            message: 'Akun psikolog berhasil dibuat',
            user: {
                id: user.id,
                email: user.email,
                role: user.role,
                tempPassword,
            },
        };
    }

    async getAllPsychologists() {
        const psychologists = await this.prisma.psychologistProfile.findMany({
            select: {
                id: true,
                fullName: true,
                avatarUrl: true,
                sipp: true,
                specializations: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return {
            data: psychologists.map(p => ({
                id: p.id,
                name: p.fullName,
                avatarUrl: p.avatarUrl,
                sipp: p.sipp,
                specializations: p.specializations.map(s => s.name),
            })),
        };
    }

    async getPsychologistById(psychologistId: string) {
        const profile = await this.prisma.psychologistProfile.findUnique({
            where: { id: psychologistId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        role: true,
                        isEmailVerified: true,
                        isProfileComplete: true,
                        isFirstLogin: true,
                    },
                },
                educations: true,
                experiences: true,
                specializations: true,
                expertises: true,
                schedules: true,
            },
        });

        if (!profile) {
            throw new NotFoundException('Psikolog tidak ditemukan');
        }

        return { 
            data: {
                id: profile.id,
                name: profile.fullName,
                avatarUrl: profile.avatarUrl,
                about: profile.about,
                sipp: profile.sipp,
                str: profile.str,
                user: profile.user,
                educations: profile.educations,
                experiences: profile.experiences,
                specializations: profile.specializations,
                expertises: profile.expertises,
                schedules: profile.schedules,
            },
        };
    }

    async updatePsychologist(psychologistId: string, dto: UpdatePsychologistDto, file?: Express.Multer.File) {
        console.log('FILE:', file);
        const avatarUrl = file ? file.path : undefined;
        const profile = await this.prisma.psychologistProfile.findUnique({
            where: { id: psychologistId },
            include: {user:true},
        });

        if (!profile) {
            throw new NotFoundException('Psikolog tidak ditemukan');
        }

        if (file && profile.avatarUrl) {
            await this.cloudinaryService.deleteImage(profile.avatarUrl);
        }

        let tempPassword: string | undefined;

        await this.prisma.$transaction(async (prisma) => {
            // Jika email berubah, update di tabel user + reset password
            if (dto.email && dto.email !== profile.user.email) {
                const existingUser = await prisma.user.findUnique({
                    where: { email: dto.email },
                });
                if (existingUser) {
                    throw new ConflictException('Email sudah digunakan');
                }

                tempPassword = crypto.randomBytes(8).toString('hex');
                const passwordHash = await bcrypt.hash(tempPassword, 10);

                await prisma.user.update({
                    where: { id: profile.userId },
                    data: { email: dto.email },
                });

                await prisma.authProvider.update({
                    where: { userId: profile.userId },
                    data: {
                        passwordHash,
                    },
                });

                // Reset isFirstLogin agar psikolog wajib ganti password baru
                await prisma.user.update({
                    where: { id: profile.userId },
                    data: {
                        email: dto.email,
                        isFirstLogin: true,
                    },
                });
            }
            await prisma.psychologistProfile.update({
                where: { id: psychologistId },
                data: {
                    ...(dto.fullName && { fullName: dto.fullName }),
                    ...(dto.sipp && { sipp: dto.sipp }),
                    ...(dto.str && { str: dto.str }),
                    ...(dto.about && { about: dto.about }),
                    ...(avatarUrl !== undefined && { avatarUrl }),
                },
            });

            if (dto.educations) {
                await prisma.education.deleteMany({ where: { psychologistId } });
                    await prisma.education.createMany({
                    data: dto.educations.map(e => ({
                        psychologistId,
                        degree: e.degree ?? '',
                        institution: e.institution ?? '',
                        city: e.city ?? '',
                        startYear: e.startYear ?? new Date().getFullYear(),
                        endYear: e.endYear ?? new Date().getFullYear(),
                    })),
                });
            }

            if (dto.experiences) {
                await prisma.experience.deleteMany({ where: { psychologistId } });
                    await prisma.experience.createMany({
                    data: dto.experiences.map(name => ({ psychologistId, name })),
                });
            }

            if (dto.specializations) {
                await prisma.specialization.deleteMany({ where: { psychologistId } });
                    await prisma.specialization.createMany({
                    data: dto.specializations.map(name => ({ psychologistId, name })),
                });
            }

            if (dto.expertises) {
                await prisma.expertise.deleteMany({ where: { psychologistId } });
                    await prisma.expertise.createMany({
                    data: dto.expertises.map(name => ({ psychologistId, name })),
                });
            }

            if (dto.schedules) {
                // Ambil jadwal existing beserta booking aktifnya
                const existingSchedules = await prisma.schedule.findMany({
                    where: { psychologistId },
                    include: {
                        bookings: {
                            where: {
                                status: { in: ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'] },
                            },
                        },
                    },
                });

                // Buat map key: "date_startTime" jadwal existing
                const existingMap = new Map(
                    existingSchedules.map(s => [
                        `${this.formatDateString(s.date)}_${s.startTime}`,
                        s,
                    ])
                );

                // Key dari jadwal yang dikirim frontend
                const incomingKeys = new Set(
                    dto.schedules.map(s => `${this.formatDateString(s.date)}_${s.startTime}`)
                );

                // Hapus jadwal yang tidak ada di frontend, tapi cek dulu booking aktifnya
                for (const [key, existing] of existingMap) {
                    if (!incomingKeys.has(key)) {
                        if (existing.bookings.length > 0) {
                            throw new BadRequestException(
                                `Jadwal ${existing.startTime} pada ${this.formatDateString(existing.date)} tidak bisa dihapus karena masih ada booking aktif`
                            );
                        }
                        await prisma.schedule.delete({ where: { id: existing.id } });
                    }
                }

                // Update atau buat jadwal
                for (const s of dto.schedules) {
                    const dateStr = this.formatDateString(s.date);
                    if (!dateStr) continue;

                    const key = `${dateStr}_${s.startTime}`;
                    const existing = existingMap.get(key);

                    if (existing) {
                        // jika jadwal sudah ada maka pertahankan isAvailable jika sedang dibooking
                        const isBooked = existing.bookings.length > 0;
                        await prisma.schedule.update({
                            where: { id: existing.id },
                            data: {
                                duration: s.duration ?? existing.duration,
                                isAvailable: isBooked ? existing.isAvailable : true,
                            },
                        });
                    } else {
                        //Jadwal baru, buat dengan isAvailable true
                        await prisma.schedule.create({
                            data: {
                                psychologistId,
                                date: new Date(dateStr + 'T17:00:00.000Z'),
                                startTime: s.startTime ?? '',
                                duration: s.duration ?? 60,
                                isAvailable: true,
                            },
                        });
                    }
                }
            }
        });

        return { message: 'Data psikolog berhasil diupdate',
            ...(tempPassword && {
                emailChanged: true,
                tempPassword,
            }),
        };
    }

    async deletePsychologist(psychologistId: string) {
        const profile = await this.prisma.psychologistProfile.findUnique({
            where: { id: psychologistId },
        });

        if (!profile) {
            throw new NotFoundException('Psikolog tidak ditemukan');
        }

        if (profile.avatarUrl) {
            await this.cloudinaryService.deleteImage(profile.avatarUrl);
        }

        await this.prisma.user.delete({
            where: { id: profile.userId },
        });

        return { message: 'Data psikolog berhasil dihapus' };
    }

    async getAllUsers() {
        const users = await this.prisma.user.findMany({
            where: { role: 'USER' },
            select: {
                id: true,
                email: true,
                role: true,
                isEmailVerified: true,
                isProfileComplete: true,
                createdAt: true,
                userProfile: {
                    select: {
                        fullName: true,
                        phone: true,
                        city: true,
                        country: true,
                    },
                },
            },
        });

        return { data: users };
    }

    async getUserById(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId, role: 'USER' },
            select: {
                id: true,
                email: true,
                role: true,
                isEmailVerified: true,
                isProfileComplete: true,
                createdAt: true,
                userProfile: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }

        return { data: user };
    }

    async deleteUser(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId, role: 'USER' },
        });

        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }

        await this.prisma.user.delete({
            where: { id: userId },
        });

        return { message: 'User berhasil dihapus' };
    }
}
