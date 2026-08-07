import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException, // 🟢 1. Ditambahkan ke sini
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ChangePasswordDto } from './dto/change-password.dto'; // 🟢 2. Pastikan DTO di-import

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getMe(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { userProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    // 1. Jika role PSYCHOLOGIST
    if (user.role === 'PSYCHOLOGIST') {
      const profile = await this.prisma.psychologistProfile.findFirst({
        where: { userId: user.id },
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
        fullName: profile?.fullName || '',
        profile: profile
          ? {
              name: profile.fullName,
              fullName: profile.fullName,
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

    // 2. Jika role USER (User Biasa)
    if (user.role === 'USER') {
      const profile = user.userProfile;
      const fullName = profile?.fullName || '';

      return {
        ...user,
        fullName: fullName,
        profile: profile
          ? {
              name: fullName,
              fullName: fullName,
              birthday: profile.birthday,
              gender: profile.gender,
              country: profile.country,
              city: profile.city,
              fullAddress: profile.fullAddress,
              phone: profile.phone,
              avatarUrl: profile.avatarUrl,
            }
          : null,
      };
    }

    // 3. Fallback untuk Role Lain (ADMIN, dsb)
    return {
      ...user,
      fullName: user.userProfile?.fullName || '',
      profile: null,
    };
  }

  async updateProfile(userId: string, dto: UpdateProfileDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    if (user.role !== 'USER') {
      throw new ForbiddenException('Hanya user biasa yang bisa update profile');
    }

    const result = await this.prisma.$transaction(async (prisma) => {
      if (dto.email) {
        await prisma.user.update({
          where: { id: userId },
          data: { email: dto.email },
        });
      }

      const profile = await prisma.userProfile.upsert({
        where: { userId },
        update: {
          ...(dto.fullName && { fullName: dto.fullName }),
          ...(dto.birthday && { birthday: new Date(dto.birthday) }),
          ...(dto.gender && { gender: dto.gender as any }),
          ...(dto.country && { country: dto.country }),
          ...(dto.city && { city: dto.city }),
          ...(dto.fullAddress && { fullAddress: dto.fullAddress }),
          ...(dto.phone && { phone: dto.phone }),
          ...(dto.avatarUrl && { avatarUrl: dto.avatarUrl }),
        },
        create: {
          userId,
          fullName: dto.fullName ?? null,
          birthday: dto.birthday ? new Date(dto.birthday) : null,
          gender: (dto.gender as any) ?? null,
          country: dto.country ?? null,
          city: dto.city ?? null,
          fullAddress: dto.fullAddress ?? null,
          phone: dto.phone ?? null,
          avatarUrl: dto.avatarUrl ?? null,
        },
      });

      const isComplete = [
        profile.fullName,
        profile.birthday,
        profile.gender,
        profile.country,
        profile.city,
        profile.fullAddress,
        profile.phone,
      ].every(Boolean);

      await prisma.user.update({
        where: { id: userId },
        data: { isProfileComplete: !!isComplete },
      });

      return {
        profile,
        isProfileComplete: !!isComplete,
      };
    });

    return {
      message: 'Profile berhasil diupdate',
      ...result,
    };
  }

  // 🟢 3. Ubah userId menjadi 'string' agar sesuai dengan ID Prisma kamu
 async changePassword(userId: string, dto: ChangePasswordDto) {
    // 1. Cari user beserta relasi authProvider
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { authProvider: true },
    });

    if (!user) {
      throw new NotFoundException('Pengguna tidak ditemukan');
    }

    // 2. Cek apakah user memiliki AuthProvider dan passwordHash (bukan pendaftaran via Google/OAuth)
    if (!user.authProvider || !user.authProvider.passwordHash) {
      throw new BadRequestException(
        'Akun ini terdaftar tanpa kata sandi (menggunakan akun Google/OAuth).',
      );
    }

    // 3. Verifikasi kata sandi saat ini dengan passwordHash di AuthProvider
    const isPasswordValid = await bcrypt.compare(
      dto.currentPassword,
      user.authProvider.passwordHash,
    );

    if (!isPasswordValid) {
      throw new BadRequestException('Kata sandi saat ini salah');
    }

    // 4. Hash kata sandi baru
    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

    // 5. Update passwordHash pada tabel AuthProvider
    await this.prisma.authProvider.update({
      where: { userId },
      data: { passwordHash: hashedPassword },
    });

    return { message: 'Kata sandi berhasil diubah' };
  }
}