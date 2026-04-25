import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PsychologistPatientsService {
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

  async getAll(currentUser: any, query: any) {
    const psychologistProfileId = await this.getPsychologistProfileId(
      currentUser.id,
    );

    const { search, sortBy = 'name' } = query;

    const notes = await this.prisma.sessionNote.findMany({
      where: {
        psychologistProfileId,
        deletedAt: null,
      },
      select: {
        userId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const patientMap = new Map<
      string,
      {
        userId: string;
        totalSessions: number;
        firstSessionDate: Date;
        lastSessionDate: Date;
      }
    >();

    for (const note of notes) {
      const existing = patientMap.get(note.userId);

      if (!existing) {
        patientMap.set(note.userId, {
          userId: note.userId,
          totalSessions: 1,
          firstSessionDate: note.createdAt,
          lastSessionDate: note.createdAt,
        });
      } else {
        existing.totalSessions += 1;

        if (note.createdAt < existing.firstSessionDate) {
          existing.firstSessionDate = note.createdAt;
        }

        if (note.createdAt > existing.lastSessionDate) {
          existing.lastSessionDate = note.createdAt;
        }
      }
    }

    const patientIds = Array.from(patientMap.keys());

    if (patientIds.length === 0) {
      return {
        patients: [],
        total: 0,
        activeCount: 0,
        inactiveCount: 0,
      };
    }

    const users = await this.prisma.user.findMany({
      where: {
        id: {
          in: patientIds,
        },
        role: 'USER',
      },
      include: {
        userProfile: true,
      },
    });

    let patients = users.map((user) => {
      const stats = patientMap.get(user.id)!;

      return {
        id: user.id,
        name: user.userProfile?.fullName || user.email || 'Unknown User',
        email: user.email,
        phone: user.userProfile?.phone || null,
        photo: null,
        firstSessionDate: stats.firstSessionDate,
        lastSessionDate: stats.lastSessionDate,
        totalSessions: stats.totalSessions,
        upcomingSessionDate: null,
        notes: null,
      };
    });

    if (search) {
      const keyword = String(search).toLowerCase();

      patients = patients.filter(
        (patient) =>
          patient.name.toLowerCase().includes(keyword) ||
          patient.email.toLowerCase().includes(keyword),
      );
    }

    if (sortBy === 'name') {
      patients.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (sortBy === 'lastSession') {
      patients.sort(
        (a, b) =>
          new Date(b.lastSessionDate).getTime() -
          new Date(a.lastSessionDate).getTime(),
      );
    }

    if (sortBy === 'totalSessions') {
      patients.sort((a, b) => b.totalSessions - a.totalSessions);
    }

    return {
      patients,
      total: patients.length,
      activeCount: patients.length,
      inactiveCount: 0,
    };
  }

  async getById(currentUser: any, patientId: string) {
    const psychologistProfileId = await this.getPsychologistProfileId(
      currentUser.id,
    );

    const notes = await this.prisma.sessionNote.findMany({
      where: {
        psychologistProfileId,
        userId: patientId,
        deletedAt: null,
      },
      include: {
        schedule: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (notes.length === 0) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: patientId,
      },
      include: {
        userProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }

    const sessionHistory = notes.map((note) => ({
      id: note.id,
      date: note.schedule?.date || note.createdAt,
      time: note.schedule?.startTime || '',
      duration: note.schedule?.duration || 60,
      service: 'Konseling Individu',
      status: 'completed',
      hasNotes: true,
    }));

    return {
      id: user.id,
      name: user.userProfile?.fullName || user.email || 'Unknown User',
      email: user.email,
      phone: user.userProfile?.phone || null,
      photo: null,
      age: null,
      gender: user.userProfile?.gender || null,
      address: user.userProfile?.fullAddress || null,
      firstSessionDate: notes[notes.length - 1].createdAt,
      lastSessionDate: notes[0].createdAt,
      totalSessions: notes.length,
      upcomingSessionDate: null,
      diagnosis: [],
      currentMedication: [],
      allergies: [],
      sessionHistory,
      lastNotes: notes[0]?.assessment || notes[0]?.subjective || null,
    };
  }
}