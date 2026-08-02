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

  private readonly riskLevelMap: Record<string, string> = {
    very_low: 'VERY_LOW',
    low: 'LOW',
    medium: 'MEDIUM',
    high: 'HIGH',
    very_high: 'VERY_HIGH',
    sangat_rendah: 'VERY_LOW',
    rendah: 'LOW',
    sedang: 'MEDIUM',
    tinggi: 'HIGH',
    sangat_tinggi: 'VERY_HIGH',
    VERY_LOW: 'VERY_LOW',
    LOW: 'LOW',
    MEDIUM: 'MEDIUM',
    HIGH: 'HIGH',
    VERY_HIGH: 'VERY_HIGH',
  };

  private readonly reverseRiskLevelMap: Record<string, string> = {
    VERY_LOW: 'very_low',
    LOW: 'low',
    MEDIUM: 'medium',
    HIGH: 'high',
    VERY_HIGH: 'very_high',
  };

  private async getPsychologistProfile(currentUser: any) {
    let profile = await this.prisma.psychologistProfile.findUnique({
      where: { userId: currentUser.id },
      select: {
        id: true,
        fullName: true,
      },
    });
 
    if (!profile) {
      const user = await this.prisma.user.findUnique({
        where: { id: currentUser.id },
        include: {
          userProfile: true,
        },
      });
 
      if (!user) {
        throw new NotFoundException('User tidak ditemukan');
      }
 
      profile = await this.prisma.psychologistProfile.create({
        data: {
          userId: user.id,
          fullName: user.userProfile?.fullName || 'Psikolog Oase Jiwa',
          about: 'Psikolog Klinik Oase Jiwa',
          sipp: '-',
          str: '-',
        },
        select: {
          id: true,
          fullName: true,
        },
      });
    }
 
    return profile;
  }

  private calculateDuration(
    startTime?: string | null,
    duration?: number | null,
  ) {
    if (!startTime || !duration) return duration ?? null;
    return duration;
  }

  private toDateOnly(date?: Date | string | null) {
    if (!date) return null;

    const parsedDate = date instanceof Date ? date : new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return null;
    }

    return parsedDate.toISOString().split('T')[0];
  }

  private async getFallbackBookingForNote(note: any) {
    if (note.schedule) return null;

    return this.prisma.booking.findFirst({
      where: {
        psychologistId: note.psychologistProfileId,
        userId: note.userId,
        status: {
          notIn: ['CANCELLED', 'REJECTED'],
        },
      },
      include: {
        service: true,
        schedule: true,
      },
      orderBy: [
        {
          scheduledDate: 'desc',
        },
        {
          createdAt: 'desc',
        },
      ],
    });
  }

  private mapNoteResponse(note: any, fallbackBooking?: any) {
    const sessionDate =
      note.schedule?.date ||
      fallbackBooking?.scheduledDate ||
      fallbackBooking?.schedule?.date ||
      null;

    const sessionTime =
      note.schedule?.startTime ||
      fallbackBooking?.scheduledTime ||
      fallbackBooking?.schedule?.startTime ||
      null;

    const duration =
      note.schedule?.duration ||
      fallbackBooking?.service?.durasiMenit ||
      fallbackBooking?.schedule?.duration ||
      null;

    return {
      id: note.id,
      scheduleId: note.scheduleId,
      bookingId: note.bookingId,
      psychologistId: note.psychologistProfileId,
      patientId: note.user.id,
      patientName:
        note.user.userProfile?.fullName || note.user.email || 'Unknown User',

      sessionDate: this.toDateOnly(sessionDate),
      sessionTime,
      duration: this.calculateDuration(sessionTime, duration),

      sessionNumber: note.sessionNumber || 1,
      service: fallbackBooking?.service?.nama || 'Konseling Individu',

      subjective: note.subjective,
      objective: note.objective,
      assessment: note.assessment,
      plan: note.plan,

      // === Field Rekam Medis ===
      consultationDate: this.toDateOnly(note.consultationDate || sessionDate),
      consultationStatus: note.consultationStatus || 'ONGOING',
      diagnosisSummary: note.diagnosisSummary || note.subjective || null,
      treatmentApproach: note.treatmentApproach || note.plan || null,
      recommendation: note.recommendation || note.nextSessionRecommendation || null,
      followUpPlan: note.followUpPlan || 'CONTINUE_SESSION',
      additionalNotes: note.additionalNotes || null,

      riskLevel:
        this.reverseRiskLevelMap[note.riskLevel] ||
        String(note.riskLevel || 'medium').toLowerCase(),

      followUpDate: this.toDateOnly(note.followUpDate),
      nextSessionRecommendation: note.nextSessionRecommendation,
      riskReason: note.riskReason || null,
      currentMedication: note.currentMedication || null,
      allergies: note.allergies || null,
      tags: note.tags ?? [],

      createdAt: note.createdAt,
      updatedAt: note.updatedAt,
    };
  }

  private async mapNoteResponseWithFallback(note: any) {
    const fallbackBooking = await this.getFallbackBookingForNote(note);
    return this.mapNoteResponse(note, fallbackBooking);
  }

  private async mapNotesResponseWithFallback(notes: any[]) {
    return Promise.all(
      notes.map((note) => this.mapNoteResponseWithFallback(note)),
    );
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

    let validScheduleId = dto.scheduleId;

    if (validScheduleId) {
      let schedule = await this.prisma.schedule.findFirst({
        where: {
          id: validScheduleId,
          psychologistId: psychologist.id,
        },
        select: { id: true },
      });

      if (!schedule) {
        schedule = await this.prisma.schedule.findUnique({
          where: { id: validScheduleId },
          select: { id: true },
        });

        if (!schedule) {
          const booking = await this.prisma.booking.findFirst({
            where: {
              OR: [
                { id: Number(validScheduleId) || -1 },
                { userId: dto.userId, psychologistId: psychologist.id },
              ],
            },
            select: { id: true, scheduleId: true },
          });

          if (booking && booking.scheduleId) {
            validScheduleId = booking.scheduleId;
          } else {
            const existingSchedule = await this.prisma.schedule.findFirst({
              where: { psychologistId: psychologist.id },
              select: { id: true },
            });

            if (existingSchedule) {
              validScheduleId = existingSchedule.id;
            } else {
              const newSchedule = await this.prisma.schedule.create({
                data: {
                  psychologistId: psychologist.id,
                  date: new Date(),
                  startTime: '09:00',
                  duration: 60,
                  isAvailable: false,
                },
                select: { id: true },
              });
              validScheduleId = newSchedule.id;
            }
          }
        } else {
          validScheduleId = schedule.id;
        }
      }
    } else {
      const existingSchedule = await this.prisma.schedule.findFirst({
        where: { psychologistId: psychologist.id },
        select: { id: true },
      });

      if (existingSchedule) {
        validScheduleId = existingSchedule.id;
      } else {
        const newSchedule = await this.prisma.schedule.create({
          data: {
            psychologistId: psychologist.id,
            date: new Date(),
            startTime: '09:00',
            duration: 60,
            isAvailable: false,
          },
          select: { id: true },
        });
        validScheduleId = newSchedule.id;
      }
    }

    // Auto calculate session number if not provided
    let sessionNum = dto.sessionNumber;
    if (!sessionNum) {
      const count = await this.prisma.sessionNote.count({
        where: {
          userId: dto.userId,
          deletedAt: null,
        },
      });
      sessionNum = count + 1;
    }

    const noteResult = await this.prisma.$transaction(async (tx) => {
      const note = await tx.sessionNote.create({
        data: {
          psychologistProfileId: psychologist.id,
          userId: dto.userId,
          scheduleId: validScheduleId,
          bookingId: dto.bookingId,
          subjective: dto.subjective,
          objective: dto.objective,
          assessment: dto.assessment,
          plan: dto.plan,
          riskLevel: dto.riskLevel ? ((this.riskLevelMap[dto.riskLevel] || 'MEDIUM') as any) : 'MEDIUM',
          sessionNumber: sessionNum,
          consultationDate: dto.consultationDate ? new Date(dto.consultationDate) : new Date(),
          consultationStatus: dto.consultationStatus || 'ONGOING',
          diagnosisSummary: dto.diagnosisSummary || dto.diagnosis || dto.subjective,
          treatmentApproach: dto.treatmentApproach || dto.plan,
          recommendation: dto.recommendation || dto.nextSessionRecommendation,
          followUpPlan: dto.followUpPlan || 'CONTINUE_SESSION',
          additionalNotes: dto.additionalNotes,
          followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
          nextSessionRecommendation: dto.nextSessionRecommendation,
          riskReason: dto.riskReason,
          currentMedication: dto.medication,
          allergies: dto.allergies,
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

      await tx.officialMedicalRecord.create({
        data: {
          userId: dto.userId,
          psychologistProfileId: psychologist.id,
          sessionNoteId: note.id,
          bookingId: note.bookingId || undefined,
          sessionNumber: sessionNum,
          consultationDate: note.consultationDate || new Date(),
          diagnosis: dto.diagnosisSummary || dto.diagnosis || dto.subjective || 'Dalam Evaluasi',
          currentMedication: dto.medication || note.currentMedication || null,
          allergies: dto.allergies || note.allergies || null,
          problemSummary: dto.subjective || 'Catatan Sesi Konseling',
          therapyApproach: dto.plan || 'Intervensi Psikologis',
          followUpPlan: dto.followUpPlan || 'CONTINUE_SESSION',
          additionalNotes: dto.additionalNotes || null,
          riskLevel: note.riskLevel,
          riskReason: dto.riskReason || null,
          followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
          nextSessionRecommendation: dto.nextSessionRecommendation || null,
        },
      });

      if (dto.diagnosis || dto.medication || dto.allergies) {
        const diagArray = dto.diagnosis ? [dto.diagnosis] : [];
        const medArray = dto.medication ? [dto.medication] : [];
        const algArray = dto.allergies ? [dto.allergies] : [];

        const existingMed = await tx.patientMedicalRecord.findUnique({
          where: { userId: dto.userId },
        });

        if (existingMed) {
          await tx.patientMedicalRecord.update({
            where: { userId: dto.userId },
            data: {
              diagnosis: diagArray.length > 0 ? diagArray : undefined,
              currentMedication: medArray.length > 0 ? medArray : undefined,
              allergies: algArray.length > 0 ? algArray : undefined,
            },
          });
        } else {
          await tx.patientMedicalRecord.create({
            data: {
              userId: dto.userId,
              diagnosis: diagArray,
              currentMedication: medArray,
              allergies: algArray,
            },
          });
        }
      }

      return note;
    });

    return this.mapNoteResponseWithFallback(noteResult);
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
      notes: await this.mapNotesResponseWithFallback(notes),
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

    return this.mapNoteResponseWithFallback(note);
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

    return this.mapNoteResponseWithFallback(note);
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

    const updated = await this.prisma.$transaction(async (tx) => {
      const note = await tx.sessionNote.update({
        where: { id },
        data: {
          subjective: dto.subjective,
          objective: dto.objective,
          assessment: dto.assessment,
          plan: dto.plan,
          riskLevel: dto.riskLevel ? (this.riskLevelMap[dto.riskLevel] as any) : undefined,
          sessionNumber: dto.sessionNumber,
          consultationDate: dto.consultationDate ? new Date(dto.consultationDate) : undefined,
          consultationStatus: dto.consultationStatus,
          diagnosisSummary: dto.diagnosisSummary,
          treatmentApproach: dto.treatmentApproach,
          recommendation: dto.recommendation,
          followUpPlan: dto.followUpPlan,
          additionalNotes: dto.additionalNotes,
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

      // Sync OfficialMedicalRecord for Admin & PDF Reports
      const updatedDiagnosis = dto.diagnosisSummary || dto.subjective || note.diagnosisSummary || note.subjective || 'Dalam Evaluasi';
      const updatedMedication = dto.medication || note.currentMedication || null;
      const updatedAllergies = dto.allergies || note.allergies || null;

      await tx.officialMedicalRecord.updateMany({
        where: {
          sessionNoteId: id,
        },
        data: {
          diagnosis: updatedDiagnosis,
          currentMedication: updatedMedication,
          allergies: updatedAllergies,
          problemSummary: note.subjective || 'Catatan Sesi Konseling',
          therapyApproach: note.plan || 'Intervensi Psikologis',
          followUpPlan: (note.followUpPlan as any) || 'CONTINUE_SESSION',
          additionalNotes: note.additionalNotes || null,
          riskLevel: note.riskLevel,
          riskReason: note.riskReason || null,
          followUpDate: note.followUpDate ? new Date(note.followUpDate) : undefined,
          nextSessionRecommendation: note.nextSessionRecommendation || null,
        },
      });

      // Sync PatientMedicalRecord
      const diagArray = updatedDiagnosis ? [updatedDiagnosis] : [];
      const medArray = updatedMedication ? [updatedMedication] : [];
      const algArray = updatedAllergies ? [updatedAllergies] : [];

      const existingMed = await tx.patientMedicalRecord.findUnique({
        where: { userId: note.userId },
      });

      if (existingMed) {
        await tx.patientMedicalRecord.update({
          where: { userId: note.userId },
          data: {
            diagnosis: diagArray.length > 0 ? diagArray : undefined,
            currentMedication: medArray.length > 0 ? medArray : undefined,
            allergies: algArray.length > 0 ? algArray : undefined,
          },
        });
      } else {
        await tx.patientMedicalRecord.create({
          data: {
            userId: note.userId,
            diagnosis: diagArray,
            currentMedication: medArray,
            allergies: algArray,
          },
        });
      }

      return note;
    });

    return this.mapNoteResponseWithFallback(updated);
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