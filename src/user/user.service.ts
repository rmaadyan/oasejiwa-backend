import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService){}

    async getProfile(userId: string) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                userProfile: true,
            },
        });

        if (!user || !user.userProfile) {
            throw new NotFoundException('Profile tidak ditemukan');
        }

        return {
            email: user.email,
            role: user.role,
            isProfileComplete: user.isProfileComplete,
            isEmailVerified: user.isEmailVerified,
            profile: user.userProfile,
        };
    }

    async updateProfile(userId: string, dto: UpdateProfileDto){
        const result = await this.prisma.$transaction(async (prisma)=> {
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

            const isComplete = 
            profile.fullName &&
            profile.birthday &&
            profile.gender &&
            profile.country &&
            profile.city &&
            profile.fullAddress &&
            profile.phone;

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
