import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PsychologistScheduleService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPsychologistProfileId(userId: string) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundException('Akun ini bukan psikolog');
    }

    return profile.id;
  }

  private mapSchedule(schedule: any) {
    const date = new Date(schedule.date);
    const today = new Date();

    const dateOnly = date.toISOString().split('T')[0];
    const todayOnly = today.toISOString().split('T')[0];

    let status: 'upcoming' | 'completed' | 'cancelled' = 'upcoming';

    if (!schedule.isAvailable) {
      status = 'cancelled';
    } else if (dateOnly < todayOnly) {
      status = 'completed';
    }

    return {
      id: schedule.id,
      patientId: null,
      patientName: 'Belum ada pasien',
      patientPhoto: null,
      service: 'Konseling Individu',
      date: dateOnly,
      time: schedule.startTime,
      duration: schedule.duration,
      status,
      paymentStatus: 'pending',
      sessionNumber: 1,
      meetingLink: null,
      notes: schedule.isAvailable ? 'Slot tersedia' : 'Slot tidak tersedia',
      isAvailable: schedule.isAvailable,
      createdAt: schedule.createdAt,
    };
  }

  async getAll(currentUser: any, query: any) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);

    const { date, status } = query;

    const where: any = {
      psychologistId,
    };

    if (date) {
      const start = new Date(`${date}T00:00:00.000Z`);
      const end = new Date(`${date}T23:59:59.999Z`);

      where.date = {
        gte: start,
        lte: end,
      };
    }

    const schedules = await this.prisma.schedule.findMany({
      where,
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });

    let mapped = schedules.map((schedule) => this.mapSchedule(schedule));

    if (status && status !== 'all') {
      mapped = mapped.filter((item) => item.status === status);
    }

    return {
      sessions: mapped,
      total: mapped.length,
      upcomingCount: mapped.filter((item) => item.status === 'upcoming').length,
      completedCount: mapped.filter((item) => item.status === 'completed')
        .length,
      cancelledCount: mapped.filter((item) => item.status === 'cancelled')
        .length,
    };
  }

  async getById(currentUser: any, id: string) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);

    const schedule = await this.prisma.schedule.findFirst({
      where: {
        id,
        psychologistId,
      },
    });

    if (!schedule) {
      throw new NotFoundException('Jadwal tidak ditemukan');
    }

    return this.mapSchedule(schedule);
  }
}