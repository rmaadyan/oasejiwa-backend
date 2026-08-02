import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOfficialMedicalRecordDto } from './dto/create-official-medical-record.dto';

@Injectable()
export class OfficialMedicalRecordService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPsychologistProfile(userId: string) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new ForbiddenException('Hanya psikolog yang dapat mengakses Rekam Medis');
    }

    return profile;
  }

  async create(currentUser: any, dto: CreateOfficialMedicalRecordDto) {
    const psychologistProfile = await this.getPsychologistProfile(currentUser.id);

    // If patient has medicalRecord summary update diagnosis, medication, allergies
    if (dto.diagnosis || dto.currentMedication || dto.allergies) {
      const existingMedRecord = await this.prisma.patientMedicalRecord.findUnique({
        where: { userId: dto.userId },
      });

      const diagArray = dto.diagnosis
        ? dto.diagnosis.split(',').map((s) => s.trim()).filter(Boolean)
        : [];
      const medArray = dto.currentMedication
        ? dto.currentMedication.split(',').map((s) => s.trim()).filter(Boolean)
        : [];
      const algArray = dto.allergies
        ? dto.allergies.split(',').map((s) => s.trim()).filter(Boolean)
        : [];

      if (existingMedRecord) {
        await this.prisma.patientMedicalRecord.update({
          where: { userId: dto.userId },
          data: {
            diagnosis: diagArray.length > 0 ? diagArray : undefined,
            currentMedication: medArray.length > 0 ? medArray : undefined,
            allergies: algArray.length > 0 ? algArray : undefined,
          },
        });
      } else {
        await this.prisma.patientMedicalRecord.create({
          data: {
            userId: dto.userId,
            diagnosis: diagArray,
            currentMedication: medArray,
            allergies: algArray,
          },
        });
      }
    }

    let sessionNoteId = dto.sessionNoteId || undefined;

    if (!sessionNoteId) {
      let schedule = await this.prisma.schedule.findFirst({
        where: { psychologistId: psychologistProfile.id },
        select: { id: true },
      });

      if (!schedule) {
        schedule = await this.prisma.schedule.create({
          data: {
            psychologistId: psychologistProfile.id,
            date: new Date(),
            startTime: '09:00',
            duration: 60,
            isAvailable: false,
          },
          select: { id: true },
        });
      }

      const noteCount = await this.prisma.sessionNote.count({
        where: { userId: dto.userId, deletedAt: null },
      });

      const newNote = await this.prisma.sessionNote.create({
        data: {
          psychologistProfileId: psychologistProfile.id,
          userId: dto.userId,
          scheduleId: schedule.id,
          bookingId: dto.bookingId ? Number(dto.bookingId) : undefined,
          sessionNumber: dto.sessionNumber ? Number(dto.sessionNumber) : noteCount + 1,
          subjective: dto.problemSummary || 'Keluhan Utama Sesi Konseling',
          objective: 'Observasi Klinis Psikolog',
          assessment: dto.diagnosis || 'Dalam Evaluasi',
          plan: dto.therapyApproach || 'Rencana Intervensi Psikologis',
          riskLevel: dto.riskLevel || 'LOW',
          riskReason: dto.riskReason || null,
          consultationDate: dto.consultationDate ? new Date(dto.consultationDate) : new Date(),
          consultationStatus: 'COMPLETED',
          diagnosisSummary: dto.diagnosis || null,
          treatmentApproach: dto.therapyApproach || null,
          recommendation: dto.nextSessionRecommendation || null,
          followUpPlan: (dto.followUpPlan || 'CONTINUE_SESSION') as any,
          additionalNotes: dto.additionalNotes || null,
          followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : undefined,
          nextSessionRecommendation: dto.nextSessionRecommendation || null,
        },
      });

      sessionNoteId = newNote.id;
    }

    const record = await this.prisma.officialMedicalRecord.create({
      data: {
        userId: dto.userId,
        psychologistProfileId: psychologistProfile.id,
        bookingId: dto.bookingId ? Number(dto.bookingId) : undefined,
        sessionNoteId,

        sessionNumber: dto.sessionNumber ? Number(dto.sessionNumber) : 1,
        consultationDate: dto.consultationDate ? new Date(dto.consultationDate) : new Date(),

        diagnosis: dto.diagnosis,
        currentMedication: dto.currentMedication,
        allergies: dto.allergies,

        problemSummary: dto.problemSummary,
        therapyApproach: dto.therapyApproach,
        followUpPlan: dto.followUpPlan || 'CONTINUE_SESSION',
        nextSessionDate: dto.nextSessionDate ? new Date(dto.nextSessionDate) : null,
        additionalNotes: dto.additionalNotes,

        riskLevel: dto.riskLevel || 'LOW',
        riskReason: dto.riskReason,
        followUpDate: dto.followUpDate ? new Date(dto.followUpDate) : null,
        nextSessionRecommendation: dto.nextSessionRecommendation,
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        psychologistProfile: true,
        sessionNote: true,
      },
    });

    return {
      message: 'Rekam Medis Resmi berhasil dibuat',
      data: record,
    };
  }

  async findAllForPsychologist(currentUser: any) {
    const psychologistProfile = await this.getPsychologistProfile(currentUser.id);

    const records = await this.prisma.officialMedicalRecord.findMany({
      where: {
        psychologistProfileId: psychologistProfile.id,
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        psychologistProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: records,
    };
  }

  async findPatientRecords(patientId: string) {
    const records = await this.prisma.officialMedicalRecord.findMany({
      where: {
        userId: patientId,
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        psychologistProfile: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      data: records,
    };
  }

  async findOne(id: string) {
    const record = await this.prisma.officialMedicalRecord.findUnique({
      where: { id },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        psychologistProfile: true,
        booking: true,
        sessionNote: true,
      },
    });

    if (!record) {
      throw new NotFoundException('Rekam Medis tidak ditemukan');
    }

    return {
      data: record,
    };
  }
}
