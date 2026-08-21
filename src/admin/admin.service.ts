import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CreatePsychologistByAdminDto } from './dto/create-psychologist.dto';
import { UpdatePsychologistDto } from './dto/update-psychologist.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  // ==========================================
  // 1. STATISTIK DASHBOARD ADMIN
  // ==========================================
  async getDashboardStats() {
    const allUsers = await this.prisma.user.findMany({
      select: { role: true },
    });

    const totalUsers = allUsers.length;

    const totalPatients = allUsers.filter((u) => {
      const r = String(u.role).toUpperCase();
      return r === 'PATIENT' || r === 'PASIEN' || r === 'USER';
    }).length;

    const totalPsychologists = allUsers.filter((u) => {
      const r = String(u.role).toUpperCase();
      return r === 'PSYCHOLOGIST' || r === 'PSIKOLOG';
    }).length;

    return {
      totalUsers,
      totalPatients,
      totalPsychologists,
    };
  }

  // ==========================================
  // 2. MANAJEMEN SEMUA USER (PAGINATION & EXPORT SEMUA)
  // ==========================================
  async getAllUsers(query?: { page?: number; perPage?: number; search?: string; sort?: string; all?: boolean }) {
    const page = Number(query?.page) || 1;
    const perPage = Number(query?.perPage) || 10;
    const search = query?.search ? String(query.search).trim() : '';
    const isExportAll = query?.all === true || perPage >= 1000;

    const whereCondition: any = {};
    if (search) {
      whereCondition.OR = [
        { email: { contains: search, mode: 'insensitive' } },
        { userProfile: { fullName: { contains: search, mode: 'insensitive' } } },
        { psychologistProfile: { fullName: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const totalUsersCount = await this.prisma.user.count({ where: whereCondition });

    const allUsersRole = await this.prisma.user.findMany({ select: { role: true } });
    const totalPatients = allUsersRole.filter((u: any) => {
      const r = String(u.role).toUpperCase();
      return r === 'PATIENT' || r === 'PASIEN' || r === 'USER';
    }).length;
    const totalPsychologists = allUsersRole.filter((u: any) => {
      const r = String(u.role).toUpperCase();
      return r === 'PSYCHOLOGIST' || r === 'PSIKOLOG';
    }).length;
    const totalAdmins = allUsersRole.filter((u: any) => String(u.role).toUpperCase() === 'ADMIN').length;

    const findOptions: any = {
      where: whereCondition,
      include: {
        userProfile: true,
        psychologistProfile: {
          include: {
            specializations: true,
          },
        },
      },
      orderBy: { createdAt: query?.sort === 'oldest' ? 'asc' : 'desc' },
    };

    if (!isExportAll) {
      findOptions.skip = (page - 1) * perPage;
      findOptions.take = perPage;
    }

    const users = await this.prisma.user.findMany(findOptions);

    const formattedUsers = users.map((u: any) => {
      const roleUpper = String(u.role || '').toUpperCase();
      const isPsychologist = roleUpper === 'PSYCHOLOGIST' || roleUpper === 'PSIKOLOG';

      return {
        id: u.id,
        email: u.email || '-',
        role: isPsychologist ? 'psychologist' : 'patient',
        name: isPsychologist
          ? u.psychologistProfile?.fullName || u.userProfile?.fullName || 'Psikolog'
          : u.userProfile?.fullName || 'Pasien',
        phone: u.userProfile?.phone || '-',
        status: u.isProfileComplete ? 'active' : 'inactive',
        registeredAt: u.createdAt,
        bookingCount: 0,
        sipp: u.psychologistProfile?.sipp || '-',
        str: u.psychologistProfile?.str || '-',
        about: u.psychologistProfile?.about || 'Belum ada deskripsi bio.',
        specializations: Array.isArray(u.psychologistProfile?.specializations)
          ? u.psychologistProfile.specializations.map((s: any) => s.name || s)
          : [],
      };
    });

    return {
      users: formattedUsers,
      total: totalUsersCount,
      totalPages: isExportAll ? 1 : Math.ceil(totalUsersCount / perPage),
      page,
      perPage,
      meta: {
        totalUsers: allUsersRole.length,
        totalPatients,
        totalPsychologists,
        totalAdmins,
      },
    };
  }

  // ==========================================
  // 3. DETAIL PREVIEW USER BY ID
  // ==========================================
  async getUserDetailByAdmin(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        userProfile: true,
        psychologistProfile: {
          include: {
            specializations: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const roleUpper = String(user.role).toUpperCase();
    const isPsychologist = roleUpper === 'PSYCHOLOGIST' || roleUpper === 'PSIKOLOG';

    if (isPsychologist) {
      return {
        id: user.id,
        email: user.email,
        role: 'PSYCHOLOGIST',
        status: 'active',
        fullName: user.psychologistProfile?.fullName || user.userProfile?.fullName || 'Psikolog',
        phone: user.userProfile?.phone || '-',
        sipp: user.psychologistProfile?.sipp || '-',
        str: user.psychologistProfile?.str || '-',
        about: user.psychologistProfile?.about || 'Belum ada deskripsi bio.',
        specializations: user.psychologistProfile?.specializations?.map((s: any) => s.name || s) || [],
      };
    } else {
      return {
        id: user.id,
        email: user.email,
        role: 'PATIENT',
        status: 'active',
        fullName: user.userProfile?.fullName || 'Pasien',
        phone: user.userProfile?.phone || '-',
        joinedDate: user.createdAt,
        stats: {
          totalBooking: 0,
          completedBooking: 0,
          totalTransaction: 0,
          lastBookingDate: '-',
        },
      };
    }
  }

  // ==========================================
  // 4. CRUD KHUSUS PSIKOLOG
  // ==========================================
  async getAllPsychologists() {
    const data = await this.prisma.psychologistProfile.findMany({
      include: {
        user: {
          select: {
            email: true,
            isProfileComplete: true,
            userProfile: {
              select: {
                phone: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return data.map((item) => ({
      ...item,
      phoneNumber: item.user?.userProfile?.phone || '',
    }));
  }

  async createPsychologist(dto: CreatePsychologistByAdminDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException('Email sudah terdaftar');
    }

    const passwordHash = await bcrypt.hash(dto.temporaryPassword, 10);

    const result = await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.create({
        data: {
          email: dto.email,
          role: 'PSYCHOLOGIST' as any,
          isEmailVerified: true,
          isFirstLogin: true,
          isProfileComplete: false,
          authProvider: {
            create: {
              provider: 'local',
              providerId: dto.email,
              passwordHash: passwordHash,
            },
          },
          userProfile: {
            create: {
              fullName: dto.fullName,
              phone: dto.phoneNumber,
            },
          },
          psychologistProfile: {
            create: {
              fullName: dto.fullName,
              sipp: dto.sipp,
              str: dto.str || "",
              about: 'Psikolog Klinik Oase Jiwa',
              avatarUrl: undefined,
            },
          },
        },
      });

      return user;
    });

    try {
      await this.emailService.sendPsychologistCredentials(
        dto.email,
        dto.fullName,
        dto.temporaryPassword,
      );
    } catch (emailErr) {
      console.error('Gagal mengirim email kredensial:', emailErr);
    }

    return {
      message: 'Akun Psikolog berhasil dibuat & email kredensial telah dikirim',
      userId: result.id,
    };
  }

  async updatePsychologist(id: string, dto: UpdatePsychologistDto) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { id },
      include: { user: { include: { userProfile: true } } },
    });

    if (!profile) {
      throw new NotFoundException('Data psikolog tidak ditemukan');
    }

    return this.prisma.$transaction(async (prisma) => {
      if (dto.phoneNumber) {
        if (profile.user.userProfile) {
          await prisma.userProfile.update({
            where: { userId: profile.userId },
            data: { phone: dto.phoneNumber },
          });
        } else {
          await prisma.userProfile.create({
            data: {
              userId: profile.userId,
              fullName: dto.fullName || profile.fullName,
              phone: dto.phoneNumber,
            },
          });
        }
      }

      return prisma.psychologistProfile.update({
        where: { id },
        data: {
          fullName: dto.fullName,
          sipp: dto.sipp,
          str: dto.str ?? undefined,
        },
      });
    });
  }

  async deletePsychologist(id: string) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { id },
    });

    if (!profile) {
      throw new NotFoundException('Data psikolog tidak ditemukan');
    }

    return this.prisma.user.delete({
      where: { id: profile.userId },
    });
  }

  // ==========================================
  // 5. FITUR KIRIM EMAIL PENGINGAT UPDATE PROFIL
  // ==========================================
  async sendPsychologistReminder(psychologistId: string) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { id: psychologistId },
      include: { user: true },
    });

    if (!profile || !profile.user) {
      throw new NotFoundException('Data psikolog tidak ditemukan');
    }

    const email = profile.user.email;
    const name = profile.fullName;

    // Kirim email pengingat via EmailService
    await this.emailService.sendPsychologistReminderEmail(email, name);

    return { message: 'Email pengingat berhasil dikirim!' };
  }
}