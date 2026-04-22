import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePsychologistNoteDto } from './dto/create-psychologist-note.dto';
import { UpdatePsychologistNoteDto } from './dto/update-psychologist-note.dto';
import { QueryPsychologistNoteDto } from './dto/query-psychologist-note.dto';

@Injectable()
export class PsychologistNotesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly riskLevelMap = {
    low: 'LOW',
    medium: 'MEDIUM',
    high: 'HIGH',
  } as const;

  private readonly reverseRiskLevelMap = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
  } as const;

  private async getPsychologistProfile(currentUser: any) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { userId: currentUser.id },
      select: {
        id: true,
        fullName: true,
      },
    });

    if (!profile) {
      throw new ForbiddenException('Akun ini bukan psikolog');
    }

    return profile;
  }

  private calculateDuration(startTime?: string | null, duration?: number | null) {
    if (!startTime || !duration) return duration ?? null;
    return duration;
  }

  private mapNoteResponse(note: any) {
    return {
      id: note.id,
      scheduleId: note.scheduleId,
      psychologistId: note.psychologistProfileId,
      patientId: note.user.id,
      patientName:
        note.user.userProfile?.fullName ||
        note.user.email ||
        'Unknown User',
      sessionDate: note.schedule?.date
        ? new Date(note.schedule.date).toISOString().split('T')[0]
        : null,
      sessionTime: note.schedule?.startTime ?? null,
      duration: this.calculateDuration(
        note.schedule?.startTime,
        note.schedule?.duration,
      ),
      sessionNumber: 1,
      service: 'Konseling Individu',
      subjective: note.subjective,
      objective: note.objective,
      assessment: note.assessment,
      plan: note.plan,
      riskLevel: this.reverseRiskLevelMap[note.riskLevel as 'LOW' | 'MEDIUM' | 'HIGH'],
      followUpDate: note.followUpDate
        ? new Date(note.followUpDate).toISOString().split('T')[0]
        : null,
      nextSessionRecommendation: note.nextSessionRecommendation,
      tags: note.tags ?? [],
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }

  async create(currentUser: any, dto: CreatePsychologistNoteDto) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    const user = await this.prisma.user.findUnique({
      where: { id: dto.userId },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    if (user.role !== 'USER') {
      throw new BadRequestException('Target note harus user/pasien');
    }

    if (dto.scheduleId) {
      const schedule = await this.prisma.schedule.findFirst({
        where: {
          id: dto.scheduleId,
          psychologistId: psychologist.id,
        },
        select: {
          id: true,
        },
      });

      if (!schedule) {
        throw new ForbiddenException('Jadwal tidak ditemukan atau bukan milik Anda');
      }

      const existingNote = await this.prisma.sessionNote.findFirst({
        where: {
          scheduleId: dto.scheduleId,
          deletedAt: null,
        },
        select: { id: true },
      });

      if (existingNote) {
        throw new BadRequestException('Catatan untuk jadwal ini sudah ada');
      }
    }

    const note = await this.prisma.sessionNote.create({
      data: {
        psychologistProfileId: psychologist.id,
        userId: dto.userId,
        scheduleId: dto.scheduleId,
        subjective: dto.subjective,
        objective: dto.objective,
        assessment: dto.assessment,
        plan: dto.plan,
        riskLevel: dto.riskLevel
          ? this.riskLevelMap[dto.riskLevel]
          : 'LOW',
        followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
        nextSessionRecommendation: dto.nextSessionRecommendation,
        tags: dto.tags ?? [],
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        schedule: true,
      },
    });

    return this.mapNoteResponse(note);
  }

  async findAll(currentUser: any, query: QueryPsychologistNoteDto) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: any = {
      psychologistProfileId: psychologist.id,
      deletedAt: null,
      ...(query.userId ? { userId: query.userId } : {}),
      ...(query.riskLevel && query.riskLevel !== 'all'
        ? { riskLevel: this.riskLevelMap[query.riskLevel] }
        : {}),
      ...(query.dateFrom || query.dateTo
        ? {
            schedule: {
              date: {
                ...(query.dateFrom ? { gte: new Date(query.dateFrom) } : {}),
                ...(query.dateTo ? { lte: new Date(query.dateTo) } : {}),
              },
            },
          }
        : {}),
      ...(query.search
        ? {
            OR: [
              { subjective: { contains: query.search, mode: 'insensitive' } },
              { objective: { contains: query.search, mode: 'insensitive' } },
              { assessment: { contains: query.search, mode: 'insensitive' } },
              { plan: { contains: query.search, mode: 'insensitive' } },
              {
                user: {
                  userProfile: {
                    fullName: { contains: query.search, mode: 'insensitive' },
                  },
                },
              },
              {
                user: {
                  email: { contains: query.search, mode: 'insensitive' },
                },
              },
            ],
          }
        : {}),
    };

    let orderBy: any = {
      createdAt: 'desc',
    };

    if (query.sortBy === 'patient') {
      orderBy = {
        user: {
          email: 'asc',
        },
      };
    }

    if (query.sortBy === 'riskLevel') {
      orderBy = {
        riskLevel: 'desc',
      };
    }

    const [total, lowRiskCount, mediumRiskCount, highRiskCount, notes] =
      await this.prisma.$transaction([
        this.prisma.sessionNote.count({ where }),
        this.prisma.sessionNote.count({
          where: { ...where, riskLevel: 'LOW' },
        }),
        this.prisma.sessionNote.count({
          where: { ...where, riskLevel: 'MEDIUM' },
        }),
        this.prisma.sessionNote.count({
          where: { ...where, riskLevel: 'HIGH' },
        }),
        this.prisma.sessionNote.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            user: {
              include: {
                userProfile: true,
              },
            },
            schedule: true,
          },
        }),
      ]);

    return {
      notes: notes.map((note: any) => this.mapNoteResponse(note)),
      total,
      lowRiskCount,
      mediumRiskCount,
      highRiskCount,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(currentUser: any, id: string) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    const note = await this.prisma.sessionNote.findFirst({
      where: {
        id,
        psychologistProfileId: psychologist.id,
        deletedAt: null,
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        schedule: true,
      },
    });

    if (!note) {
      throw new NotFoundException('Catatan tidak ditemukan');
    }

    return this.mapNoteResponse(note);
  }

  async findByScheduleId(currentUser: any, scheduleId: string) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    const note = await this.prisma.sessionNote.findFirst({
      where: {
        scheduleId,
        psychologistProfileId: psychologist.id,
        deletedAt: null,
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        schedule: true,
      },
    });

    if (!note) {
      throw new NotFoundException('Catatan tidak ditemukan');
    }

    return this.mapNoteResponse(note);
  }

  async update(currentUser: any, id: string, dto: UpdatePsychologistNoteDto) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    const existingNote = await this.prisma.sessionNote.findFirst({
      where: {
        id,
        psychologistProfileId: psychologist.id,
        deletedAt: null,
      },
      select: {
        id: true,
        scheduleId: true,
      },
    });

    if (!existingNote) {
      throw new NotFoundException('Catatan tidak ditemukan');
    }

    if (dto.scheduleId && dto.scheduleId !== existingNote.scheduleId) {
      throw new BadRequestException('scheduleId tidak boleh diubah');
    }

    if (dto.userId) {
      throw new BadRequestException('userId tidak boleh diubah');
    }

    const updated = await this.prisma.sessionNote.update({
      where: { id },
      data: {
        subjective: dto.subjective,
        objective: dto.objective,
        assessment: dto.assessment,
        plan: dto.plan,
        riskLevel: dto.riskLevel
          ? this.riskLevelMap[dto.riskLevel]
          : undefined,
        followUpDate: dto.followUpDate
          ? new Date(dto.followUpDate)
          : dto.followUpDate === ''
            ? null
            : undefined,
        nextSessionRecommendation:
          dto.nextSessionRecommendation !== undefined
            ? dto.nextSessionRecommendation
            : undefined,
        tags: dto.tags ?? undefined,
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        schedule: true,
      },
    });

    return this.mapNoteResponse(updated);
  }

  async remove(currentUser: any, id: string) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    const existingNote = await this.prisma.sessionNote.findFirst({
      where: {
        id,
        psychologistProfileId: psychologist.id,
        deletedAt: null,
      },
      select: { id: true },
    });

    if (!existingNote) {
      throw new NotFoundException('Catatan tidak ditemukan');
    }

    await this.prisma.sessionNote.update({
      where: { id },
      data: {
        deletedAt: new Date(),
      },
    });

    return {
      message: 'Catatan berhasil dihapus',
    };
  }
}