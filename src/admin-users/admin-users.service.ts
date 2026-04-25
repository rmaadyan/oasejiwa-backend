import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { QueryAdminUsersDto } from './dto/query-admin-users.dto';
import { UpdateAdminUserDto } from './dto/update-admin-user.dto';

@Injectable()
export class AdminUsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(query: QueryAdminUsersDto) {
    const page = query.page || 1;
    const perPage = query.perPage || 10;
    const skip = (page - 1) * perPage;

    const where: any = {};

    if (query.search) {
      where.OR = [
        { email: { contains: query.search, mode: 'insensitive' } },
        {
          profile: {
            fullName: { contains: query.search, mode: 'insensitive' },
          },
        },
        {
          profile: {
            phone: { contains: query.search, mode: 'insensitive' },
          },
        },
      ];
    }

    if (query.gender && query.gender !== 'all') {
      where.profile = {
        gender: query.gender.toUpperCase(),
      };
    }

    let orderBy: any = { createdAt: 'desc' };

    if (query.sort === 'oldest') orderBy = { createdAt: 'asc' };

    const [users, total, totalPatients, totalPsychologists] =
      await Promise.all([
        this.prisma.user.findMany({
          where,
          skip,
          take: perPage,
          orderBy,
          include: {
            profile: true,
          },
        }),
        this.prisma.user.count({ where }),
        this.prisma.user.count({ where: { role: 'USER' } }),
        this.prisma.user.count({ where: { role: 'PSYCHOLOGIST' } }),
      ]);

    return {
      users: users.map((user) => ({
        id: user.id,
        name: user.profile?.fullName ?? '-',
        email: user.email,
        gender: user.profile?.gender?.toLowerCase() ?? null,
        phone: user.profile?.phone ?? null,
        role: user.role.toLowerCase(),
        status: user.isEmailVerified ? 'active' : 'inactive',
        registeredAt: user.createdAt,
      })),
      total,
      totalPages: Math.ceil(total / perPage),
      page,
      perPage,
      meta: {
        totalUsers: total,
        totalPatients,
        totalPsychologists,
      },
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    return {
      id: user.id,
      name: user.profile?.fullName ?? '-',
      email: user.email,
      gender: user.profile?.gender?.toLowerCase() ?? null,
      phone: user.profile?.phone ?? null,
      role: user.role.toLowerCase(),
      status: user.isEmailVerified ? 'active' : 'inactive',
      registeredAt: user.createdAt,
    };
  }

  async update(id: string, dto: UpdateAdminUserDto) {
    await this.findOne(id);

    const data: any = {};

    if (dto.role) {
      data.role = dto.role.toUpperCase();
    }

    if (dto.status) {
      data.isEmailVerified = dto.status === 'active';
    }

    const user = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        profile: true,
      },
    });

    return {
      id: user.id,
      name: user.profile?.fullName ?? '-',
      email: user.email,
      gender: user.profile?.gender?.toLowerCase() ?? null,
      phone: user.profile?.phone ?? null,
      role: user.role.toLowerCase(),
      status: user.isEmailVerified ? 'active' : 'inactive',
      registeredAt: user.createdAt,
    };
  }

  async remove(id: string) {
    await this.findOne(id);

    return this.prisma.user.update({
      where: { id },
      data: {
        isEmailVerified: false,
      },
    });
  }
}