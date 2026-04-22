import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import type { Prisma } from '../../.prisma-client/client';
import { RiskLevel, Role } from '../../.prisma-client/enums';
import { PrismaService } from '../prisma/prisma.service';
import type { AuthUser } from '../common/interfaces/auth-user.interface';
import { CreatePsychologistNoteDto } from './dto/create-psychologist-note.dto';
import { UpdatePsychologistNoteDto } from './dto/update-psychologist-note.dto';
import { QueryPsychologistNoteDto } from './dto/query-psychologist-note.dto';

@Injectable()
export class PsychologistNotesService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly riskLevelMap: Record<'low' | 'medium' | 'high', RiskLevel> = {
    low: RiskLevel.LOW,
    medium: RiskLevel.MEDIUM,
    high: RiskLevel.HIGH,
  };

  private readonly reverseRiskLevelMap: Record<RiskLevel, 'low' | 'medium' | 'high'> = {
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
  };

  private async getPsychologistId(currentUser: AuthUser): Promise<number> {
    if (currentUser.psychologistId) {
      return currentUser.psychologistId;
    }

    const psychologist = await this.prisma.psychologist.findUnique({
      where: { userId: currentUser.sub },
      select: { id: true },
    });

    if (!psychologist) {
      throw new ForbiddenException('Akun ini bukan psikolog');
    }

    return psychologist.id;
  }

  private async writeAuditLog(params: {
    actorUserId: number;
    actorRole: Role;
    action: string;
    entity: string;
    entityId: number;
    metadata?: Prisma.InputJsonValue;
  }) {
    await this.prisma.auditLog.create({
      data: {
        actorUserId: params.actorUserId,
        actorRole: params.actorRole,
        action: params.action,
        entity: params.entity,
        entityId: params.entityId,
        metadata: params.metadata,
      },
    });
  }

  private mapNoteResponse(note: any) {
    return {
      id: note.id,
      sessionId: note.sessionId,
      psychologistId: note.psychologistId,
      patientId: note.patient.id,
      patientName: note.patient.fullName,
      sessionDate: note.session?.date
        ? new Date(note.session.date).toISOString().split('T')[0]
        : null,
      sessionTime: note.session?.startTime ?? null,
      duration:
        note.session?.startTime && note.session?.endTime
          ? this.calculateDuration(note.session.startTime, note.session.endTime)
          : null,
      sessionNumber: 1,
      service: 'Konseling Individu',
      subjective: note.subjective,
      objective: note.objective,
      assessment: note.assessment,
      plan: note.plan,
      riskLevel: this.reverseRiskLevelMap[note.riskLevel],
      followUpDate: note.followUpDate
        ? new Date(note.followUpDate).toISOString().split('T')[0]
        : null,
      nextSessionRecommendation: note.nextSessionRecommendation,
      tags: note.tags ?? [],
      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }

  private calculateDuration(startTime: string, endTime: string): number | null {
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);

    if (
      Number.isNaN(startHour) ||
      Number.isNaN(startMinute) ||
      Number.isNaN(endHour) ||
      Number.isNaN(endMinute)
    ) {
      return null;
    }

    const start = startHour * 60 + startMinute;
    const end = endHour * 60 + endMinute;

    return end > start ? end - start : null;
  }

  async create(currentUser: AuthUser, dto: CreatePsychologistNoteDto) {
    const psychologistId = await this.getPsychologistId(currentUser);

    const session = await this.prisma.session.findFirst({
      where: {
        id: dto.sessionId,
        psychologistId,
        deletedAt: null,
      },
      select: {
        id: true,
        patientId: true,
      },
    });

    if (!session) {
      throw new ForbiddenException('Sesi tidak ditemukan atau bukan milik Anda');
    }

    const existingNote = await this.prisma.sessionNote.findFirst({
      where: {
        sessionId: dto.sessionId,
        deletedAt: null,
      },
      select: { id: true },
    });

    if (existingNote) {
      throw new BadRequestException('Catatan untuk sesi ini sudah ada');
    }

    const note = await this.prisma.sessionNote.create({
      data: {
        sessionId: dto.sessionId,
        psychologistId,
        patientId: session.patientId,
        subjective: dto.subjective,
        objective: dto.objective,
        assessment: dto.assessment,
        plan: dto.plan,
        riskLevel: dto.riskLevel
          ? this.riskLevelMap[dto.riskLevel]
          : RiskLevel.LOW,
        followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
        nextSessionRecommendation: dto.nextSessionRecommendation,
        tags: dto.tags ?? [],
      },
      include: {
        patient: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        session: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        },
      },
    });

    await this.writeAuditLog({
      actorUserId: currentUser.sub,
      actorRole: Role.PSYCHOLOGIST,
      action: 'CREATE',
      entity: 'SessionNote',
      entityId: note.id,
      metadata: {
        sessionId: note.sessionId,
        psychologistId,
      },
    });

    return this.mapNoteResponse(note);
  }

  async findAll(currentUser: AuthUser, query: QueryPsychologistNoteDto) {
    const psychologistId = await this.getPsychologistId(currentUser);

    const page = query.page ?? 1;
    const limit = query.limit ?? 10;
    const skip = (page - 1) * limit;

    const where: Prisma.SessionNoteWhereInput = {
      psychologistId,
      deletedAt: null,
      ...(query.patientId ? { patientId: query.patientId } : {}),
      ...(query.riskLevel && query.riskLevel !== 'all'
        ? { riskLevel: this.riskLevelMap[query.riskLevel] }
        : {}),
      ...(query.dateFrom || query.dateTo
        ? {
            session: {
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
                patient: {
                  fullName: { contains: query.search, mode: 'insensitive' },
                },
              },
            ],
          }
        : {}),
    };

    let orderBy: Prisma.SessionNoteOrderByWithRelationInput = {
      createdAt: 'desc',
    };

    if (query.sortBy === 'patient') {
      orderBy = {
        patient: {
          fullName: 'asc',
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
          where: { ...where, riskLevel: RiskLevel.LOW },
        }),
        this.prisma.sessionNote.count({
          where: { ...where, riskLevel: RiskLevel.MEDIUM },
        }),
        this.prisma.sessionNote.count({
          where: { ...where, riskLevel: RiskLevel.HIGH },
        }),
        this.prisma.sessionNote.findMany({
          where,
          skip,
          take: limit,
          orderBy,
          include: {
            patient: {
              select: {
                id: true,
                fullName: true,
                email: true,
                phone: true,
              },
            },
            session: {
              select: {
                id: true,
                date: true,
                startTime: true,
                endTime: true,
                status: true,
              },
            },
          },
        }),
      ]);

    return {
      notes: notes.map((note) => this.mapNoteResponse(note)),
      total,
      lowRiskCount,
      mediumRiskCount,
      highRiskCount,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(currentUser: AuthUser, id: number) {
    const psychologistId = await this.getPsychologistId(currentUser);

    const note = await this.prisma.sessionNote.findFirst({
      where: {
        id,
        psychologistId,
        deletedAt: null,
      },
      include: {
        patient: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        session: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        },
      },
    });

    if (!note) {
      throw new NotFoundException('Catatan tidak ditemukan');
    }

    await this.writeAuditLog({
      actorUserId: currentUser.sub,
      actorRole: Role.PSYCHOLOGIST,
      action: 'READ_DETAIL',
      entity: 'SessionNote',
      entityId: note.id,
      metadata: { psychologistId },
    });

    return this.mapNoteResponse(note);
  }

  async findBySessionId(currentUser: AuthUser, sessionId: number) {
    const psychologistId = await this.getPsychologistId(currentUser);

    const note = await this.prisma.sessionNote.findFirst({
      where: {
        sessionId,
        psychologistId,
        deletedAt: null,
      },
      include: {
        patient: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        session: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        },
      },
    });

    if (!note) {
      throw new NotFoundException('Catatan tidak ditemukan');
    }

    return this.mapNoteResponse(note);
  }

  async update(
    currentUser: AuthUser,
    id: number,
    dto: UpdatePsychologistNoteDto,
  ) {
    const psychologistId = await this.getPsychologistId(currentUser);

    const existingNote = await this.prisma.sessionNote.findFirst({
      where: {
        id,
        psychologistId,
        deletedAt: null,
      },
      select: {
        id: true,
        sessionId: true,
      },
    });

    if (!existingNote) {
      throw new NotFoundException('Catatan tidak ditemukan');
    }

    if (dto.sessionId && dto.sessionId !== existingNote.sessionId) {
      throw new BadRequestException('sessionId tidak boleh diubah');
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
        patient: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
          },
        },
        session: {
          select: {
            id: true,
            date: true,
            startTime: true,
            endTime: true,
            status: true,
          },
        },
      },
    });

    await this.writeAuditLog({
      actorUserId: currentUser.sub,
      actorRole: Role.PSYCHOLOGIST,
      action: 'UPDATE',
      entity: 'SessionNote',
      entityId: updated.id,
      metadata: { psychologistId },
    });

    return this.mapNoteResponse(updated);
  }

  async remove(currentUser: AuthUser, id: number) {
    const psychologistId = await this.getPsychologistId(currentUser);

    const existingNote = await this.prisma.sessionNote.findFirst({
      where: {
        id,
        psychologistId,
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

    await this.writeAuditLog({
      actorUserId: currentUser.sub,
      actorRole: Role.PSYCHOLOGIST,
      action: 'SOFT_DELETE',
      entity: 'SessionNote',
      entityId: id,
      metadata: { psychologistId },
    });

    return {
      message: 'Catatan berhasil dihapus',
    };
  }
}