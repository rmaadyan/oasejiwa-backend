import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PsychologistDashboardService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPsychologistProfile(currentUser: any) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { userId: currentUser.id },
      select: {
        id: true,
        fullName: true,
        avatarUrl: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Akun ini bukan psikolog');
    }

    return profile;
  }

  private toDateOnly(date: Date) {
    return date.toISOString().split('T')[0];
  }

  private mapSchedule(schedule: any) {
    const dateOnly = this.toDateOnly(schedule.date);
    const todayOnly = this.toDateOnly(new Date());

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
    };
  }

  async getDashboard(currentUser: any) {
    const psychologist = await this.getPsychologistProfile(currentUser);

    const now = new Date();
    const todayOnly = this.toDateOnly(now);

    const startToday = new Date(`${todayOnly}T00:00:00.000Z`);
    const endToday = new Date(`${todayOnly}T23:59:59.999Z`);

    const sevenDaysLater = new Date();
    sevenDaysLater.setDate(sevenDaysLater.getDate() + 7);

    const [
      todaySchedules,
      upcomingSchedules,
      allSchedulesThisWeek,
      notes,
      highRiskCount,
    ] = await this.prisma.$transaction([
      this.prisma.schedule.findMany({
        where: {
          psychologistId: psychologist.id,
          date: {
            gte: startToday,
            lte: endToday,
          },
        },
        orderBy: {
          startTime: 'asc',
        },
      }),

      this.prisma.schedule.findMany({
        where: {
          psychologistId: psychologist.id,
          date: {
            gte: now,
            lte: sevenDaysLater,
          },
          isAvailable: true,
        },
        orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
        take: 5,
      }),

      this.prisma.schedule.findMany({
        where: {
          psychologistId: psychologist.id,
          date: {
            gte: startToday,
            lte: sevenDaysLater,
          },
        },
      }),

      this.prisma.sessionNote.findMany({
        where: {
          psychologistProfileId: psychologist.id,
          deletedAt: null,
        },
        include: {
          user: {
            include: {
              userProfile: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      }),

      this.prisma.sessionNote.count({
        where: {
          psychologistProfileId: psychologist.id,
          deletedAt: null,
          riskLevel: 'HIGH',
        },
      }),
    ]);

    const uniquePatientIds = new Set(notes.map((note) => note.userId));

    const todayCompleted = todaySchedules.filter((schedule) => {
      const mapped = this.mapSchedule(schedule);
      return mapped.status === 'completed';
    }).length;

    const recentPatientsMap = new Map<string, any>();

    for (const note of notes) {
      if (!recentPatientsMap.has(note.userId)) {
        recentPatientsMap.set(note.userId, {
          id: note.userId,
          name:
            note.user.userProfile?.fullName ||
            note.user.email ||
            'Unknown User',
          email: note.user.email,
          phone: note.user.userProfile?.phone || null,
          photo: null,
          firstSessionDate: note.createdAt,
          lastSessionDate: note.createdAt,
          totalSessions: notes.filter((n) => n.userId === note.userId).length,
          upcomingSessionDate: null,
          notes: note.assessment || note.subjective || null,
        });
      }
    }

    const recentPatients = Array.from(recentPatientsMap.values()).slice(0, 5);

    return {
      profile: {
        id: psychologist.id,
        name: psychologist.fullName,
        avatarUrl: psychologist.avatarUrl,
      },
      stats: {
        todaySessions: todaySchedules.length,
        todayCompleted,
        weekSessions: allSchedulesThisWeek.length,
        totalPatients: uniquePatientIds.size,
        activePatientsThisMonth: uniquePatientIds.size,
        totalLifetimeSessions: notes.length,
        averageRating: 0,
        highRiskCount,
        nextSessionTime: upcomingSchedules[0]?.startTime || null,
      },
      todaySchedule: todaySchedules.map((schedule) =>
        this.mapSchedule(schedule),
      ),
      upcomingSessions: upcomingSchedules.map((schedule) =>
        this.mapSchedule(schedule),
      ),
      recentPatients,
    };
  }
}