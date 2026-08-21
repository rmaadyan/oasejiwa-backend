import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePatientMedicalDto } from './dto/update-patient-medical.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

@Injectable()
export class PsychologistPatientsService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPsychologistProfileId(userId: string) {
    const profile: any = await this.prisma.psychologistProfile.findUnique({
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
    'CONFIRMED',
    'UPCOMING',
  ] as const;

  private isUpcomingStatus(status: string) {
    return ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID', 'CONFIRMED', 'UPCOMING'].includes(
      status,
    );
  }

  private normalizeStatus(status: string) {
    if (status === 'COMPLETED') return 'completed';
    if (status === 'CANCELLED' || status === 'REJECTED') return 'cancelled';
    return 'upcoming';
  }

  async getAll(currentUser: any, query: any) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);
    const { search, sortBy = 'name' } = query;

    const patientMap = new Map<string, any>();

    // 1. Fetch bookings
    const bookings: any[] = await this.prisma.booking.findMany({
      where: {
        psychologistId,
        status: { in: this.validPatientBookingStatuses as any },
      },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        consultationForm: true,
        service: true,
      },
      orderBy: { scheduledDate: 'desc' },
    });

    for (const booking of bookings) {
      const existing = patientMap.get(booking.userId);
      const cForm = booking.consultationForm as any;
      const uProf = booking.user?.userProfile as any;
      const isOfflineRegistration =
        booking.notes?.includes('offline') ||
        booking.notes?.includes('ditambahkan oleh psikolog');

      if (!existing) {
        patientMap.set(booking.userId, {
          id: booking.userId,
          name: cForm?.fullName || this.getPatientName(booking.user),
          email: cForm?.email || booking.user?.email || '',
          phone: cForm?.phone || uProf?.phone || null,
          photo: null,
          gender: cForm?.gender || uProf?.gender || null,
          birthday: cForm?.birthDate || uProf?.birthday || null,
          placeOfBirth: cForm?.birthPlace || uProf?.placeOfBirth || null,
          address: cForm?.address || cForm?.originalAddress || uProf?.fullAddress || null,
          occupation: cForm?.occupation || uProf?.occupation || null,
          maritalStatus: cForm?.maritalStatus || uProf?.maritalStatus || null,
          educationHistory: cForm?.educationHistory || uProf?.educationHistory || null,
          registrationType: isOfflineRegistration ? 'OFFLINE' : 'ONLINE',
          firstSessionDate: booking.scheduledDate,
          lastSessionDate: booking.scheduledDate,
          totalSessions: 1,
          upcomingSessionDate: this.isUpcomingStatus(booking.status) ? booking.scheduledDate : null,
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
          (!existing.upcomingSessionDate || booking.scheduledDate < existing.upcomingSessionDate)
        ) {
          existing.upcomingSessionDate = booking.scheduledDate;
        }
      }
    }

    // 2. Fetch session notes
    const notes: any[] = await this.prisma.sessionNote.findMany({
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
      orderBy: { createdAt: 'desc' },
    });

    for (const note of notes) {
      const existing = patientMap.get(note.userId);
      const uProf = note.user?.userProfile as any;

      if (!existing) {
        patientMap.set(note.userId, {
          id: note.userId,
          name: this.getPatientName(note.user),
          email: note.user?.email || '',
          phone: uProf?.phone || null,
          photo: null,
          gender: uProf?.gender || null,
          birthday: uProf?.birthday || null,
          placeOfBirth: uProf?.placeOfBirth || null,
          address: uProf?.fullAddress || null,
          occupation: uProf?.occupation || null,
          maritalStatus: uProf?.maritalStatus || null,
          registrationType: 'OFFLINE',
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

    // 3. Fetch official medical records
    const officialRecords: any[] = await this.prisma.officialMedicalRecord.findMany({
      where: { psychologistProfileId: psychologistId },
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    for (const rec of officialRecords) {
      const existing = patientMap.get(rec.userId);
      const uProf = rec.user?.userProfile as any;

      if (!existing) {
        patientMap.set(rec.userId, {
          id: rec.userId,
          name: this.getPatientName(rec.user),
          email: rec.user?.email || '',
          phone: uProf?.phone || null,
          photo: null,
          gender: uProf?.gender || null,
          birthday: uProf?.birthday || null,
          placeOfBirth: uProf?.placeOfBirth || null,
          address: uProf?.fullAddress || null,
          occupation: uProf?.occupation || null,
          maritalStatus: uProf?.maritalStatus || null,
          registrationType: 'OFFLINE',
          firstSessionDate: rec.createdAt,
          lastSessionDate: rec.createdAt,
          totalSessions: 1,
          upcomingSessionDate: null,
          notes: rec.problemSummary || null,
        });
      }
    }

    let patients = Array.from(patientMap.values());

    if (search) {
      const keyword = String(search).toLowerCase();
      patients = patients.filter(
        (p) => p.name.toLowerCase().includes(keyword) || p.email.toLowerCase().includes(keyword),
      );
    }

    if (sortBy === 'name') {
      patients.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortBy === 'lastSession') {
      patients.sort(
        (a, b) => new Date(b.lastSessionDate).getTime() - new Date(a.lastSessionDate).getTime(),
      );
    }
    if (sortBy === 'totalSessions') {
      patients.sort((a, b) => b.totalSessions - a.totalSessions);
    }

    const patientIds = patients.map((p) => p.id);
    if (patientIds.length > 0) {
      const allTesResults: any[] = await this.prisma.tesResult.findMany({
        where: { userId: { in: patientIds } },
        orderBy: { createdAt: 'desc' },
      });

      const latestTesMap = new Map<string, any>();
      for (const tr of allTesResults) {
        if (!latestTesMap.has(tr.userId)) {
          latestTesMap.set(tr.userId, tr);
        }
      }

      const sessionNotes: any[] = await this.prisma.sessionNote.findMany({
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

      for (const p of patients) {
        const latestTes = latestTesMap.get(p.id);
        const latestNote = latestNoteMap.get(p.id);

        if (latestTes) {
          p.latestTesName = latestTes.namaTes || 'DASS-21';
          p.latestTesCategory = latestTes.kategoriNama || 'Normal';
          p.latestTesScore = `${latestTes.totalScore}/${latestTes.maxScore} (${Math.round(latestTes.percentage)}%)`;
          p.latestTesDate = latestTes.createdAt;
          p.latestTes = p.latestTesName;
        }

        if (latestNote) {
          p.latestRiskLevel = latestNote.riskLevel?.toLowerCase() || 'medium';
          p.hasSessionNotes = true;
        }
      }
    }

    return {
      patients,
      total: patients.length,
      activeCount: patients.filter((p) => p.upcomingSessionDate).length,
      inactiveCount: patients.filter((p) => !p.upcomingSessionDate).length,
    };
  }

  async getById(currentUser: any, patientId: string) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);

    const targetUser: any = await this.prisma.user.findFirst({
      where: {
        OR: [{ id: patientId }, { email: patientId }],
      },
      include: {
        userProfile: true,
        medicalRecord: true,
        emergencyContacts: true,
      },
    });

    if (!targetUser) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    const resolvedPatientId = targetUser.id;

    const bookings: any[] = await this.prisma.booking.findMany({
      where: {
        psychologistId,
        userId: resolvedPatientId,
      },
      include: {
        service: true,
        payments: true,
        schedule: true,
        consultationForm: true,
      },
      orderBy: { scheduledDate: 'desc' },
    });

    const notes: any[] = await this.prisma.sessionNote.findMany({
      where: {
        psychologistProfileId: psychologistId,
        userId: resolvedPatientId,
        deletedAt: null,
      },
      include: {
        schedule: true,
        psychologistProfile: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const tesResults: any[] = await this.prisma.tesResult.findMany({
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

    const consultationForm: any =
      bookings.find((b) => b.consultationForm)?.consultationForm ||
      (await this.prisma.consultationForm.findFirst({
        where: { booking: { userId: resolvedPatientId } },
        orderBy: { createdAt: 'desc' },
      }));

    const uProf = (targetUser.userProfile || {}) as any;
    const cForm = (consultationForm || {}) as any;

    const isOfflineRegistration =
      bookings.some((b) => b.notes?.includes('offline') || b.notes?.includes('ditambahkan oleh psikolog')) ||
      (!consultationForm && bookings.length === 0);

    const sessionHistory =
      bookings.length > 0
        ? bookings.map((booking) => {
            const relatedNote = notes.find(
              (n) =>
                (n.scheduleId && booking.scheduleId && n.scheduleId === booking.scheduleId) ||
                (n.scheduleId && booking.schedule?.id && n.scheduleId === booking.schedule.id),
            );

            return {
              id: String(booking.id),
              bookingId: booking.id,
              scheduleId: booking.scheduleId || null,
              noteId: relatedNote?.id || null,
              date: booking.scheduledDate,
              time: booking.scheduledTime || '09:00 WIB',
              duration: booking.service?.durasiMenit || 60,
              service: booking.service?.nama || (isOfflineRegistration ? 'Konseling Offline (Klinik)' : 'Konseling Online'),
              status: this.normalizeStatus(booking.status),
              hasNotes: Boolean(relatedNote),
              subjective: relatedNote?.subjective || null,
              assessment: relatedNote?.assessment || null,
              plan: relatedNote?.plan || null,
            };
          })
        : notes.map((n) => ({
            id: n.id,
            bookingId: null,
            scheduleId: n.scheduleId || null,
            noteId: n.id,
            date: n.schedule?.date || n.createdAt,
            time: n.schedule?.startTime || '09:00 WIB',
            duration: n.schedule?.duration || 60,
            service: 'Konseling Offline (Klinik)',
            status: 'completed',
            hasNotes: true,
            subjective: n.subjective,
            assessment: n.assessment,
            plan: n.plan,
          }));

    const resolvedName = cForm?.fullName || uProf?.fullName || targetUser.email || 'Pasien';
    const resolvedPhone = cForm?.phone || uProf?.phone || null;
    const resolvedGender = cForm?.gender || uProf?.gender || null;
    const resolvedBirthday = cForm?.birthDate || uProf?.birthday || null;
    const resolvedPlaceOfBirth = cForm?.birthPlace || uProf?.placeOfBirth || null;
    const resolvedAddress = cForm?.address || cForm?.originalAddress || uProf?.fullAddress || null;
    const resolvedOccupation = cForm?.occupation || uProf?.occupation || null;
    const resolvedMarital = cForm?.maritalStatus || uProf?.maritalStatus || null;
    const resolvedEdu = cForm?.educationHistory || uProf?.educationHistory || null;

    let calculatedAge: number | null = null;
    if (resolvedBirthday) {
      const bDate = new Date(resolvedBirthday);
      if (!Number.isNaN(bDate.getTime())) {
        calculatedAge = new Date().getFullYear() - bDate.getFullYear();
      }
    }

    return {
      id: targetUser.id,
      name: resolvedName,
      fullName: resolvedName,
      email: cForm?.email || targetUser.email,
      phone: resolvedPhone,
      photo: null,
      age: calculatedAge,
      gender: resolvedGender,
      birthday: resolvedBirthday,
      birthDate: resolvedBirthday,
      birthPlace: resolvedPlaceOfBirth,
      placeOfBirth: resolvedPlaceOfBirth,
      address: resolvedAddress,
      alamat: resolvedAddress,
      occupation: resolvedOccupation,
      pekerjaan: resolvedOccupation,
      maritalStatus: resolvedMarital,
      statusPernikahan: resolvedMarital,
      educationHistory: resolvedEdu,
      pendidikan: resolvedEdu,
      registrationType: isOfflineRegistration ? 'OFFLINE' : 'ONLINE',
      siblingPosition: cForm?.siblingPosition || uProf?.siblingPosition || null,
      totalSiblings: cForm?.totalSiblings || uProf?.totalSiblings || null,
      isFirstVisit: cForm?.isFirstVisit ?? uProf?.isFirstVisit ?? true,

      firstSessionDate: bookings[bookings.length - 1]?.scheduledDate || notes[notes.length - 1]?.createdAt || null,
      lastSessionDate: bookings[0]?.scheduledDate || notes[0]?.createdAt || null,
      totalSessions: Math.max(bookings.length, notes.length, 1),
      upcomingSessionDate: bookings.find((b) => this.isUpcomingStatus(b.status))?.scheduledDate || null,

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
      sessionNotes: notes,
      lastNotes: notes[0]?.assessment || notes[0]?.subjective || null,
    };
  }

  async updateMedical(currentUser: any, patientId: string, dto: UpdatePatientMedicalDto) {
    await this.getPsychologistProfileId(currentUser.id);

    const user: any = await this.prisma.user.findUnique({ where: { id: patientId } });
    if (!user) throw new NotFoundException('Pasien tidak ditemukan');

    const medicalRecord = await this.prisma.patientMedicalRecord.upsert({
      where: { userId: patientId },
      update: {
        ...(dto.diagnosis !== undefined && { diagnosis: dto.diagnosis }),
        ...(dto.currentMedication !== undefined && { currentMedication: dto.currentMedication }),
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

  async updateEmergencyContact(currentUser: any, patientId: string, dto: UpdateEmergencyContactDto) {
    await this.getPsychologistProfileId(currentUser.id);

    const user: any = await this.prisma.user.findUnique({ where: { id: patientId } });
    if (!user) throw new NotFoundException('Pasien tidak ditemukan');

    await this.prisma.emergencyContact.deleteMany({ where: { userId: patientId } });

    const emergencyContact = await this.prisma.emergencyContact.create({
      data: {
        userId: patientId,
        name: dto.name,
        phone: dto.phone,
        relation: dto.relation,
      },
    });

    return {
      message: 'Kontak darurat berhasil diperbarui',
      data: emergencyContact,
    };
  }

  async createPatient(currentUser: any, dto: any) {
    const psychologistId = await this.getPsychologistProfileId(currentUser.id);
    const email = (dto.email || `pasien-${Date.now()}@oasejiwa.com`).trim().toLowerCase();

    const prismaAny = this.prisma as any;

    let user: any = await prismaAny.user.findUnique({
      where: { email },
      include: { userProfile: true },
    });

    const parsedBirthday = dto.birthday ? new Date(dto.birthday) : null;
    const genderEnum = dto.gender === 'male' || dto.gender === 'MALE' ? 'MALE' : 'FEMALE';

    if (!user) {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('user123456', 10);
      user = await prismaAny.user.create({
        data: {
          email,
          role: 'USER',
          isEmailVerified: true,
          authProvider: {
            create: {
              provider: 'EMAIL',
              passwordHash: hashedPassword,
            },
          },
          userProfile: {
            create: {
              fullName: dto.name || 'Pasien Baru',
              phone: dto.phone || null,
              gender: genderEnum,
              fullAddress: dto.address || null,
              birthday: parsedBirthday,
              maritalStatus: dto.maritalStatus || null,
              occupation: dto.occupation || null,
            },
          },
        },
        include: { userProfile: true },
      });
    } else if (user.userProfile) {
      await prismaAny.userProfile.update({
        where: { userId: user.id },
        data: {
          fullName: dto.name || user.userProfile.fullName,
          phone: dto.phone || user.userProfile.phone,
          gender: genderEnum,
          fullAddress: dto.address || user.userProfile.fullAddress,
          birthday: parsedBirthday || user.userProfile.birthday,
          maritalStatus: dto.maritalStatus || user.userProfile.maritalStatus,
          occupation: dto.occupation || user.userProfile.occupation,
        },
      });
    }

    const userId = user.id;

    if (dto.emergencyContactName) {
      await prismaAny.emergencyContact.deleteMany({ where: { userId } });
      await prismaAny.emergencyContact.create({
        data: {
          userId,
          name: dto.emergencyContactName,
          phone: dto.emergencyContactPhone || '-',
          relation: dto.emergencyContactRelation || '-',
        },
      });
    }

    await prismaAny.patientMedicalRecord.upsert({
      where: { userId },
      update: {
        diagnosis: dto.diagnosis ? [dto.diagnosis] : ['Pemeriksaan Awal'],
      },
      create: {
        userId,
        diagnosis: dto.diagnosis ? [dto.diagnosis] : ['Pemeriksaan Awal'],
        currentMedication: [],
        allergies: [],
      },
    });

    // 🟢 BAGIAN SERVICE & BOOKING YANG SUDAH DIPERBAIKI (BEBAS ERROR TYPE)
    let defaultServiceId: any = 1;
    try {
      const foundService =
        (await prismaAny.service?.findFirst()) ||
        (await prismaAny.counselingService?.findFirst()) ||
        (await prismaAny.layanan?.findFirst());
      if (foundService?.id) {
        defaultServiceId = foundService.id;
      }
    } catch {
      defaultServiceId = 1;
    }

    const today = new Date();
    today.setHours(9, 0, 0, 0);

    const bookingData: any = {
      userId,
      psychologistId,
      serviceId: defaultServiceId,
      scheduledDate: today,
      scheduledTime: '09:00 WIB',
      status: 'APPROVED',
      paymentStatus: 'PAID',
      notes: dto.riskReason || 'Pasien offline ditambahkan oleh psikolog',
      consultationForm: {
        create: {
          fullName: dto.name || 'Pasien Baru',
          email,
          phone: dto.phone || '-',
          gender: genderEnum,
          birthDate: parsedBirthday || today,
          birthPlace: 'Malang',
          address: dto.address || 'Malang',
          occupation: dto.occupation || '-',
          maritalStatus: dto.maritalStatus || '-',
          isFirstVisit: true,
        },
      },
    };

    const booking: any = await prismaAny.booking.create({
      data: bookingData,
    });

    await prismaAny.officialMedicalRecord.create({
      data: {
        psychologistProfileId: psychologistId,
        userId,
        diagnosis: dto.diagnosis || 'Pemeriksaan awal mandiri',
        problemSummary: dto.riskReason || 'Pasien baru ditambahkan oleh psikolog',
        therapyApproach: 'Konseling Klinis',
        followUpPlan: 'Sesi lanjutan terencana',
      },
    });

    return {
      id: userId,
      bookingId: booking.id,
      name: dto.name,
      email,
      phone: dto.phone || null,
      gender: genderEnum,
      age: dto.age ? Number(dto.age) : 0,
      address: dto.address || null,
      birthday: parsedBirthday,
      maritalStatus: dto.maritalStatus || null,
      occupation: dto.occupation || null,
      registrationType: 'OFFLINE',
      totalSessions: 1,
      upcomingSessionDate: today,
      firstSessionDate: today,
      lastSessionDate: today,
    };
  }

  async deletePatient(currentUser: any, patientId: string) {
    const targetUser = await this.prisma.user.findUnique({
      where: { id: patientId },
    });

    if (!targetUser) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.officialMedicalRecord.deleteMany({ where: { userId: patientId } });
      await tx.sessionNote.deleteMany({ where: { userId: patientId } });
      await tx.patientMedicalRecord.deleteMany({ where: { userId: patientId } });
      await tx.emergencyContact.deleteMany({ where: { userId: patientId } });
      await tx.consultationForm.deleteMany({ where: { booking: { userId: patientId } } });
      await tx.payment.deleteMany({ where: { booking: { userId: patientId } } });
      await tx.booking.deleteMany({ where: { userId: patientId } });
      await tx.userProfile.deleteMany({ where: { userId: patientId } });
      await tx.user.delete({ where: { id: patientId } });
    });

    return { message: 'Pasien berhasil dihapus secara permanen dari rekam medis' };
  }
}