import { Injectable, NotFoundException, BadRequestException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';


@Injectable()
export class PsychologistService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  private async getOrCreateProfile(userIdOrProfileId: string) {
    // 1. Cari berdasarkan userId ATAU id Profil
    let profile = await this.prisma.psychologistProfile.findFirst({
      where: {
        OR: [
          { userId: userIdOrProfileId },
          { id: userIdOrProfileId }
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

    // 2. Jika belum ada profilnya, cari User-nya untuk dibuatkan profil baru
    if (!profile) {
      const user = await this.prisma.user.findFirst({
        where: {
          OR: [
            { id: userIdOrProfileId },
            { psychologistProfile: { id: userIdOrProfileId } }
          ]
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

  // Helper untuk memfilter booking lunas / disetujui admin
  private filterOnlyApprovedBookings(bookings: any[]) {
    return bookings.filter((b: any) => {
      const bStatus = String(b.status || '').toUpperCase();
      const hasApprovedPayment = b.payments?.some((p: any) => {
        const pStatus = String(p.status || '').toUpperCase();
        return pStatus === 'APPROVED' || pStatus === 'SUCCESS' || pStatus === 'PAID';
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

  // Format baku untuk setiap item sesi agar cocok 100% dengan frontend Next.js
  private formatSessionItem(b: any) {
    const rawStatus = String(b.status || 'UPCOMING').toLowerCase();
    let normalizedStatus = rawStatus;

    if (['approved', 'paid', 'success', 'confirmed'].includes(rawStatus)) {
      normalizedStatus = 'upcoming';
    }

    const serviceTitle = b.service?.name || 'Konseling Psikologi';

    return {
      id: b.id,
      patientName: b.user?.userProfile?.fullName || 'Pasien Oase Jiwa',
      patientEmail: b.user?.email || '-',
      patientPhone: b.user?.userProfile?.phone || '-',
      service: serviceTitle,
      serviceName: serviceTitle,
      date: b.scheduledDate ? new Date(b.scheduledDate).toISOString().split('T')[0] : '',
      scheduledDate: b.scheduledDate ? new Date(b.scheduledDate).toISOString().split('T')[0] : '',
      time: b.scheduledTime || '09:00',
      scheduledTime: b.scheduledTime || '09:00',
      duration: 60,
      sessionNumber: 1,
      paymentStatus: 'paid',
      notes: b.notes || '-',
      status: normalizedStatus, // 'upcoming' atau 'completed'
    };
  }

  // ==========================================
  // 1. DASBOR PSIKOLOG
  // ==========================================
  async getDashboard(userId: string) {
    const profile = await this.getOrCreateProfile(userId);

    const rawBookings = await (this.prisma as any).booking.findMany({
      where: { psychologistId: profile.id },
      include: {
        user: { select: { id: true, email: true, userProfile: true } },
        service: true,
        payments: true,
      },
      orderBy: { scheduledDate: 'asc' },
    });

    const bookings = this.filterOnlyApprovedBookings(rawBookings);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Sesi Hari Ini
    const todaySessions = bookings.filter((b: any) => {
      if (!b.scheduledDate) return false;
      const d = new Date(b.scheduledDate);
      d.setHours(0, 0, 0, 0);
      return d.getTime() === today.getTime();
    });

    // Sesi Mendatang (Jadwal terkonfirmasi dengan status 'upcoming' dan tanggal >= hari ini)
    const upcomingSessions = bookings.filter((b: any) => {
      if (!b.scheduledDate) return false;
      const d = new Date(b.scheduledDate);
      d.setHours(0, 0, 0, 0);
      const st = String(b.status || '').toLowerCase();
      const isUpcomingStatus = ['upcoming', 'approved', 'paid', 'success', 'confirmed'].includes(st);
      return d.getTime() >= today.getTime() && isUpcomingStatus;
    });

    const uniquePatientIds = new Set(bookings.map((b: any) => b.userId));

    const formattedToday = todaySessions.map((b) => this.formatSessionItem(b));
    const formattedUpcoming = upcomingSessions.map((b) => this.formatSessionItem(b));

    return {
      data: {
        psychologistName: profile.fullName || 'Psikolog',
        todaySessionsCount: formattedToday.length,
        weeklySessionsCount: bookings.length,
        totalPatients: uniquePatientIds.size,
        todaySessions: formattedToday,
        upcomingSessions: formattedUpcoming,
      },
    };
  }

  // ==========================================
  // 2. KELOLA JADWAL & SESI KONSELING (JADWAL SAYA)
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

    // Mengembalikan array langsung di 'data' & 'sessions' agar kompatibel dengan semua jenis fetcher frontend
    return {
      message: 'Sessions fetched successfully',
      data: formattedSessions,
      sessions: formattedSessions,
    };
  }

  // ==========================================
  // 3. DAFTAR PASIEN SAYA (DETAIL PASIEN)
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
          sessions: [formatted],
        });
      } else if (b.user && patientsMap.has(b.user.id)) {
        const existing = patientsMap.get(b.user.id);
        existing.totalBookings += 1;
        existing.sessions.push(formatted);
      }
    });

    const patientsList = Array.from(patientsMap.values());

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
          orderBy: { createdAt: 'asc' }, // Mengurutkan dari jadwal yang dibuat
        },
      },
    });

    if (!profile) {
      return this.getProfile((await this.getOrCreateProfile(userId)).userId);
    }

    const userPhone = profile.user?.userProfile?.phone || '';

    // Array pembanding untuk mendeteksi nama hari dari Date
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
        joinedDate: profile.createdAt || profile.user?.createdAt || new Date(),
        educations: profile.educations || [],
        experiences: (profile.experiences || []).map((e: any) => e.name || e),
        specializations: (profile.specializations || []).map((s: any) => s.name || s),
        expertises: (profile.expertises || []).map((e: any) => e.name || e),

        // 🟢 PERBAIKAN DI SINI: Menyertakan properti 'day' dan 'hari' agar form dashboard tidak reset ke "Senin"
        schedules: (profile.schedules || []).map((s: any) => {
          let dayName = s.day || s.hari || s.dayOfWeek || '';

          // Jika string hari kosong tapi ada atribut date di DB Prisma
          if (!dayName && s.date) {
            const d = new Date(s.date);
            if (!isNaN(d.getTime())) {
              dayName = DAYS_MAP[d.getDay()];
            }
          }

          // Format huruf kapital awal (contoh: "Kamis")
          const formattedDay = dayName 
            ? dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase() 
            : 'Senin';

          return {
            id: s.id,
            day: formattedDay,   // 🟢 Dikirim "Kamis" ke frontend
            hari: formattedDay,  // 🟢 Dikirim "Kamis" ke frontend
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
      if (dto.avatarUrl || dto.photo) updateData.avatarUrl = dto.avatarUrl || dto.photo;

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

      if (Array.isArray(dto.specializations) || Array.isArray(dto.specialization)) {
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
  async addSchedule(userId: string, dto: { date?: string; day?: string; hari?: string; time?: string; startTime?: string; endTime?: string; duration?: number }) {
    const profile = await this.getOrCreateProfile(userId);

    const inputTime = dto.startTime || dto.time || '09:00';
    const rawDayOrDate = dto.day || dto.hari || dto.date || 'Senin';

    let parsedDate: Date | null = null;
    let dayName = String(rawDayOrDate).trim();

    const isDateString = !isNaN(Date.parse(rawDayOrDate)) && rawDayOrDate.includes('-');

    if (isDateString) {
      parsedDate = new Date(rawDayOrDate);
      const DAYS_MAP = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
      dayName = DAYS_MAP[parsedDate.getDay()];
    }

    // Format nama hari konsisten (misal: "Kamis")
    const formattedDay = dayName.charAt(0).toUpperCase() + dayName.slice(1).toLowerCase();

    const newSchedule = await (this.prisma.schedule as any).create({
      data: {
        psychologistId: profile.id,
        day: formattedDay, // 🟢 Menyimpan "Kamis"
        date: parsedDate,
        startTime: inputTime,
        endTime: dto.endTime || null,
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

    return {
      message: 'Jadwal berhasil dihapus',
    };
  }

  // ==========================================
  // 7. GET PUBLIK DAFTAR PSIKOLOG
  // ==========================================


  async getAllPsychologists() {
    const psychologists = await this.prisma.psychologistProfile.findMany({
      where: {
        // 🟢 HANYA AMBIL PSIKOLOG YANG SUDAH ISI NAMA & SIPP (MENCEGAH CARD DRAF/KOSONG)
        fullName: {
          not: '',
        },
        sipp: {
          not: '',
        },
      },
      include: {
        specializations: { select: { name: true } },
        educations: { select: { degree: true, institution: true } },
        experiences: { select: { name: true } },
        expertises: { select: { name: true } },
        schedules: true,
      },
    });

    // Filter tambahan di JS untuk memastikan SIPP bukan "-" atau string kosong
    const cleanPsychologists = psychologists.filter(
      (p) => p.fullName && p.fullName.trim() !== '' && p.sipp && p.sipp.trim() !== '' && p.sipp.trim() !== '-'
    );

    return {
      data: cleanPsychologists.map((p: any) => ({
        id: p.id,
        userId: p.userId,
        name: p.fullName,
        fullName: p.fullName,
        avatarUrl: p.avatarUrl && p.avatarUrl.trim() !== '' ? p.avatarUrl : null,
        photo: p.avatarUrl && p.avatarUrl.trim() !== '' ? p.avatarUrl : null,
        sipp: p.sipp || '-',
        str: p.str || '-',
        about: p.about || 'Psikolog Klinik Oase Jiwa',
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
  // GET PUBLIK DETAIL PSIKOLOG BY ID (MEMBAWA JADWAL PRAKTIK UTUH)
  // ==========================================
  async getPsychologistById(idOrUserId: string) {
    // 1. Cari Profil Psikolog
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

    // 2. Query Murni Ke Tabel Schedule (JANGAN FILTER isAvailable KARENA INI TEMPLATE JADWAL PRAKTEK)
    const rawSchedules = await this.prisma.schedule.findMany({
      where: {
        OR: [
          { psychologistId: profile.id },
          { psychologistId: profile.userId },
          { psychologistId: idOrUserId }
        ],
      },
    });

    const DAYS_MAP = ['MINGGU', 'SENIN', 'SELASA', 'RABU', 'KAMIS', 'JUMAT', 'SABTU'];

    // 3. Format jadwal untuk frontend Next.js
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
        isAvailable: true, // 🟢 SELALU TRUE AGAR TEMPLATE HARI TIDAK HILANG DARI UI
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
  // 8. KIRIM EMAIL PENGINGAT
  // ==========================================
  async sendReminderEmail(psychologistId: string) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { id: psychologistId },
      include: { user: true },
    });

    if (!profile || !profile.user) {
      throw new NotFoundException('Data psikolog tidak ditemukan');
    }

    const email = profile.user.email;
    const name = profile.fullName;

    await this.emailService.sendPsychologistReminderEmail(email, name);

    return { message: 'Email pengingat berhasil dikirim!' };
  }

  // ==========================================
  // UPDATE STATUS SESI (DENGAN VALIDASI WAKTU)
  // ==========================================
  async updateSessionStatus(userId: string, sessionId: string, dto: { status: string; reason?: string }) {
    await this.getOrCreateProfile(userId);

    const booking = await (this.prisma as any).booking.findUnique({
      where: { id: sessionId },
    });

    if (!booking) {
      throw new NotFoundException('Sesi booking tidak ditemukan');
    }

    const targetStatus = String(dto.status).toUpperCase();

    // 🟢 VALIDASI TANGGAL & WAKTU UNTUK STATUS COMPLETED / SELESAI
    if (targetStatus === 'COMPLETED' || targetStatus === 'SELESAI') {
      const now = new Date();
      const scheduledDate = new Date(booking.scheduledDate);

      // Ambil jam & menit dari scheduledTime (misal "21:00")
      if (booking.scheduledTime) {
        const [hours, minutes] = booking.scheduledTime.split(':').map(Number);
        scheduledDate.setHours(hours || 0, minutes || 0, 0, 0);
      } else {
        scheduledDate.setHours(23, 59, 59, 999);
      }

      // Jika waktu sekarang masih kurang dari jadwal konseling
      if (now.getTime() < scheduledDate.getTime()) {
        const formattedDate = scheduledDate.toLocaleDateString('id-ID', {
          day: '2-digit',
          month: 'long',
          year: 'numeric',
        });
        const formattedTime = booking.scheduledTime || '';

        throw new BadRequestException(
          `Sesi belum bisa ditandai selesai karena jadwal konseling baru dilaksanakan pada ${formattedDate} pukul ${formattedTime} WIB.`
        );
      }
    }

    // Update status di database Prisma
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
  // 9. CATATAN KONSELING (SESSION NOTES)
  // ==========================================
  async getAllNotes(userId: string, query?: any) {
    // Memanggil helper yang sudah support OR pencarian ID
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
      patientName: n.user?.userProfile?.fullName || n.user?.email || 'Pasien Oase Jiwa',
      service: 'Konseling Psikologi',
      sessionDate: n.createdAt ? new Date(n.createdAt).toISOString().split('T')[0] : '',
      createdAt: n.createdAt,
      subjective: n.subjective || '-',
      objective: n.objective || '-',
      assessment: n.assessment || '-',
      plan: n.plan || '-',
      riskLevel: String(n.riskLevel || 'LOW').toLowerCase(),
      followUpDate: n.followUpDate ? new Date(n.followUpDate).toISOString().split('T')[0] : null,
      recommendation: n.nextSessionRecommendation || '-',
      tags: n.tags || [],
    }));

    return {
      notes: formattedNotes,
      data: formattedNotes,
      total: formattedNotes.length,
      lowRiskCount: formattedNotes.filter((n) => n.riskLevel === 'low').length,
      mediumRiskCount: formattedNotes.filter((n) => n.riskLevel === 'medium').length,
      highRiskCount: formattedNotes.filter((n) => n.riskLevel === 'high').length,
    };
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
        patientName: note.user?.userProfile?.fullName || note.user?.email || 'Pasien Oase Jiwa',
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