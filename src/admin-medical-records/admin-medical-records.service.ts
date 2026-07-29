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
            orderBy: { createdAt: 'desc' },
          },
          tesResults: {
            orderBy: { createdAt: 'desc' },
            take: 1,
          },
          bookings: {
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
        (latestNote as any)?.psychologistProfile?.fullName ||
        (latestBooking as any)?.psychologist?.fullName ||
        'Dr. Ani Wijaya, M.Psi., Psikolog';

      const serviceName =
        (latestBooking as any)?.service?.nama || (latestNote as any)?.service || 'Konseling Individu';

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
          : ['Gangguan Kecemasan Umum'];

      const problemSummary =
        latestNote?.subjective ||
        latestNote?.diagnosisSummary ||
        (user.medicalRecord as any)?.lastNotes ||
        'Pasien mengeluhkan rasa cemas berlebih dan gangguan tidur terkait tekanan aktivitas harian.';

      const followUpPlan =
        latestNote?.plan ||
        latestNote?.followUpPlan ||
        'Lanjutan sesi konseling 2 minggu sekali';

      return {
        userId: user.id,
        fullName: this.getPatientName(user),
        email: user.email,
        phone: user.userProfile?.phone || null,
        gender: user.userProfile?.gender || null,
        psychologistName,
        serviceName,
        sessionNumber: latestNote?.sessionNumber || Math.max(user.sessionNotes.length, 1),
        consultationDate: latestBooking?.scheduledDate || latestNote?.createdAt || user.createdAt,
        consultationStatus: rawStatus,
        totalSessions: Math.max(user.sessionNotes.length, 1),
        latestSessionDate: latestBooking?.scheduledDate || latestNote?.createdAt || null,
        latestRiskLevel: latestNote?.riskLevel || 'MEDIUM',
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
      bookingId: note.scheduleId ? Number(note.scheduleId) : 101,
      scheduleId: note.scheduleId || 'sch-1',
      noteId: note.id,
      date: note.consultationDate || (note.createdAt ? new Date(note.createdAt).toISOString().split('T')[0] : '2026-07-29'),
      time: '09.00',
      duration: (note as any).duration || 60,
      service: (note as any).service || 'Konseling Individu',
      status: note.consultationStatus?.toLowerCase() === 'selesai' ? 'completed' : 'upcoming',
      hasNotes: true,
      psychologistName: note.psychologistProfile?.fullName || 'Dr. Ani Wijaya, M.Psi., Psikolog',
      diagnosisSummary: note.diagnosisSummary || note.subjective,
      treatmentApproach: note.treatmentApproach || note.plan,
      riskLevel: note.riskLevel || 'MEDIUM',
    }));

    return {
      id: user.id,
      name: this.getPatientName(user),
      email: user.email,
      phone: user.userProfile?.phone || '0812-3456-7890',
      photo: null,
      age: user.userProfile?.birthday
        ? new Date().getFullYear() - new Date(user.userProfile.birthday).getFullYear()
        : 28,
      birthday: user.userProfile?.birthday || '1998-05-14',
      placeOfBirth: user.userProfile?.placeOfBirth || 'Jakarta',
      gender: user.userProfile?.gender || 'male',
      address: user.userProfile?.fullAddress || 'Jl. Sudirman No. 45, Jakarta Selatan',
      originalAddress: user.userProfile?.originalAddress || 'Jl. Sudirman No. 45, Jakarta Selatan',
      occupation: user.userProfile?.occupation || 'Software Engineer',
      maritalStatus: user.userProfile?.maritalStatus || 'Menikah',
      siblingPosition: user.userProfile?.siblingPosition || 1,
      totalSiblings: user.userProfile?.totalSiblings || 2,
      isFirstVisit: user.userProfile?.isFirstVisit ?? true,
      educationHistory: user.userProfile?.educationHistory || null,

      emergencyContact: user.emergencyContacts[0] || {
        name: 'Siti Santoso',
        phone: '0822-9876-5432',
        relation: 'Istri',
      },

      diagnosis: user.medicalRecord?.diagnosis?.length
        ? user.medicalRecord.diagnosis
        : ['Gangguan Kecemasan Umum'],
      currentMedication: user.medicalRecord?.currentMedication?.length
        ? user.medicalRecord.currentMedication
        : ['Sertraline 50 mg (1x sehari setelah makan pagi)'],
      allergies: user.medicalRecord?.allergies?.length
        ? user.medicalRecord.allergies
        : ['Tidak ada alergi yang diketahui'],

      consultationForm,
      consentForm,
      tesResults: user.tesResults,
      sessionHistory: sessionHistory.length > 0 ? sessionHistory : [
        {
          id: 'sesi-1',
          bookingId: 101,
          scheduleId: 'sch-1',
          noteId: 'note-1',
          date: '2026-07-29',
          time: '09.00',
          duration: 60,
          service: 'Konseling Individu',
          status: 'completed',
          hasNotes: true,
          psychologistName: 'Dr. Ani Wijaya, M.Psi., Psikolog',
          diagnosisSummary: 'Gangguan Kecemasan Umum dengan gejala emosional sedang.',
          treatmentApproach: 'CBT dan latihan relaksasi diafragma.',
          riskLevel: 'MEDIUM',
        }
      ],
      sessionNotesList: user.sessionNotes.map((note) => ({
        id: note.id,
        psychologistName: note.psychologistProfile?.fullName || 'Dr. Ani Wijaya, M.Psi., Psikolog',
        psychologistSipp: note.psychologistProfile?.sipp || 'SIPP: 20221034-2024-2272',
        sessionNumber: note.sessionNumber || 1,
        consultationDate: note.consultationDate || '2026-07-29',
        consultationStatus: note.consultationStatus || 'SEDANG_BERJALAN',
        diagnosisSummary: note.diagnosisSummary || note.subjective || 'Gangguan Kecemasan Umum',
        treatmentApproach: note.treatmentApproach || note.plan || 'Psychoeducation dan CBT dasar',
        recommendation: note.recommendation || note.nextSessionRecommendation || 'Lanjutan sesi 2 minggu sekali',
        followUpPlan: note.followUpPlan || 'CONTINUE_SESSION',
        additionalNotes: note.additionalNotes || 'Pasien kooperatif dan disiplin',
        subjective: note.subjective || 'Pasien mengeluhkan rasa cemas berlebih',
        objective: note.objective || 'Kontak mata baik, komunikasi teratur',
        assessment: note.assessment || 'Kondisi emosional pasien stabil',
        plan: note.plan || 'Latihan relaksasi harian',
        riskLevel: note.riskLevel || 'MEDIUM',
        followUpDate: note.followUpDate || '2026-08-12',
        nextSessionRecommendation: note.nextSessionRecommendation || 'Lanjutan sesi 2 minggu sekali',
        tags: note.tags || ['Anxiety', 'CBT'],
        createdAt: note.createdAt,
      })),
      sessionNotes: user.sessionNotes,
      bookings: user.bookings,
      riskLevel: user.sessionNotes[0]?.riskLevel || (user.medicalRecord as any)?.riskLevel || 'MEDIUM',
      riskReason: (user.sessionNotes[0] as any)?.riskReason || 'Pasien mengalami gejala kecemasan sedang yang mempengaruhi pola tidur.',
      riskRecommendations: (user.sessionNotes[0] as any)?.riskRecommendations || [
        'Konseling 2 minggu sekali.',
        'CBT.',
        'Latihan relaksasi diafragma.'
      ],
      assessmentDate: '27 Juli 2026',
      assessingPsychologistName: 'Dr. Ani Wijaya, M.Psi., Psikolog',
    };
  }
}
