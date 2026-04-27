import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async getMe(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                role: true,
                isEmailVerified: true,
                isProfileComplete: true,
            },
        });

        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }

        if (user.role === 'PSYCHOLOGIST') {
            const profile = await this.prisma.psychologistProfile.findUnique({
                where: { userId },
                include: {
                    educations: true,
                    experiences: true,
                    specializations: true,
                    expertises: true,
                    schedules: true,
                },
            });

            return {
                ...user,
                profile: profile
                    ? {
                        name: profile.fullName,
                        avatarUrl: profile.avatarUrl,
                        about: profile.about,
                        sipp: profile.sipp,
                        str: profile.str,
                        educations: profile.educations ?? [],
                        experiences: profile.experiences ?? [],
                        specializations: profile.specializations ?? [],
                        expertises: profile.expertises ?? [],
                        schedules: profile.schedules ?? [],
                    }
                    : null,
            };
        }

        if(user.role === 'USER'){
            const profile = await this.prisma.userProfile.findUnique({
                where: { userId },
            });

            return {
                ...user,
                profile: profile
                    ? {
                        name: profile.fullName,
                        birthday: profile.birthday,
                        gender: profile.gender,
                        country: profile.country,
                        city: profile.city,
                        fullAddress: profile.fullAddress,
                        phone: profile.phone,
                    }
                    : null,
            };
        }

        return {
            ...user,
            profile: null,
        }
    }

    async updateProfile(userId: string, dto: UpdateProfileDto){
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });

        if (!user) {
            throw new NotFoundException('User tidak ditemukan');
        }

        if (user.role !== 'USER') {
            throw new ForbiddenException('Hanya user biasa yang bisa update profile');
        }

        const result = await this.prisma.$transaction(async (prisma)=> {
            if (dto.email) {
                await prisma.user.update({
                    where: { id: userId },
                    data: { email: dto.email },
                });
            }
            const profile = await prisma.userProfile.upsert({
                where: {userId},
                update: {
                    ...(dto.fullName && { fullName: dto.fullName }),
                    ...(dto.birthday && { birthday: new Date(dto.birthday) }),
                    ...(dto.gender && { gender: dto.gender }),
                    ...(dto.country && { country: dto.country }),
                    ...(dto.city && { city: dto.city }),
                    ...(dto.fullAddress && { fullAddress: dto.fullAddress }),
                    ...(dto.phone && { phone: dto.phone }),
                },
                create: {
                    userId,
                    fullName: dto.fullName ?? null,
                    birthday: dto.birthday ? new Date(dto.birthday) : null,
                    gender: dto.gender ?? null,
                    country: dto.country ?? null,
                    city: dto.city ?? null,
                    fullAddress: dto.fullAddress ?? null,
                    phone: dto.phone ?? null,
                },
            });

            const isComplete = [
                profile.fullName &&
                profile.birthday &&
                profile.gender &&
                profile.country &&
                profile.city &&
                profile.fullAddress &&
                profile.phone,
            ].every(Boolean);

            await prisma.user.update({
                where: { id: userId },
                data: { isProfileComplete: !!isComplete },
            });

            return{
                profile,
                isProfileComplete: !!isComplete,
            };
        });

        return{
            message: 'Profile berhasil diupdate',
            ...result,
        };
    }
}
