import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePatientMedicalDto } from './dto/update-patient-medical.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

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

  private getPatientName(user: any) {
    return user?.userProfile?.fullName || user?.email || 'Pasien';
  }

  private isUpcomingStatus(status: string) {
    return ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'].includes(
      status,
    );
  }

  private normalizeStatus(status: string) {
    if (status === 'COMPLETED') return 'completed';

    if (status === 'CANCELLED' || status === 'REJECTED') {
      return 'cancelled';
    }

    return 'upcoming';
  }

  async getAll(currentUser: any, query: any) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);
    const { search, sortBy = 'name' } = query;

    const bookings = await this.prisma.booking.findMany({
      where: {
        psychologistId,
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        service: true,
      },
      orderBy: {
        scheduledDate: 'desc',
      },
    });

    let patients: any[] = [];

    if (bookings.length > 0) {
      const patientMap = new Map<string, any>();

      for (const booking of bookings) {
        const existing = patientMap.get(booking.userId);

        if (!existing) {
          patientMap.set(booking.userId, {
            id: booking.userId,
            name: this.getPatientName(booking.user),
            email: booking.user?.email || '',
            phone: booking.user?.userProfile?.phone || null,
            photo: null,
            firstSessionDate: booking.scheduledDate,
            lastSessionDate: booking.scheduledDate,
            totalSessions: 1,
            upcomingSessionDate: this.isUpcomingStatus(booking.status)
              ? booking.scheduledDate
              : null,
            notes: booking.notes || null,
          });
        } else {
          existing.totalSessions += 1;

          if (booking.scheduledDate < existing.firstSessionDate) {
            existing.firstSessionDate = booking.scheduledDate;
          }

          if (booking.scheduledDate > existing.lastSessionDate) {
            existing.lastSessionDate = booking.scheduledDate;
          }

          if (
            this.isUpcomingStatus(booking.status) &&
            (!existing.upcomingSessionDate ||
              booking.scheduledDate < existing.upcomingSessionDate)
          ) {
            existing.upcomingSessionDate = booking.scheduledDate;
          }
        }
      }

      patients = Array.from(patientMap.values());
    } else {
      const notes = await this.prisma.sessionNote.findMany({
        where: {
          psychologistProfileId: psychologistId,
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
      });

      const patientMap = new Map<string, any>();

      for (const note of notes) {
        const existing = patientMap.get(note.userId);

        if (!existing) {
          patientMap.set(note.userId, {
            id: note.userId,
            name: this.getPatientName(note.user),
            email: note.user?.email || '',
            phone: note.user?.userProfile?.phone || null,
            photo: null,
            firstSessionDate: note.createdAt,
            lastSessionDate: note.createdAt,
            totalSessions: 1,
            upcomingSessionDate: null,
            notes: note.assessment || note.subjective || null,
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

      patients = Array.from(patientMap.values());
    }

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
      activeCount: patients.filter((patient) => patient.upcomingSessionDate)
        .length,
      inactiveCount: patients.filter((patient) => !patient.upcomingSessionDate)
        .length,
    };
  }

  async getById(currentUser: any, patientId: string) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);

    const bookings = await this.prisma.booking.findMany({
      where: {
        psychologistId,
        userId: patientId,
      },
      include: {
        user: {
          include: {
            userProfile: true,
            medicalRecord: true,
            emergencyContacts: true,
          },
        },
        service: true,
        payments: true,
        schedule: true,
      },
      orderBy: {
        scheduledDate: 'desc',
      },
    });

    const notes = await this.prisma.sessionNote.findMany({
      where: {
        psychologistProfileId: psychologistId,
        userId: patientId,
        deletedAt: null,
      },
      include: {
        user: {
          include: {
            userProfile: true,
            medicalRecord: true,
            emergencyContacts: true,
          },
        },
        schedule: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (bookings.length === 0 && notes.length === 0) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    const user = bookings[0]?.user || notes[0]?.user;

    const sessionHistory =
      bookings.length > 0
        ? bookings.map((booking) => {
            const relatedNote =
              notes.find(
                (note) =>
                  note.scheduleId &&
                  booking.scheduleId &&
                  note.scheduleId === booking.scheduleId,
              ) ||
              notes.find(
                (note) =>
                  note.scheduleId &&
                  booking.schedule?.id &&
                  note.scheduleId === booking.schedule.id,
              ) ||
              null;

            return {
              id: String(booking.id),
              bookingId: booking.id,
              scheduleId: booking.scheduleId || null,
              noteId: relatedNote?.id || null,
              date: booking.scheduledDate,
              time: booking.scheduledTime,
              duration: booking.service?.durasiMenit || 60,
              service: booking.service?.nama || 'Konseling',
              status: this.normalizeStatus(booking.status),
              hasNotes: Boolean(relatedNote),
            };
          })
        : notes.map((note) => ({
            id: note.id,
            bookingId: null,
            scheduleId: note.scheduleId || null,
            noteId: note.id,
            date: note.schedule?.date || note.createdAt,
            time: note.schedule?.startTime || '',
            duration: note.schedule?.duration || 60,
            service: 'Konseling',
            status: 'completed',
            hasNotes: true,
          }));

    return {
      id: user.id,
      name: this.getPatientName(user),
      email: user.email,
      phone: user.userProfile?.phone || null,
      photo: null,
      age: null,
      gender: user.userProfile?.gender || null,
      address: user.userProfile?.fullAddress || null,

      firstSessionDate:
        bookings[bookings.length - 1]?.scheduledDate ||
        notes[notes.length - 1]?.createdAt ||
        null,

      lastSessionDate:
        bookings[0]?.scheduledDate || notes[0]?.createdAt || null,

      totalSessions: bookings.length || notes.length,

      upcomingSessionDate:
        bookings.find((booking) => this.isUpcomingStatus(booking.status))
          ?.scheduledDate || null,

      diagnosis: user.medicalRecord?.diagnosis || [],
      currentMedication: user.medicalRecord?.currentMedication || [],
      allergies: user.medicalRecord?.allergies || [],

      emergencyContact: user.emergencyContacts?.[0]
        ? {
            name: user.emergencyContacts[0].name,
            phone: user.emergencyContacts[0].phone,
            relation: user.emergencyContacts[0].relation,
          }
        : null,

      sessionHistory,

      lastNotes: notes[0]?.assessment || notes[0]?.subjective || null,
    };
  }

  async updateMedical(
    currentUser: any,
    patientId: string,
    dto: UpdatePatientMedicalDto,
  ) {
    await this.getPsychologistProfileId(currentUser.id);

    const user = await this.prisma.user.findUnique({
      where: { id: patientId },
    });

    if (!user) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    const medicalRecord = await this.prisma.patientMedicalRecord.upsert({
      where: { userId: patientId },
      update: {
        ...(dto.diagnosis !== undefined && { diagnosis: dto.diagnosis }),
        ...(dto.currentMedication !== undefined && {
          currentMedication: dto.currentMedication,
        }),
        ...(dto.allergies !== undefined && { allergies: dto.allergies }),
      },
      create: {
        userId: patientId,
        diagnosis: dto.diagnosis || [],
        currentMedication: dto.currentMedication || [],
        allergies: dto.allergies || [],
      },
    });

    return {
      message: 'Informasi medis pasien berhasil diperbarui',
      data: medicalRecord,
    };
  }

  async updateEmergencyContact(
    currentUser: any,
    patientId: string,
    dto: UpdateEmergencyContactDto,
  ) {
    await this.getPsychologistProfileId(currentUser.id);

    const user = await this.prisma.user.findUnique({
      where: { id: patientId },
    });

    if (!user) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    await this.prisma.emergencyContact.deleteMany({
      where: { userId: patientId },
    });

    const emergencyContact = await this.prisma.emergencyContact.create({
      data: {
        userId: patientId,
        name: dto.name,
        phone: dto.phone,
        relation: dto.relation,
      },
    });

    return {
      message: 'Kontak darurat pasien berhasil diperbarui',
      data: emergencyContact,
    };
  }
}