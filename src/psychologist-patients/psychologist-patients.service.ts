import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePatientMedicalDto } from './dto/update-patient-medical.dto';
import { UpdateEmergencyContactDto } from './dto/update-emergency-contact.dto';

@Injectable()
export class PsychologistPatientsService {
  constructor(private readonly prisma: PrismaService) {}

  private async getPsychologistProfileId(userId: string) {
    const profile: any = await this.prisma.psychologistProfile.findFirst({
      where: {
        OR: [{ userId }, { id: userId }],
      },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundException('Akun ini bukan psikolog');
    }

    return profile.id;
  }

  private getPatientName(user: any, cForm: any) {
    return cForm?.fullName || user?.userProfile?.fullName || user?.email || 'Pasien';
  }

  private readonly validPatientBookingStatuses = [
    'PENDING_DP',
    'WAITING_APPROVAL',
    'APPROVED',
    'FULLY_PAID',
    'COMPLETED',
  ] as const;

  private isUpcomingStatus(status: string) {
    return ['PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'FULLY_PAID'].includes(status);
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
      const uId = booking.userId;
      const cForm = booking.consultationForm as any;
      const uProf = (booking.user?.userProfile || {}) as any;

      const isOffline = Boolean(
        booking.user?.email?.endsWith('@oasejiwa.com') ||
        booking.notes?.toLowerCase().includes('offline') ||
        booking.notes?.toLowerCase().includes('psikolog') ||
        uProf?.notes?.toLowerCase().includes('offline')
      );

      const registrationType = isOffline ? 'OFFLINE' : 'ONLINE';

      if (!patientMap.has(uId)) {
        patientMap.set(uId, {
          id: uId,
          name: this.getPatientName(booking.user, cForm),
          fullName: this.getPatientName(booking.user, cForm),
          email: booking.user?.email || cForm?.email || '',
          phone: cForm?.phone || uProf?.phone || null,
          gender: cForm?.gender || uProf?.gender || null,
          birthday: cForm?.birthDate || uProf?.birthday || null,
          birthDate: cForm?.birthDate || uProf?.birthday || null,
          birthPlace: cForm?.birthPlace || uProf?.placeOfBirth || null,
          address: cForm?.address || cForm?.originalAddress || uProf?.fullAddress || null,
          alamat: cForm?.address || cForm?.originalAddress || uProf?.fullAddress || null,
          occupation: cForm?.occupation || uProf?.occupation || null,
          pekerjaan: cForm?.occupation || uProf?.occupation || null,
          maritalStatus: cForm?.maritalStatus || uProf?.maritalStatus || null,
          statusPernikahan: cForm?.maritalStatus || uProf?.maritalStatus || null,
          educationHistory: cForm?.educationHistory || uProf?.educationHistory || null,
          pendidikan: cForm?.educationHistory || uProf?.educationHistory || null,
          registrationType,
          firstSessionDate: booking.scheduledDate,
          lastSessionDate: booking.scheduledDate,
          totalSessions: 1,
          upcomingSessionDate: this.isUpcomingStatus(booking.status) ? booking.scheduledDate : null,
          notes: booking.notes || null,
          consultationForm: cForm,
          userProfile: uProf,
        });
      } else {
        const existing = patientMap.get(uId);
        existing.totalSessions += 1;
        if (isOffline) {
          existing.registrationType = 'OFFLINE';
        }
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
      const uId = note.userId;
      const uProf = (note.user?.userProfile || {}) as any;

      if (!patientMap.has(uId)) {
        patientMap.set(uId, {
          id: uId,
          name: uProf?.fullName || note.user?.email || 'Pasien',
          fullName: uProf?.fullName || note.user?.email || 'Pasien',
          email: note.user?.email || '',
          phone: uProf?.phone || null,
          gender: uProf?.gender || null,
          birthday: uProf?.birthday || null,
          birthDate: uProf?.birthday || null,
          birthPlace: uProf?.placeOfBirth || null,
          address: uProf?.fullAddress || null,
          alamat: uProf?.fullAddress || null,
          occupation: uProf?.occupation || null,
          pekerjaan: uProf?.occupation || null,
          maritalStatus: uProf?.maritalStatus || null,
          statusPernikahan: uProf?.maritalStatus || null,
          educationHistory: uProf?.educationHistory || null,
          pendidikan: uProf?.educationHistory || null,
          registrationType: 'OFFLINE',
          firstSessionDate: note.createdAt,
          lastSessionDate: note.createdAt,
          totalSessions: 1,
          upcomingSessionDate: null,
          notes: note.assessment || note.subjective || null,
          userProfile: uProf,
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

    const isOffline =
      targetUser.email?.endsWith('@oasejiwa.com') ||
      bookings.some((b) => b.notes?.toLowerCase().includes('offline')) ||
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
              date: booking.scheduledDate,
              time: booking.scheduledTime || '09:00 WIB',
              duration: booking.service?.durasiMenit || 60,
              service: booking.service?.nama || (isOffline ? 'Konseling Offline' : 'Konseling Online'),
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
            date: n.schedule?.date || n.createdAt,
            time: n.schedule?.startTime || '09:00 WIB',
            duration: n.schedule?.duration || 60,
            service: 'Konseling Offline',
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
      education: resolvedEdu,
      registrationType: isOffline ? 'OFFLINE' : 'ONLINE',

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

      consultationForm: cForm,
      userProfile: uProf,
      tesResults,
      notes,
      sessionHistory,
      sessionNotes: notes,
      lastNotes: notes[0]?.assessment || notes[0]?.subjective || null,
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
    const educationVal = dto.education || 'Perguruan Tinggi';

    // 1. Buat / Update Akun User & UserProfile
    if (!user) {
      const bcrypt = require('bcrypt');
      const hashedPassword = await bcrypt.hash('user123456', 10);
      user = await prismaAny.user.create({
        data: {
          email,
          role: 'USER',
          isEmailVerified: true,
          isProfileComplete: true,
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
              originalAddress: dto.address || null,
              birthday: parsedBirthday,
              maritalStatus: dto.maritalStatus || null,
              occupation: dto.occupation || null,
              educationHistory: educationVal,
              isFirstVisit: true,
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
          originalAddress: dto.address || user.userProfile.originalAddress,
          birthday: parsedBirthday || user.userProfile.birthday,
          maritalStatus: dto.maritalStatus || user.userProfile.maritalStatus,
          occupation: dto.occupation || user.userProfile.occupation,
          educationHistory: educationVal,
        },
      });
    }

    const userId = user.id;

    // 2. Kontak Darurat
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

    // 3. Rekam Medis Ringkas
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

    // 🟢 4. Cari Layanan Konseling yang Dipilih (atau fallback Konseling Individu)
    let selectedService: any = null;
    let defaultServiceId: any = 1;
    try {
      if (dto.serviceId) {
        selectedService = await prismaAny.layanan.findUnique({
          where: { id: Number(dto.serviceId) },
        });
      }

      if (!selectedService) {
        selectedService =
          (await prismaAny.layanan.findFirst({
            where: {
              nama: { contains: 'Individu', mode: 'insensitive' },
            },
          })) ||
          (await prismaAny.layanan.findFirst({
            where: {
              jenis: 'Konseling',
            },
          })) ||
          (await prismaAny.layanan.findFirst());
      }

      if (selectedService?.id) {
        defaultServiceId = selectedService.id;
      }
    } catch {
      defaultServiceId = 1;
    }

    const servicePrice = Number(selectedService?.harga || 0);
    const today = new Date();
    const bookingCode = `OJ-OFF-${Date.now().toString().slice(-6)}-${Math.random().toString(36).substring(2, 5).toUpperCase()}`;
    const orderId = `PAY-${bookingCode}`;
    const expiredAt = new Date(today.getTime() + 24 * 60 * 60 * 1000);

    // 🟢 5. Buat Booking dengan Catatan [OFFLINE]
    const booking: any = await prismaAny.booking.create({
      data: {
        bookingCode,
        userId,
        psychologistId,
        serviceId: defaultServiceId,
        scheduledDate: today,
        scheduledTime: dto.scheduledTime || '09:00 WIB',
        totalPrice: servicePrice,
        dpAmount: servicePrice,
        remainingAmount: 0,
        status: 'APPROVED',
        notes: dto.riskReason ? `[OFFLINE] ${dto.riskReason}` : '[OFFLINE] Pasien offline ditambahkan oleh psikolog',
        consultationForm: {
          create: {
            mainReason: dto.riskReason || 'Konsultasi Offline',
            takingPsychiatricMeds: false,
            problemDuration: 'ONE_TO_3_MONTHS',
            symptomFrequency: 'WEEKLY',
            dailyImpact: 'MILD',
            hasSimilarHistory: false,
            hasFamilyHistory: false,
            hasMedicalTreatment: false,
            hasTraumaticEvent: false,
            sleepQuality: 'GOOD',
            selfHarmThoughts: 'NEVER',
            usesAddictiveSubstances: false,
            eatingPattern: 'REGULAR',
            exerciseFrequency: 'SOMETIMES',
            stressLevel: 'MODERATE',
            consultationGoals: ['Evaluasi dan konseling klinis'],
            therapyPreference: 'COLLABORATIVE',
          },
        },
        payments: {
          create: {
            type: 'FULL_PAYMENT',
            amount: servicePrice,
            method: 'CASH',
            orderId,
            status: 'PAID',
            paidAt: today,
            expiredAt,
          },
        },
      },
    });

    // 6. Buat Rekam Medis Resmi Awal
    await prismaAny.officialMedicalRecord.create({
      data: {
        psychologistProfileId: psychologistId,
        userId,
        bookingId: booking.id,
        diagnosis: dto.diagnosis || 'Pemeriksaan awal mandiri',
        problemSummary: dto.riskReason || 'Pasien baru ditambahkan oleh psikolog',
        therapyApproach: 'Konseling Klinis',
        followUpPlan: 'CONTINUE_SESSION',
        riskLevel: dto.riskLevel ? dto.riskLevel.toUpperCase() : 'LOW',
        riskReason: dto.riskReason || null,
      },
    });

    return {
      id: userId,
      bookingId: booking.id,
      name: dto.name,
      fullName: dto.name,
      email,
      phone: dto.phone || null,
      gender: genderEnum,
      age: dto.age ? Number(dto.age) : 0,
      address: dto.address || null,
      birthday: parsedBirthday,
      maritalStatus: dto.maritalStatus || null,
      occupation: dto.occupation || null,
      education: educationVal,
      registrationType: 'OFFLINE',
      totalSessions: 1,
      upcomingSessionDate: today,
      firstSessionDate: today,
      lastSessionDate: today,
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

    return { message: 'Informasi medis pasien berhasil diperbarui', data: medicalRecord };
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

    return { message: 'Kontak darurat berhasil diperbarui', data: emergencyContact };
  }

  async deletePatient(currentUser: any, patientId: string) {
    const targetUser = await this.prisma.user.findUnique({ where: { id: patientId } });
    if (!targetUser) throw new NotFoundException('Pasien tidak ditemukan');

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