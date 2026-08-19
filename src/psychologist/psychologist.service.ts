import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PsychologistService {
  private readonly logger = new Logger(PsychologistService.name);
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  private async getOrCreateProfile(userIdOrProfileId: string) {
    let profile = await this.prisma.psychologistProfile.findFirst({
      where: {
        OR: [
          { userId: userIdOrProfileId },
          { id: userIdOrProfileId },
        ],
      },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
            userProfile: {
              select: {
                phone: true,
                fullName: true,
              },
            },
          },
        },
      },
    });

    if (!profile) {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [
            { id: userIdOrProfileId },
            { psychologistProfile: { id: userIdOrProfileId } },
          ],
        },
        include: { userProfile: true },
      });

      if (!user) {
        throw new NotFoundException('User / Psikolog tidak ditemukan');
      }

      profile = await this.prisma.psychologistProfile.create({
        data: {
          userId: user.id,
          fullName: user.userProfile?.fullName || 'Psikolog Oase Jiwa',
          about: 'Psikolog Klinik Oase Jiwa',
          sipp: '-',
          str: '-',
        },
        include: {
          user: {
            select: {
              email: true,
              createdAt: true,
              userProfile: {
                select: {
                  phone: true,
                  fullName: true,
                },
              },
            },
          },
        },
      });
    }

    return profile;
  }

  private filterOnlyApprovedBookings(bookings: any[]) {
    return bookings.filter((b: any) => {
      const bStatus = String(b.status || '').toUpperCase();
      const hasApprovedPayment = b.payments?.some((p: any) => {
        const pStatus = String(p.status || '').toUpperCase();
        return (
          pStatus === 'APPROVED' ||
          pStatus === 'SUCCESS' ||
          pStatus === 'PAID'
        );
      });

      return (
        bStatus === 'APPROVED' ||
        bStatus === 'PAID' ||
        bStatus === 'SUCCESS' ||
        bStatus === 'CONFIRMED' ||
        bStatus === 'COMPLETED' ||
        hasApprovedPayment
      );
    });
  }

  private formatSessionItem(b: any) {
    const rawStatus = String(b.status || 'UPCOMING').toLowerCase();
    let normalizedStatus = rawStatus;

    if (['approved', 'paid', 'success', 'confirmed'].includes(rawStatus)) {
      normalizedStatus = 'upcoming';
    }

    const serviceTitle = b.service?.nama || b.service?.name || 'Konseling Psikologi';

    return {
      id: b.id,
      patientName: b.user?.userProfile?.fullName || 'Pasien Oase Jiwa',
      patientEmail: b.user?.email || '-',
      patientPhone: b.user?.userProfile?.phone || '-',
      service: serviceTitle,
      serviceName: serviceTitle,
      date: b.scheduledDate
        ? new Date(b.scheduledDate).toISOString().split('T')[0]
        : '',
      scheduledDate: b.scheduledDate
        ? new Date(b.scheduledDate).toISOString().split('T')[0]
        : '',
      time: b.scheduledTime || '09:00',
      scheduledTime: b.scheduledTime || '09:00',
      duration: 60,
      sessionNumber: 1,
      paymentStatus: 'paid',
      notes: b.notes || '-',
      status: normalizedStatus,
    };
  }

  // ==========================================
  // 1. DASBOR PSIKOLOG
  // ==========================================
  async getDashboard(userId: string) {
    const psychologist = await this.prisma.psychologistProfile.findUnique({
      where: { userId },
    });

    if (!psychologist) {
      throw new NotFoundException('Profile psikolog tidak ditemukan');
    }

    const psychologistId = psychologist.id;

    const allBookings = await this.prisma.booking.findMany({
      where: { psychologistId },
      include: {
        user: {
          select: {
            userProfile: { select: { fullName: true } },
          },
        },
        service: { select: { nama: true } },
      },
      orderBy: { scheduledTime: 'asc' },
    });

    const todayStr = new Date().toISOString().split('T')[0];

    const sesiHariIni = allBookings.filter((b) => {
      const bookingDateStr = new Date(b.scheduledDate)
        .toISOString()
        .split('T')[0];
      const st = String(b.status).toUpperCase();
      return (
        bookingDateStr === todayStr &&
        st !== 'CANCELLED' &&
        st !== 'REJECTED'
      );
    }).length;

    const now = new Date();
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const sesiMingguIni = allBookings.filter((b) => {
      const bDate = new Date(b.scheduledDate);
      const st = String(b.status).toUpperCase();
      return bDate >= startOfWeek && st !== 'CANCELLED' && st !== 'REJECTED';
    }).length;

    const completedBookings = allBookings.filter((b) => {
      const st = String(b.status).toUpperCase();
      return st === 'COMPLETED';
    });
    const uniqueUsers = new Set(completedBookings.map((b) => b.userId));
    const totalPasien = uniqueUsers.size;

    const jadwalHariIni = allBookings.filter((b) => {
      const bookingDateStr = new Date(b.scheduledDate)
        .toISOString()
        .split('T')[0];
      return bookingDateStr === todayStr;
    });

    const jadwalMendatang = allBookings.filter((b) => {
      const bookingDateStr = new Date(b.scheduledDate)
        .toISOString()
        .split('T')[0];
      const st = String(b.status).toUpperCase();
      return (
        bookingDateStr > todayStr && st !== 'CANCELLED' && st !== 'REJECTED'
      );
    });

    return {
      message: 'Data dashboard berhasil diambil',
      data: {
        psychologistName: psychologist.fullName,
        stats: {
          sesiHariIni,
          sesiMingguIni,
          totalPasien,
        },
        jadwalHariIni,
        jadwalMendatang,
      },
    };
  }

  // ==========================================
  // 2. KELOLA JADWAL & SESI KONSELING
  // ==========================================
  async getAllSessions(userId: string) {
    const profile = await this.getOrCreateProfile(userId);

    const rawBookings = await (this.prisma as any).booking.findMany({
      where: { psychologistId: profile.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            userProfile: { select: { fullName: true, phone: true } },
          },
        },
        service: true,
        payments: true,
      },
      orderBy: { scheduledDate: 'asc' },
    });

    const bookings = this.filterOnlyApprovedBookings(rawBookings);
    const formattedSessions = bookings.map((b) => this.formatSessionItem(b));

    return {
      message: 'Sessions fetched successfully',
      data: formattedSessions,
      sessions: formattedSessions,
    };
  }

  // ==========================================
  // 3. DAFTAR PASIEN SAYA
  // ==========================================
  async getAllPatients(userId: string) {
    const profile = await this.getOrCreateProfile(userId);

    const rawBookings = await (this.prisma as any).booking.findMany({
      where: { psychologistId: profile.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
            userProfile: true,
          },
        },
        service: true,
        payments: true,
      },
      orderBy: { scheduledDate: 'desc' },
    });

    const bookings = this.filterOnlyApprovedBookings(rawBookings);
    const patientsMap = new Map();

    bookings.forEach((b: any) => {
      const formatted = this.formatSessionItem(b);

      if (b.user && !patientsMap.has(b.user.id)) {
        patientsMap.set(b.user.id, {
          id: b.user.id,
          name: b.user.userProfile?.fullName || 'Pasien Oase Jiwa',
          email: b.user.email,
          phone: b.user.userProfile?.phone || '-',
          registeredAt: b.user.createdAt,
          totalBookings: 1,
          totalSessions: 1,
          firstSessionDate: b.scheduledDate || null,
          lastSessionDate: b.scheduledDate || null,
          hasSessionNotes: false,
          hasValidRelationship: true,
          sessions: [formatted],
        });
      } else if (b.user && patientsMap.has(b.user.id)) {
        const existing = patientsMap.get(b.user.id);
        existing.totalBookings += 1;
        existing.totalSessions += 1;
        existing.hasValidRelationship = true;
        existing.sessions.push(formatted);
      }
    });

    const notes = await this.prisma.sessionNote.findMany({
      where: { psychologistProfileId: profile.id, deletedAt: null },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
            userProfile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    for (const note of notes) {
      if (note.user && !patientsMap.has(note.user.id)) {
        patientsMap.set(note.user.id, {
          id: note.user.id,
          name: note.user.userProfile?.fullName || 'Pasien Oase Jiwa',
          email: note.user.email,
          phone: note.user.userProfile?.phone || '-',
          registeredAt: note.user.createdAt,
          totalBookings: 0,
          totalSessions: 1,
          firstSessionDate: note.createdAt,
          lastSessionDate: note.createdAt,
          hasSessionNotes: true,
          hasValidRelationship: true,
          latestRiskLevel: note.riskLevel?.toLowerCase() || 'medium',
          sessions: [],
        });
      } else if (note.user && patientsMap.has(note.user.id)) {
        const existing = patientsMap.get(note.user.id);
        existing.hasSessionNotes = true;
        existing.hasValidRelationship = true;
        if (!existing.latestRiskLevel) {
          existing.latestRiskLevel =
            note.riskLevel?.toLowerCase() || 'medium';
        }
      }
    }

    const officialRecords = await this.prisma.officialMedicalRecord.findMany({
      where: { psychologistProfileId: profile.id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
            userProfile: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    for (const rec of officialRecords) {
      if (rec.user && !patientsMap.has(rec.user.id)) {
        patientsMap.set(rec.user.id, {
          id: rec.user.id,
          name: rec.user.userProfile?.fullName || 'Pasien Oase Jiwa',
          email: rec.user.email,
          phone: rec.user.userProfile?.phone || '-',
          registeredAt: rec.user.createdAt,
          totalBookings: 0,
          totalSessions: 1,
          firstSessionDate: rec.createdAt,
          lastSessionDate: rec.createdAt,
          hasSessionNotes: false,
          hasValidRelationship: true,
          latestRiskLevel: rec.riskLevel?.toLowerCase() || 'low',
          sessions: [],
        });
      }
    }

    // Return strictly only patients connected to this psychologist (bookings/notes/officialRecords)
    const patientsList = Array.from(patientsMap.values());

    const patientIds = patientsList.map((p) => p.id);
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

      for (const patient of patientsList) {
        const latestTes = latestTesMap.get(patient.id);
        if (latestTes) {
          patient.latestTesName = latestTes.namaTes || 'DASS-21';
          patient.latestTesCategory = latestTes.kategoriNama || 'Normal';
          patient.latestTesScore = `${latestTes.totalScore}/${latestTes.maxScore} (${Math.round(latestTes.percentage)}%)`;
          patient.latestTesDate = latestTes.createdAt;

          if (latestTes.sectionScores && Array.isArray(latestTes.sectionScores)) {
            const parts: string[] = [];
            for (const sec of latestTes.sectionScores) {
              if (sec.section && sec.total !== undefined) {
                const secName =
                  sec.section === 'Depression'
                    ? 'Depresi'
                    : sec.section === 'Anxiety'
                    ? 'Anxiety'
                    : sec.section === 'Stress'
                    ? 'Stres'
                    : sec.section;
                parts.push(`${secName} ${sec.total}`);
              }
            }
            if (parts.length > 0) {
              patient.latestTesSummary = parts.join(' • ');
            }
          }

          if (!patient.latestTesSummary) {
            patient.latestTesSummary = patient.latestTesScore;
          }
        }
      }
    }

    return {
      message: 'Patients fetched successfully',
      data: patientsList,
      patients: patientsList,
      total: patientsList.length,
    };
  }

  // ==========================================
  // 4. GET PROFIL PSIKOLOG
  // ==========================================
  async getProfile(userId: string) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            email: true,
            createdAt: true,
            userProfile: {
              select: {
                phone: true,
                fullName: true,
              },
            },
          },
        },
        educations: true,
        experiences: true,
        specializations: true,
        expertises: true,
        schedules: {
          orderBy: { createdAt: 'asc' },
        },
      },
    });

    if (!profile) {
      return this.getProfile((await this.getOrCreateProfile(userId)).userId);
    }

    const userPhone = profile.user?.userProfile?.phone || '';

    const bookingPatientIds = await this.prisma.booking.findMany({
      where: { psychologistId: profile.id },
      select: { userId: true },
      distinct: ['userId'],
    });

    const notePatientIds = await this.prisma.sessionNote.findMany({
      where: { psychologistProfileId: profile.id, deletedAt: null },
      select: { userId: true },
      distinct: ['userId'],
    });

    const officialPatientIds = await this.prisma.officialMedicalRecord.findMany({
      where: { psychologistProfileId: profile.id },
      select: { userId: true },
      distinct: ['userId'],
    });

    const uniquePatientSet = new Set([
      ...bookingPatientIds.map((b) => b.userId),
      ...notePatientIds.map((n) => n.userId),
      ...officialPatientIds.map((o) => o.userId),
    ]);

    const totalPatients = uniquePatientSet.size;

    const sessionNotesCount = await this.prisma.sessionNote.count({
      where: { psychologistProfileId: profile.id, deletedAt: null },
    });

    const bookingsCount = await this.prisma.booking.count({
      where: { psychologistId: profile.id },
    });

    const totalSessions = Math.max(sessionNotesCount, bookingsCount);
    const DAYS_MAP = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

    return {
      data: {
        id: profile.id,
        fullName: profile.fullName,
        name: profile.fullName,
        email: profile.user?.email || '',
        phoneNumber: userPhone,
        phone: userPhone,
        avatarUrl: profile.avatarUrl || '',
        photo: profile.avatarUrl || '',
        about: profile.about || 'Psikolog Klinik Oase Jiwa',
        sipp: profile.sipp || '-',
        str: profile.str || '-',
        status: profile.status || 'Aktif',
        totalSessions,
        totalPatients,
        joinedDate: profile.createdAt || profile.user?.createdAt || new Date(),
        educations: profile.educations || [],
        experiences: (profile.experiences || []).map((e: any) => e.name || e),
        specializations: (profile.specializations || []).map((s: any) => s.name || s),
        expertises: (profile.expertises || []).map((e: any) => e.name || e),
        signatureUrl: profile.signatureUrl || null,
        signatureUpdatedAt: profile.signatureUpdatedAt || null,
        signatureMethod: profile.signatureMethod || 'UPLOAD',
        schedules: (profile.schedules || []).map((s: any) => {
          let dayName = s.day || s.hari || s.dayOfWeek || '';
          if (!dayName && s.date) {
            const d = new Date(s.date);
            if (!isNaN(d.getTime())) {
              dayName = DAYS_MAP[d.getDay()];
            }
          }
          const formattedDay = dayName
            ? dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase()
            : 'Senin';

          return {
            id: s.id,
            day: formattedDay,
            hari: formattedDay,
            dayOfWeek: formattedDay,
            date: s.date ? new Date(s.date).toISOString().split('T')[0] : '',
            startTime: s.startTime || s.time || '',
            duration: s.duration || 60,
            isAvailable: s.isAvailable ?? true,
          };
        }),
      },
    };
  }

  // ==========================================
  // 5. UPDATE PROFIL PSIKOLOG
  // ==========================================
  async updateProfile(userId: string, dto: any) {
    const profile = await this.getOrCreateProfile(userId);

    await this.prisma.$transaction(async (prisma: any) => {
      if (dto.phoneNumber || dto.phone || dto.fullName) {
        const phoneToSave = dto.phoneNumber || dto.phone;
        if (profile.user?.userProfile) {
          await prisma.userProfile.update({
            where: { userId },
            data: {
              phone: phoneToSave || undefined,
              fullName: dto.fullName || undefined,
            },
          });
        } else if (phoneToSave) {
          await prisma.userProfile.create({
            data: {
              userId,
              fullName: dto.fullName || profile.fullName,
              phone: phoneToSave,
            },
          });
        }
      }

      const updateData: any = {};
      if (dto.fullName) updateData.fullName = dto.fullName;
      if (dto.about) updateData.about = dto.about;
      if (dto.sipp) updateData.sipp = dto.sipp;
      if (dto.str) updateData.str = dto.str;
      if (dto.avatarUrl || dto.photo)
        updateData.avatarUrl = dto.avatarUrl || dto.photo;

      if (dto.clearSignature) {
        updateData.signatureUrl = null;
        updateData.signatureUpdatedAt = null;
        updateData.signatureMethod = 'UPLOAD';
      } else if (
        dto.signatureUrl !== undefined ||
        dto.signature !== undefined ||
        dto.signatureImage !== undefined
      ) {
        updateData.signatureUrl =
          dto.signatureUrl || dto.signature || dto.signatureImage;
        updateData.signatureUpdatedAt = new Date();
        if (dto.signatureMethod) {
          updateData.signatureMethod = dto.signatureMethod;
        }
      }

      if (Object.keys(updateData).length > 0) {
        await prisma.psychologistProfile.update({
          where: { id: profile.id },
          data: updateData,
        });
      }

      if (Array.isArray(dto.schedules)) {
        await prisma.schedule.deleteMany({
          where: { psychologistId: profile.id },
        });

        if (dto.schedules.length > 0) {
          for (const sch of dto.schedules) {
            if (sch.date) {
              const cleanDateStr = String(sch.date).split('T')[0];
              const safeDate = new Date(`${cleanDateStr}T12:00:00.000Z`);

              await prisma.schedule.create({
                data: {
                  psychologistId: profile.id,
                  date: safeDate,
                  startTime: sch.startTime || '09:00',
                  duration: Number(sch.duration) || 60,
                  isAvailable: sch.isAvailable ?? true,
                },
              });
            }
          }
        }
      }

      if (Array.isArray(dto.education) || Array.isArray(dto.educations)) {
        const eduList = dto.education || dto.educations;
        await prisma.education.deleteMany({
          where: { psychologistId: profile.id },
        });

        if (eduList.length > 0) {
          for (const e of eduList) {
            await prisma.education.create({
              data: {
                psychologistId: profile.id,
                institution: e.institution || '',
                degree: e.degree || '',
                startYear: Number(e.startYear) || new Date().getFullYear(),
                endYear: Number(e.endYear) || new Date().getFullYear(),
                city: e.city || '',
              },
            });
          }
        }
      }

      if (
        Array.isArray(dto.specializations) ||
        Array.isArray(dto.specialization)
      ) {
        const specList = dto.specializations || dto.specialization;
        await prisma.specialization.deleteMany({
          where: { psychologistId: profile.id },
        });

        if (specList.length > 0) {
          for (const item of specList) {
            await prisma.specialization.create({
              data: {
                psychologistId: profile.id,
                name: typeof item === 'object' ? item.name : String(item),
              },
            });
          }
        }
      }

      if (Array.isArray(dto.expertises) || Array.isArray(dto.expertise)) {
        const expList = dto.expertises || dto.expertise;
        await prisma.expertise.deleteMany({
          where: { psychologistId: profile.id },
        });

        if (expList.length > 0) {
          for (const item of expList) {
            await prisma.expertise.create({
              data: {
                psychologistId: profile.id,
                name: typeof item === 'object' ? item.name : String(item),
              },
            });
          }
        }
      }

      if (Array.isArray(dto.experiences) || Array.isArray(dto.experienceList)) {
        const expList = dto.experiences || dto.experienceList;
        await prisma.experience.deleteMany({
          where: { psychologistId: profile.id },
        });

        if (expList.length > 0) {
          for (const item of expList) {
            await prisma.experience.create({
              data: {
                psychologistId: profile.id,
                name: typeof item === 'object' ? item.name : String(item),
              },
            });
          }
        }
      }
    });

    return this.getProfile(userId);
  }

  // ==========================================
  // 6. MANAJEMEN JADWAL PRAKTIK
  // ==========================================
  async addSchedule(
    userId: string,
    dto: {
      date?: string;
      day?: string;
      hari?: string;
      time?: string;
      startTime?: string;
      endTime?: string;
      duration?: number;
    },
  ) {
    const profile = await this.getOrCreateProfile(userId);
    const inputTime = dto.startTime || dto.time || '09:00';
    const rawDayOrDate = dto.day || dto.hari || dto.date || 'Senin';

    let parsedDate: Date | null = null;
    const isDateString =
      !isNaN(Date.parse(rawDayOrDate)) && rawDayOrDate.includes('-');

    if (isDateString) {
      parsedDate = new Date(rawDayOrDate);
    }

    const newSchedule = await (this.prisma.schedule as any).create({
      data: {
        psychologistId: profile.id,
        date: parsedDate,
        startTime: inputTime,
        duration: dto.duration || 60,
        isAvailable: true,
      },
    });

    return {
      message: 'Jadwal berhasil ditambahkan',
      data: newSchedule,
    };
  }

  async deleteSchedule(userId: string, scheduleId: string) {
    await this.getOrCreateProfile(userId);
    await this.prisma.schedule.delete({
      where: { id: scheduleId },
    });
    return { message: 'Jadwal berhasil dihapus' };
  }

  // ==========================================
  // 🟢 7. GET DAFTAR PSIKOLOG (HANYA USER ROLE PSYCHOLOGIST)
  // ==========================================
  async getAllPsychologists() {
  const psychologists = await this.prisma.psychologistProfile.findMany({
    where: {
      user: {
        role: 'PSYCHOLOGIST',
      },
    },
    include: {
      user: {
        select: {
          id: true,
          email: true,
          isProfileComplete: true,
          userProfile: { select: { phone: true } },
        },
      },
      specializations: { select: { name: true } },
      educations: { select: { degree: true, institution: true } },
      experiences: { select: { name: true } },
      expertises: { select: { name: true } },
      schedules: true,
    },
    orderBy: [
      { displayOrder: 'asc' }, // 👈 Urutkan displayOrder terkecil ke terbesar
      { createdAt: 'desc' },
    ],
  });

  const cleanPsychologists = psychologists.filter(
    (p) => p.fullName && p.fullName.trim() !== '',
  );

  return {
    data: cleanPsychologists.map((p: any) => ({
      id: p.id,
      userId: p.userId,
      displayOrder: p.displayOrder, // 👈 Kirimkan displayOrder ke response
      name: p.fullName,
      fullName: p.fullName,
      email: p.user?.email || '-',
      phoneNumber: p.user?.userProfile?.phone || '-',
      phone: p.user?.userProfile?.phone || '-',
      avatarUrl: p.avatarUrl && p.avatarUrl.trim() !== '' ? p.avatarUrl : null,
      photo: p.avatarUrl && p.avatarUrl.trim() !== '' ? p.avatarUrl : null,
      sipp: p.sipp || '-',
      str: p.str || '-',
      about: p.about || 'Psikolog Klinik Oase Jiwa',
      status: p.status || 'Aktif',
      isProfileComplete:
        p.user?.isProfileComplete ?? (p.sipp && p.sipp !== '-'),
      specializations: (p.specializations || []).map((s: any) => s.name || s),
      expertises: (p.expertises || []).map((e: any) => e.name || e),
      experiences: (p.experiences || []).map((e: any) => e.name || e),
      latestEducation:
        p.educations && p.educations.length > 0
          ? `${p.educations[p.educations.length - 1].degree} - ${p.educations[p.educations.length - 1].institution}`
          : 'Psikolog Klinis',
      schedules: (p.schedules || []).map((s: any) => ({
        id: s.id,
        day: s.day || s.hari || 'Senin',
        startTime: s.startTime || s.time || '09:00',
        duration: s.duration || 60,
        isAvailable: s.isAvailable ?? true,
      })),
    })),
  };
}

  // ==========================================
  // 🟢 8. CRUD KHUSUS ADMIN
  // ==========================================
  async createPsychologist(dto: {
    fullName: string;
    email: string;
    phoneNumber?: string;
    sipp?: string;
    str?: string;
    temporaryPassword?: string;
  }) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email sudah terdaftar di sistem');
    }

    const password =
      dto.temporaryPassword ||
      'Oase' + Math.floor(100000 + Math.random() * 900000);
    const passwordHash = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        role: 'PSYCHOLOGIST',
        isEmailVerified: true,
        isProfileComplete: false,
        isFirstLogin: true, // 🟢 WAJIB TRUE agar psikolog baru langsung dipaksa ganti password
        authProvider: {
          create: {
            provider: 'local',
            passwordHash,
          },
        },
        userProfile: {
          create: {
            fullName: dto.fullName,
            phone: dto.phoneNumber || '',
          },
        },
        psychologistProfile: {
          create: {
            fullName: dto.fullName,
            about: 'Psikolog Klinik Oase Jiwa',
            sipp: dto.sipp || '-',
            str: dto.str || '-',
            status: 'Aktif',
          },
        },
      },
      include: { psychologistProfile: true },
    });

   try {
      await this.emailService.sendPsychologistCredentials(
        dto.email,
        dto.fullName,
        password,
      );
      this.logger.log(`Email kredensial psikolog berhasil dikirim ke ${dto.email}`);
    } catch (e) {
      this.logger.warn(`Gagal mengirim email kredensial psikolog: ${e}`);
    }
    return {
      message: 'Akun psikolog berhasil dibuat',
      data: newUser.psychologistProfile,
    };
  }

  async updatePsychologist(id: string, dto: any) {
    const profile = await this.prisma.psychologistProfile.findFirst({
      where: { OR: [{ id }, { userId: id }] },
    });

    if (!profile) {
      throw new NotFoundException('Psikolog tidak ditemukan');
    }

    // 🟢 Update email di tabel User & nama/hp di tabel UserProfile menggunakan upsert
    if (dto.email || dto.phoneNumber || dto.fullName) {
      await this.prisma.user.update({
        where: { id: profile.userId }, // 👈 Gunakan profile.userId
        data: {
          ...(dto.email && { email: dto.email }),
          userProfile: { // 👈 Gunakan userProfile
            upsert: {
              create: {
                fullName: dto.fullName || profile.fullName,
                phone: dto.phoneNumber || '',
              },
              update: {
                ...(dto.fullName && { fullName: dto.fullName }),
                ...(dto.phoneNumber && { phone: dto.phoneNumber }),
              },
            },
          },
        },
      });
    }

    const updated = await this.prisma.psychologistProfile.update({
      where: { id: profile.id },
      data: {
        fullName: dto.fullName || undefined,
        sipp: dto.sipp || undefined,
        str: dto.str || undefined,
        about: dto.about || undefined,
        status: dto.status || undefined,
      },
    });

    return {
      message: 'Data psikolog berhasil diperbarui',
      data: updated,
    };
  }

  async deletePsychologist(id: string) {
    const profile = await this.prisma.psychologistProfile.findFirst({
      where: { OR: [{ id }, { userId: id }] },
    });

    if (!profile) {
      throw new NotFoundException('Psikolog tidak ditemukan');
    }

    await this.prisma.user.delete({
      where: { id: profile.userId },
    });

    return { message: 'Akun psikolog berhasil dihapus' };
  }

  // ==========================================
  // GET DETAIL PSIKOLOG BY ID
  // ==========================================
  async getPsychologistById(idOrUserId: string) {
    const profile = await this.prisma.psychologistProfile.findFirst({
      where: {
        OR: [{ id: idOrUserId }, { userId: idOrUserId }],
      },
      include: {
        user: {
          select: {
            email: true,
            userProfile: { select: { phone: true } },
          },
        },
        educations: true,
        experiences: true,
        specializations: true,
        expertises: true,
      },
    });

    if (!profile) {
      throw new NotFoundException('Psikolog tidak ditemukan');
    }

    const rawSchedules = await this.prisma.schedule.findMany({
      where: {
        OR: [
          { psychologistId: profile.id },
          { psychologistId: profile.userId },
          { psychologistId: idOrUserId },
        ],
      },
    });

    const DAYS_MAP = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

    const formattedSchedules = rawSchedules.map((s: any) => {
      let dayName = s.day || s.hari || s.dayOfWeek || '';
      if (!dayName && s.date) {
        const d = new Date(s.date);
        if (!isNaN(d.getTime())) {
          dayName = DAYS_MAP[d.getDay()];
        }
      }

      return {
        id: s.id,
        day: String(dayName || 'SENIN').toUpperCase().trim(),
        hari: String(dayName || 'SENIN').toUpperCase().trim(),
        startTime: s.startTime || s.time || '09:00',
        endTime: s.endTime || null,
        duration: Number(s.duration) || 60,
        isAvailable: true,
      };
    });

    const responseData = {
      id: profile.id,
      userId: profile.userId,
      name: profile.fullName,
      fullName: profile.fullName,
      email: profile.user?.email || '',
      phone: profile.user?.userProfile?.phone || '',
      avatarUrl: profile.avatarUrl || null,
      photo: profile.avatarUrl || null,
      about: profile.about || 'Psikolog Klinik Oase Jiwa',
      sipp: profile.sipp || '-',
      str: profile.str || '-',
      educations: profile.educations || [],
      experiences: (profile.experiences || []).map((e: any) => e.name || e),
      specializations: (profile.specializations || []).map((s: any) => s.name || s),
      expertises: (profile.expertises || []).map((e: any) => e.name || e),
      schedules: formattedSchedules,
      schedule: formattedSchedules,
      availableSchedules: formattedSchedules,
    };

    return {
      data: responseData,
      psychologist: responseData,
    };
  }

  // ==========================================
  // EMAIL PENGINGAT
  // ==========================================
  async sendReminderEmail(psychologistId: string) {
    const profile = await this.prisma.psychologistProfile.findFirst({
      where: { OR: [{ id: psychologistId }, { userId: psychologistId }] },
      include: { user: true },
    });

    if (!profile || !profile.user) {
      throw new NotFoundException('Data psikolog tidak ditemukan');
    }

    await this.emailService.sendPsychologistReminderEmail(
      profile.user.email,
      profile.fullName,
    );

    return { message: 'Email pengingat berhasil dikirim!' };
  }

  // ==========================================
  // UPDATE STATUS SESI
  // ==========================================
  async updateSessionStatus(
    userId: string,
    sessionId: string,
    dto: { status: string; reason?: string },
  ) {
    await this.getOrCreateProfile(userId);

    const booking = await (this.prisma as any).booking.findUnique({
      where: { id: sessionId },
    });

    if (!booking) {
      throw new NotFoundException('Sesi booking tidak ditemukan');
    }

    const targetStatus = String(dto.status).toUpperCase();

    if (targetStatus === 'COMPLETED' || targetStatus === 'SELESAI') {
      const now = new Date();
      const scheduledDate = new Date(booking.scheduledDate);

      if (booking.scheduledTime) {
        const [hours, minutes] = booking.scheduledTime.split(':').map(Number);
        scheduledDate.setHours(hours || 0, minutes || 0, 0, 0);
      } else {
        scheduledDate.setHours(23, 59, 59, 999);
      }

      if (now.getTime() < scheduledDate.getTime()) {
        const formattedDate = scheduledDate.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        const formattedTime = booking.scheduledTime || '';

        throw new BadRequestException(
          `Sesi belum bisa ditandai selesai karena jadwal konseling baru dilaksanakan pada ${formattedDate} pukul ${formattedTime} WIB.`,
        );
      }
    }

    const updated = await (this.prisma as any).booking.update({
      where: { id: sessionId },
      data: {
        status: targetStatus === 'COMPLETED' ? 'COMPLETED' : targetStatus,
        rejectionReason: dto.reason || undefined,
      },
    });

    return {
      message: 'Status sesi berhasil diperbarui',
      data: updated,
    };
  }

  // ==========================================
  // CATATAN KONSELING
  // ==========================================
  async getAllNotes(userId: string, query?: any) {
    const profile = await this.getOrCreateProfile(userId);
    const whereCondition: any = {
      psychologistProfileId: profile.id,
      deletedAt: null,
    };

    if (query?.riskLevel && query.riskLevel !== 'all') {
      whereCondition.riskLevel = String(query.riskLevel).toUpperCase();
    }

    const notes = await this.prisma.sessionNote.findMany({
      where: whereCondition,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            userProfile: { select: { fullName: true, phone: true } },
          },
        },
        schedule: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    const formattedNotes = notes.map((n) => ({
      id: n.id,
      patientId: n.userId,
      patientName:
        n.user?.userProfile?.fullName || n.user?.email || 'Pasien Oase Jiwa',
      service: 'Konseling Psikologi',
      sessionDate: n.createdAt
        ? new Date(n.createdAt).toISOString().split('T')[0]
        : '',
      createdAt: n.createdAt,
      subjective: n.subjective || '-',
      objective: n.objective || '-',
      assessment: n.assessment || '-',
      plan: n.plan || '-',
      riskLevel: String(n.riskLevel || 'LOW').toLowerCase(),
      followUpDate: n.followUpDate
        ? new Date(n.followUpDate).toISOString().split('T')[0]
        : null,
      recommendation: n.nextSessionRecommendation || '-',
      tags: n.tags || [],
    }));

    return {
      notes: formattedNotes,
      data: formattedNotes,
      total: formattedNotes.length,
      lowRiskCount: formattedNotes.filter((n) => n.riskLevel === 'low').length,
      mediumRiskCount: formattedNotes.filter(
        (n) => n.riskLevel === 'medium',
      ).length,
      highRiskCount: formattedNotes.filter((n) => n.riskLevel === 'high').length,
    };
  }

  // 🟢 Method untuk update urutan banyak psikolog sekaligus
async reorderPsychologists(orderedIds: string[]) {
  if (!orderedIds || !Array.isArray(orderedIds) || orderedIds.length === 0) {
    return { message: 'Tidak ada data urutan' };
  }

  // Update urutan secara berurutan (1, 2, 3, dst.)
  const updatePromises = orderedIds.map((id, index) => {
    return this.prisma.psychologistProfile.updateMany({
      where: {
        OR: [{ id: id }, { userId: id }],
      },
      data: {
        displayOrder: index + 1, // 1, 2, 3, 4 ...
      },
    });
  });

  await this.prisma.$transaction(updatePromises);
  return { message: 'Urutan psikolog berhasil diperbarui', success: true };
}

  async getNoteById(userId: string, noteId: string) {
    const profile = await this.getOrCreateProfile(userId);

    const note = await this.prisma.sessionNote.findFirst({
      where: {
        id: noteId,
        psychologistProfileId: profile.id,
        deletedAt: null,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            userProfile: true,
          },
        },
      },
    });

    if (!note) {
      throw new NotFoundException('Catatan konseling tidak ditemukan');
    }

    return {
      data: {
        id: note.id,
        patientId: note.userId,
        patientName:
          note.user?.userProfile?.fullName ||
          note.user?.email ||
          'Pasien Oase Jiwa',
        subjective: note.subjective || '-',
        objective: note.objective || '-',
        assessment: note.assessment || '-',
        plan: note.plan || '-',
        riskLevel: String(note.riskLevel || 'LOW').toLowerCase(),
        followUpDate: note.followUpDate,
        recommendation: note.nextSessionRecommendation,
        tags: note.tags || [],
      },
    };
  }
}