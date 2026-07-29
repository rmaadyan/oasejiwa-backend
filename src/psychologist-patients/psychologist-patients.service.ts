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

  private readonly validPatientBookingStatuses = [
    'APPROVED',
    'FULLY_PAID',
    'COMPLETED',
  ] as const;

  private isUpcomingStatus(status: string) {
    return ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'].includes(
      status,
    );
  }

  private isPatientBookingStatus(status: string) {
    return this.validPatientBookingStatuses.includes(status as any);
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
        status: {
          in: this.validPatientBookingStatuses as any,
        },
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

    const validPatientBookings = bookings.filter((booking) =>
      this.isPatientBookingStatus(booking.status),
    );

    if (validPatientBookings.length > 0) {
      const patientMap = new Map<string, any>();
 
      for (const booking of validPatientBookings) {
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
 
          if (!existing.notes && booking.notes) {
            existing.notes = booking.notes;
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
 
          if (!existing.notes && (note.assessment || note.subjective)) {
            existing.notes = note.assessment || note.subjective;
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

    // Enrich patients with latest tes result data
    const patientIds = patients.map((p) => p.id);
    if (patientIds.length > 0) {
      const allTesResults = await this.prisma.tesResult.findMany({
        where: { userId: { in: patientIds } },
        orderBy: { createdAt: 'desc' },
      });

      const latestTesMap = new Map<string, any>();
      for (const tr of allTesResults) {
        if (!latestTesMap.has(tr.userId)) {
          latestTesMap.set(tr.userId, tr);
        }
      }

      const sessionNotes = await this.prisma.sessionNote.findMany({
        where: {
          psychologistProfileId: psychologistId,
          userId: { in: patientIds },
          deletedAt: null,
        },
        orderBy: { createdAt: 'desc' },
      });

      const latestNoteMap = new Map<string, any>();
      for (const note of sessionNotes) {
        if (!latestNoteMap.has(note.userId)) {
          latestNoteMap.set(note.userId, note);
        }
      }

      for (const patient of patients) {
        const latestTes = latestTesMap.get(patient.id);
        const latestNote = latestNoteMap.get(patient.id);

        if (latestTes) {
          patient.latestTesName = latestTes.namaTes;
          patient.latestTesCategory = latestTes.kategoriNama;
          patient.latestTesScore = `${latestTes.totalScore}/${latestTes.maxScore} (${Math.round(latestTes.percentage)}%)`;
        }

        if (latestNote) {
          patient.latestRiskLevel = latestNote.riskLevel?.toLowerCase() || 'medium';
          patient.hasSessionNotes = true;
        }
      }
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

    // 1. Try to find user by id directly or fallback to first matching user
    let targetUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { id: patientId },
          { email: patientId },
        ],
      },
      include: {
        userProfile: true,
        medicalRecord: true,
        emergencyContacts: true,
      },
    });

    if (!targetUser) {
      const allUsers = await this.prisma.user.findMany({
        where: { role: 'USER' },
        include: {
          userProfile: true,
          medicalRecord: true,
          emergencyContacts: true,
        },
        orderBy: { createdAt: 'asc' },
      });

      const numIndex = parseInt(patientId, 10);
      if (!isNaN(numIndex) && numIndex > 0 && allUsers[numIndex - 1]) {
        targetUser = allUsers[numIndex - 1];
      } else if (allUsers.length > 0) {
        targetUser = allUsers[0];
      }
    }

    if (!targetUser) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    const resolvedPatientId = targetUser.id;

    const bookings = await this.prisma.booking.findMany({
      where: {
        psychologistId,
        userId: resolvedPatientId,
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
        userId: resolvedPatientId,
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

    const tesResults = await this.prisma.tesResult.findMany({
      where: { userId: resolvedPatientId },
      include: {
        tes: {
          select: {
            id: true,
            nama: true,
            jenis: true,
            deskripsi: true,
            penjelasanHasil: true,
            kategori: true,
            sectionKategori: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    const consultationForm = await this.prisma.consultationForm.findFirst({
      where: { booking: { userId: resolvedPatientId } },
      orderBy: { createdAt: 'desc' },
    });

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
      id: targetUser.id,
      name: this.getPatientName(targetUser),
      email: targetUser.email,
      phone: targetUser.userProfile?.phone || null,
      photo: null,
      age: targetUser.userProfile?.birthday
        ? new Date().getFullYear() - new Date(targetUser.userProfile.birthday).getFullYear()
        : null,
      gender: targetUser.userProfile?.gender || null,
      birthday: targetUser.userProfile?.birthday || null,
      placeOfBirth: targetUser.userProfile?.placeOfBirth || null,
      address: targetUser.userProfile?.fullAddress || null,
      originalAddress: targetUser.userProfile?.originalAddress || null,
      occupation: targetUser.userProfile?.occupation || null,
      maritalStatus: targetUser.userProfile?.maritalStatus || null,
      siblingPosition: targetUser.userProfile?.siblingPosition || null,
      totalSiblings: targetUser.userProfile?.totalSiblings || null,
      isFirstVisit: targetUser.userProfile?.isFirstVisit ?? true,
      educationHistory: targetUser.userProfile?.educationHistory || null,

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

      diagnosis: targetUser.medicalRecord?.diagnosis || [],
      currentMedication: targetUser.medicalRecord?.currentMedication || [],
      allergies: targetUser.medicalRecord?.allergies || [],

      emergencyContact: targetUser.emergencyContacts?.[0]
        ? {
            name: targetUser.emergencyContacts[0].name,
            phone: targetUser.emergencyContacts[0].phone,
            relation: targetUser.emergencyContacts[0].relation,
          }
        : null,

      consultationForm,
      tesResults,
      notes,
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