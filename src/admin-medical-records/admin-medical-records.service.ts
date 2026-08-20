import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminMedicalRecordsService {
  constructor(private readonly prisma: PrismaService) {}

  private getPatientName(user: any) {
    return user?.userProfile?.fullName || user?.email || 'Pasien';
  }

  async getAllMedicalRecords(query: any) {
    const { search, riskLevel, page = 1, limit = 10 } = query;
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10;
    const skip = (pageNum - 1) * limitNum;

    // Get users with ROLE === 'USER'
    const whereUser: any = {
      role: 'USER',
      ...(search
        ? {
            OR: [
              { email: { contains: String(search), mode: 'insensitive' } },
              {
                userProfile: {
                  fullName: { contains: String(search), mode: 'insensitive' },
                },
              },
            ],
          }
        : {}),
    };

    const [total, users] = await Promise.all([
      this.prisma.user.count({ where: whereUser }),
      this.prisma.user.findMany({
        where: whereUser,
        skip,
        take: limitNum,
        include: {
          userProfile: true,
          medicalRecord: true,
          emergencyContacts: true,
          sessionNotes: {
            where: { deletedAt: null },
            include: {
              psychologistProfile: true,
            },
            orderBy: { createdAt: 'desc' },
          },
          tesResults: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          bookings: {
            include: {
              psychologist: true,
              service: true,
            },
            orderBy: { scheduledDate: 'desc' },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    const records = users.map((user) => {
      const latestNote = user.sessionNotes[0];
      const latestTes = user.tesResults[0];
      const latestBooking = user.bookings[0];

      const psychologistName =
        latestNote?.psychologistProfile?.fullName ||
        latestBooking?.psychologist?.fullName ||
        '';

      const serviceName =
        latestBooking?.service?.nama || (latestNote as any)?.service || 'Konseling Individu';

      const rawStatus =
        latestNote?.consultationStatus ||
        (latestBooking?.status === 'COMPLETED'
          ? 'SELESAI'
          : latestBooking?.status === 'CANCELLED'
          ? 'DIRUJUK'
          : 'SEDANG_BERJALAN');

      const diagnosisList =
        user.medicalRecord?.diagnosis && user.medicalRecord.diagnosis.length > 0
          ? user.medicalRecord.diagnosis
          : [];

      const problemSummary =
        latestNote?.subjective ||
        latestNote?.diagnosisSummary ||
        (user.medicalRecord as any)?.lastNotes ||
        '';

      const followUpPlan =
        latestNote?.plan ||
        latestNote?.followUpPlan ||
        '';

      return {
        userId: user.id,
        fullName: this.getPatientName(user),
        email: user.email,
        phone: user.userProfile?.phone || null,
        gender: user.userProfile?.gender || null,
        psychologistName,
        serviceName,
        sessionNumber: latestNote?.sessionNumber || (user.sessionNotes.length > 0 ? user.sessionNotes.length : 1),
        consultationDate: latestBooking?.scheduledDate || latestNote?.createdAt || user.createdAt,
        consultationStatus: rawStatus,
        totalSessions: user.sessionNotes.length,
        latestSessionDate: latestBooking?.scheduledDate || latestNote?.createdAt || null,
        latestRiskLevel: latestNote?.riskLevel || 'LOW',
        diagnosis: diagnosisList.join(', '),
        diagnosisList,
        problemSummary,
        followUpPlan,
        latestTesName: latestTes?.namaTes || null,
        latestTesCategory: latestTes?.kategoriNama || null,
        latestTesScore: latestTes ? `${latestTes.totalScore}/${latestTes.maxScore} (${Math.round(latestTes.percentage)}%)` : null,
        hasMedicalRecord: Boolean(latestNote || user.medicalRecord || latestTes),
        createdAt: user.createdAt,
      };
    });

    return {
      records,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    };
  }

  async getPatientMedicalRecord(patientId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: patientId },
      include: {
        userProfile: true,
        medicalRecord: true,
        emergencyContacts: true,
        tesResults: {
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
        },
        sessionNotes: {
          where: { deletedAt: null },
          include: {
            psychologistProfile: true,
            schedule: true,
          },
          orderBy: { createdAt: 'desc' },
        },
        bookings: {
          include: {
            consultationForm: true,
            consentForm: true,
            psychologist: true,
            service: true,
          },
          orderBy: { scheduledDate: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException('Pasien tidak ditemukan');
    }

    const latestBooking = user.bookings[0];
    const consultationForm = user.bookings.find((b) => b.consultationForm)?.consultationForm || null;
    const consentForm = user.bookings.find((b) => b.consentForm)?.consentForm || null;

    const sessionHistory = user.sessionNotes.map((note) => ({
      id: note.id,
      bookingId: note.scheduleId ? Number(note.scheduleId) : null,
      scheduleId: note.scheduleId || null,
      noteId: note.id,
      date: note.consultationDate || (note.createdAt ? new Date(note.createdAt).toISOString().split('T')[0] : null),
      time: note.schedule?.startTime || '',
      duration: (note as any).duration || 60,
      service: (note as any).service || 'Konseling Individu',
      status: note.consultationStatus?.toLowerCase() === 'completed' || note.consultationStatus?.toLowerCase() === 'selesai' ? 'completed' : 'upcoming',
      hasNotes: true,
      psychologistName: note.psychologistProfile?.fullName || '',
      diagnosisSummary: note.diagnosisSummary || note.subjective || '',
      treatmentApproach: note.treatmentApproach || note.plan || '',
      riskLevel: note.riskLevel || 'LOW',
    }));

    const activePsychologist = user.sessionNotes[0]?.psychologistProfile || null;

    return {
      id: user.id,
      name: this.getPatientName(user),
      email: user.email,
      phone: user.userProfile?.phone || null,
      photo: null,
      age: user.userProfile?.birthday
        ? new Date().getFullYear() - new Date(user.userProfile.birthday).getFullYear()
        : null,
      birthday: user.userProfile?.birthday || null,
      placeOfBirth: user.userProfile?.placeOfBirth || null,
      gender: user.userProfile?.gender || null,
      address: user.userProfile?.fullAddress || null,
      originalAddress: user.userProfile?.originalAddress || null,
      occupation: user.userProfile?.occupation || null,
      maritalStatus: user.userProfile?.maritalStatus || null,
      siblingPosition: user.userProfile?.siblingPosition || null,
      totalSiblings: user.userProfile?.totalSiblings || null,
      isFirstVisit: user.userProfile?.isFirstVisit ?? true,
      educationHistory: user.userProfile?.educationHistory || null,

      emergencyContact: user.emergencyContacts[0]
        ? {
            name: user.emergencyContacts[0].name,
            phone: user.emergencyContacts[0].phone,
            relation: user.emergencyContacts[0].relation,
          }
        : null,

      diagnosis: user.medicalRecord?.diagnosis || [],
      currentMedication: user.medicalRecord?.currentMedication || [],
      allergies: user.medicalRecord?.allergies || [],

      consultationForm,
      consentForm,
      tesResults: user.tesResults,
      sessionHistory,
      sessionNotesList: user.sessionNotes.map((note) => ({
        id: note.id,
        psychologistName: note.psychologistProfile?.fullName || '',
        psychologistSipp: note.psychologistProfile?.sipp || '',
        psychologistStr: note.psychologistProfile?.str || '',
        signatureUrl: note.psychologistProfile?.signatureUrl || null,
        signatureUpdatedAt: note.psychologistProfile?.signatureUpdatedAt || null,
        signatureMethod: note.psychologistProfile?.signatureMethod || 'UPLOAD',
        psychologistProfile: note.psychologistProfile || null,
        psychologist: note.psychologistProfile
          ? {
              id: note.psychologistProfile.id,
              fullName: note.psychologistProfile.fullName,
              name: note.psychologistProfile.fullName,
              sipp: note.psychologistProfile.sipp,
              str: note.psychologistProfile.str,
              signatureUrl: note.psychologistProfile.signatureUrl,
              signatureUpdatedAt: note.psychologistProfile.signatureUpdatedAt,
              signatureMethod: note.psychologistProfile.signatureMethod || 'UPLOAD',
            }
          : null,
        sessionNumber: note.sessionNumber || 1,
        consultationDate: note.consultationDate || null,
        consultationStatus: note.consultationStatus || 'ONGOING',
        diagnosisSummary: note.diagnosisSummary || '',
        treatmentApproach: note.treatmentApproach || note.plan || '',
        recommendation: note.recommendation || note.nextSessionRecommendation || '',
        followUpPlan: note.followUpPlan || 'CONTINUE_SESSION',
        additionalNotes: note.additionalNotes || '',
        subjective: note.subjective || '',
        objective: note.objective || '',
        assessment: note.assessment || '',
        plan: note.plan || '',
        riskLevel: note.riskLevel || 'LOW',
        followUpDate: note.followUpDate || null,
        nextSessionRecommendation: note.nextSessionRecommendation || '',
        tags: note.tags || [],
        createdAt: note.createdAt,
      })),
      sessionNotes: user.sessionNotes,
      bookings: user.bookings,
      psychologistProfile: activePsychologist,
      psychologist: activePsychologist
        ? {
            id: activePsychologist.id,
            fullName: activePsychologist.fullName,
            name: activePsychologist.fullName,
            sipp: activePsychologist.sipp,
            str: activePsychologist.str,
            signatureUrl: activePsychologist.signatureUrl,
            signatureUpdatedAt: activePsychologist.signatureUpdatedAt,
            signatureMethod: activePsychologist.signatureMethod || 'UPLOAD',
          }
        : null,
      signatureUrl: activePsychologist?.signatureUrl || null,
      signatureUpdatedAt: activePsychologist?.signatureUpdatedAt || null,
      signatureMethod: activePsychologist?.signatureMethod || 'UPLOAD',
      riskLevel: user.sessionNotes[0]?.riskLevel || (user.medicalRecord as any)?.riskLevel || 'LOW',
      riskReason: (user.sessionNotes[0] as any)?.riskReason || '',
      riskRecommendations: (user.sessionNotes[0] as any)?.riskRecommendations || [],
      assessmentDate: user.sessionNotes[0]?.createdAt || null,
      assessingPsychologistName: activePsychologist?.fullName || '',
    };
  }
}
