import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryAdminUsersDto } from './dto/query-admin-users.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryAdminUsersDto) {
    const page = query.page && query.page > 0 ? query.page : 1;
    const perPage = query.perPage && query.perPage > 0 ? query.perPage : 10;
    const skip = (page - 1) * perPage;

    const where: any = {};

    if (query.search) {
      where.OR = [
        {
          email: {
            contains: query.search,
            mode: 'insensitive',
          },
        },
        {
          userProfile: {
            fullName: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
        {
          userProfile: {
            phone: {
              contains: query.search,
              mode: 'insensitive',
            },
          },
        },
      ];
    }

    if (query.gender && query.gender !== 'all') {
      where.userProfile = {
        ...(where.userProfile || {}),
        gender: query.gender.toUpperCase(),
      };
    }

    let orderBy: any = { createdAt: 'desc' };

    if (query.sort === 'oldest') {
      orderBy = { createdAt: 'asc' };
    }

    if (query.sort === 'name_asc') {
      orderBy = {
        userProfile: {
          fullName: 'asc',
        },
      };
    }

    if (query.sort === 'name_desc') {
      orderBy = {
        userProfile: {
          fullName: 'desc',
        },
      };
    }

    const [users, total, totalPatients, totalPsychologists, totalAdmins] =
      await Promise.all([
        this.prisma.user.findMany({
          where,
          skip,
          take: perPage,
          orderBy,
          include: {
            userProfile: true,
            psychologistProfile: true,
          },
        }),
        this.prisma.user.count({ where }),
        this.prisma.user.count({ where: { role: 'USER' } }),
        this.prisma.user.count({ where: { role: 'PSYCHOLOGIST' } }),
        this.prisma.user.count({ where: { role: 'ADMIN' } }),
      ]);

    return {
      users: users.map((user) => ({
        id: user.id,
        name:
          user.userProfile?.fullName ||
          user.psychologistProfile?.fullName ||
          '-',
        email: user.email,
        gender: user.userProfile?.gender?.toLowerCase() ?? null,
        phone: user.userProfile?.phone ?? null,
        role: user.role.toLowerCase(),
        status: user.isEmailVerified ? 'active' : 'inactive',
        registeredAt: user.createdAt,
        isEmailVerified: user.isEmailVerified,
        isProfileComplete: user.isProfileComplete,
      })),
      total,
      totalPages: Math.ceil(total / perPage),
      page,
      perPage,
      meta: {
        totalUsers: total,
        totalPatients,
        totalPsychologists,
        totalAdmins,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        userProfile: true,
        psychologistProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    return {
      id: user.id,
      name:
        user.userProfile?.fullName ||
        user.psychologistProfile?.fullName ||
        '-',
      email: user.email,
      gender: user.userProfile?.gender?.toLowerCase() ?? null,
      phone: user.userProfile?.phone ?? null,
      role: user.role.toLowerCase(),
      status: user.isEmailVerified ? 'active' : 'inactive',
      registeredAt: user.createdAt,
      isEmailVerified: user.isEmailVerified,
      isProfileComplete: user.isProfileComplete,
      isFirstLogin: user.isFirstLogin,
      profile: user.userProfile,
      psychologistProfile: user.psychologistProfile,
    };
  }

  async update(id: string, dto: UpdateAdminUserDto) {
    await this.findOne(id);

    const data: any = {};

    if (dto.role) {
      data.role = dto.role;
    }

    if (dto.status) {
      data.isEmailVerified = dto.status === 'active';
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        userProfile: true,
        psychologistProfile: true,
      },
    });

    return {
      message: 'User berhasil diupdate',
      data: {
        id: user.id,
        name:
          user.userProfile?.fullName ||
          user.psychologistProfile?.fullName ||
          '-',
        email: user.email,
        gender: user.userProfile?.gender?.toLowerCase() ?? null,
        phone: user.userProfile?.phone ?? null,
        role: user.role.toLowerCase(),
        status: user.isEmailVerified ? 'active' : 'inactive',
        registeredAt: user.createdAt,
        isEmailVerified: user.isEmailVerified,
        isProfileComplete: user.isProfileComplete,
      },
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    const user = await this.prisma.user.update({
      where: { id },
      data: {
        isEmailVerified: false,
      },
      include: {
        userProfile: true,
        psychologistProfile: true,
      },
    });

    return {
      message: 'User berhasil dinonaktifkan',
      data: {
        id: user.id,
        name:
          user.userProfile?.fullName ||
          user.psychologistProfile?.fullName ||
          '-',
        email: user.email,
        role: user.role.toLowerCase(),
        status: 'inactive',
      },
    };
  }
}