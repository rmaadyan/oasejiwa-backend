import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ChangePasswordPsychologistDto } from './dto/change-password-psychologist.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const passwordHash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        isProfileComplete: true,
        authProvider: {
          create: {
            provider: 'local',
            passwordHash,
          },
        },
        userProfile: {
          create: {
            fullName: dto.fullName,
            birthday: new Date(dto.birthday),
            gender: dto.gender,
            country: dto.country,
            city: dto.city,
            fullAddress: dto.fullAddress,
            phone: dto.phone,
          },
        },
      },
    });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.emailVerification.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    await this.emailService.sendVerificationEmail(dto.email, token);

    return {
      message: 'Sign up Success',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }

  async verifyEmail(token: string) {
    const verification = await this.prisma.emailVerification.findUnique({
      where: { token },
    });

    if (!verification) {
      throw new BadRequestException('Token tidak valid');
    }

    if (verification.expiresAt < new Date()) {
      throw new BadRequestException('Token sudah expired');
    }

    if (verification.usedAt) {
      throw new BadRequestException('Token sudah digunakan');
    }

    await this.prisma.$transaction([
      this.prisma.user.update({
        where: { id: verification.userId },
        data: { isEmailVerified: true },
      }),
      this.prisma.emailVerification.update({
        where: { token },
        data: { usedAt: new Date() },
      }),
    ]);

    return { message: 'Email berhasil diverifikasi' };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: { authProvider: true },
    });

    if (!user) {
      throw new UnauthorizedException('Email atau password salah');
    }

    if (user.authProvider?.provider === 'google') {
      throw new UnauthorizedException('Gunakan login Google');
    }

    const isPasswordValid = await bcrypt.compare(
      dto.password,
      user.authProvider?.passwordHash ?? '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Email atau password salah');
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login berhasil',
      accessToken,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }

  async forgotPassword(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { authProvider: true },
    });

    if (!user) {
      return { message: 'Jika email terdaftar, kami akan mengirimkan link reset password' };
    }

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await this.prisma.passwordReset.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    await this.emailService.sendPasswordResetEmail(email, token);

    return { message: 'Jika email terdaftar, kami akan mengirimkan link reset password' };
  }

  async resetPassword(token: string, newPassword: string) {
    const data = await this.prisma.passwordReset.findUnique({
      where: { token },
    });

    if (!data) throw new BadRequestException('Token tidak valid');

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await this.prisma.authProvider.update({
      where: { userId: data.userId },
      data: { passwordHash },
    });

    return { message: 'Password berhasil diubah' };
  }

  async changePasswordPsychologist(userId: string, dto: ChangePasswordPsychologistDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { authProvider: true },
    });

    const isPasswordValid = await bcrypt.compare(
      dto.oldPassword,
      user?.authProvider?.passwordHash ?? '',
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Password lama salah');
    }

    const passwordHash = await bcrypt.hash(dto.newPassword, 10);

    await this.prisma.authProvider.update({
      where: { userId },
      data: { passwordHash },
    });

    return { message: 'Password berhasil diubah' };
  }
    async resendVerificationEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message: 'Jika email terdaftar, kami akan mengirimkan email verifikasi',
      };
    }

    if (user.isEmailVerified) {
      return { message: 'Email kamu sudah terverifikasi' };
    }

    await this.prisma.emailVerification.updateMany({
      where: {
        userId: user.id,
        usedAt: null,
      },
      data: {
        usedAt: new Date(),
      },
    });

    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await this.prisma.emailVerification.create({
      data: {
        userId: user.id,
        token,
        expiresAt,
      },
    });

    await this.emailService.sendVerificationEmail(email, token);

    return {
      message: 'Jika email terdaftar, kami akan mengirimkan email verifikasi',
    };
  }
    async handleGoogleLogin(data: { email: string; fullName: string }) {
    let user = await this.prisma.user.findUnique({
      where: { email: data.email },
      include: { authProvider: true },
    });

    if (user && user.authProvider?.provider === 'local') {
      throw new UnauthorizedException(
        'Akun ini sudah terdaftar dengan email & password, silakan login dengan email',
      );
    }

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: data.email,
          isEmailVerified: true,
          authProvider: {
            create: {
              provider: 'google',
              providerId: data.email,
            },
          },
          userProfile: {
            create: {
              fullName: data.fullName,
            },
          },
        },
        include: { authProvider: true },
      });
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login dengan Google berhasil',
      accessToken,
      user: {
        id: user.id,
        sub: user.id,
        email: user.email,
        role: user.role,
        isProfileComplete: user.isProfileComplete,
        isEmailVerified: user.isEmailVerified,
      },
    };
  }
}