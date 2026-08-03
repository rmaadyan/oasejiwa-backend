import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdatePsychologistProfileDto } from './dto/update-psychologist-profile.dto';

@Injectable()
export class PsychologistProfileService {
  constructor(private readonly prisma: PrismaService) {}

  private async getProfileByUserId(userId: string) {
    const profile = await this.prisma.psychologistProfile.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            role: true,
            isEmailVerified: true,
            isProfileComplete: true,
            isFirstLogin: true,
          },
        },
        educations: true,
        experiences: true,
        specializations: true,
        expertises: true,
        schedules: {
          orderBy: {
            date: 'asc',
          },
        },
      },
    });

    if (!profile) {
      throw new ForbiddenException('Akun ini bukan psikolog');
    }

    return profile;
  }

  private mapProfile(profile: any) {
    return {
      id: profile.id,
      userId: profile.userId,
      email: profile.user.email,
      role: profile.user.role,
      fullName: profile.fullName,
      name: profile.fullName,
      sipp: profile.sipp,
      str: profile.str,
      about: profile.about,
      bio: profile.about,
      avatarUrl: profile.avatarUrl,
      photo: profile.avatarUrl,
      isEmailVerified: profile.user.isEmailVerified,
      isProfileComplete: profile.user.isProfileComplete,
      isFirstLogin: profile.user.isFirstLogin,
      educations: profile.educations,
      education: profile.educations.map((e: any) => ({
        id: e.id,
        degree: e.degree,
        institution: e.institution,
        city: e.city,
        startYear: String(e.startYear),
        endYear: String(e.endYear),
      })),
      experiences: profile.experiences,
      experienceList: profile.experiences.map((e: any) => e.name),
      specializations: profile.specializations.map((s: any) => s.name),
      specialization: profile.specializations.map((s: any) => s.name),
      expertises: profile.expertises.map((e: any) => e.name),
      expertise: profile.expertises.map((e: any) => e.name),
      schedules: profile.schedules,
      signatureUrl: profile.signatureUrl || null,
      signatureUpdatedAt: profile.signatureUpdatedAt || null,
      signatureMethod: profile.signatureMethod || 'UPLOAD',
      status: 'active',
      joinedDate: profile.createdAt,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt,
    };
  }

  async getMe(currentUser: any) {
    const profile = await this.getProfileByUserId(currentUser.id);
    return this.mapProfile(profile);
  }

  async updateMe(
    currentUser: any,
    dto: UpdatePsychologistProfileDto,
    file?: Express.Multer.File,
  ) {
    const profile = await this.getProfileByUserId(currentUser.id);
    const psychologistId = profile.id;

    let avatarUrl = dto.avatarUrl;
    if (file) {
      avatarUrl = `/uploads/${file.filename}`;
    }

    console.log('=== UPDATE ME RECEIVED DTO ===', JSON.stringify(dto, null, 2));

    await this.prisma.$transaction(async (tx) => {
      // 1. Update Profile Utama
      const signatureData: any = {};
      const incomingSignatureUrl =
        dto.signatureUrl !== undefined && dto.signatureUrl !== null
          ? dto.signatureUrl
          : (dto as any).signature !== undefined && (dto as any).signature !== null
          ? (dto as any).signature
          : (dto as any).signatureImage !== undefined && (dto as any).signatureImage !== null
          ? (dto as any).signatureImage
          : undefined;

      const incomingSignatureMethod =
        dto.signatureMethod || (dto as any).signatureMethod || 'UPLOAD';

      if (dto.clearSignature || (dto as any).clearSignature) {
        signatureData.signatureUrl = null;
        signatureData.signatureUpdatedAt = null;
        signatureData.signatureMethod = 'UPLOAD';
      } else if (incomingSignatureUrl !== undefined) {
        signatureData.signatureUrl = incomingSignatureUrl;
        signatureData.signatureUpdatedAt = new Date();
        signatureData.signatureMethod = incomingSignatureMethod;
      }

      console.log('=== SIGNATURE DATA TO SAVE IN DB ===', signatureData);

      await tx.psychologistProfile.update({
        where: { id: psychologistId },
        data: {
          ...((dto.fullName !== undefined || dto.name !== undefined) && {
            fullName: dto.fullName || dto.name,
          }),
          ...(dto.sipp !== undefined && { sipp: dto.sipp }),
          ...(dto.str !== undefined && { str: dto.str }),
          ...(dto.about !== undefined && { about: dto.about }),
          ...(avatarUrl !== undefined && { avatarUrl }),
          ...signatureData,
          status: 'ACTIVE',
        },
      });

      // 2. Update Status User
      await tx.user.update({
        where: { id: currentUser.id },
        data: {
          isProfileComplete: true,
          isFirstLogin: false,
        },
      });

      // 3. Update Pendidikan
      if (dto.education) {
        await tx.education.deleteMany({ where: { psychologistId } });

        if (dto.education.length > 0) {
          await tx.education.createMany({
            data: dto.education.map((edu) => ({
              psychologistId,
              degree: edu.degree ?? '',
              institution: edu.institution ?? '',
              city: edu.city ?? '',
              // 🟢 Konversi aman: Mengakomodasi skema DB baik bertipe Int maupun String/Number
              startYear: edu.startYear ? Number(edu.startYear) : new Date().getFullYear(),
              endYear: edu.endYear ? Number(edu.endYear) : new Date().getFullYear(),
            })),
          });
        }
      }

      // 4. Update Pengalaman
      if (dto.experiences) {
        await tx.experience.deleteMany({ where: { psychologistId } });

        if (dto.experiences.length > 0) {
          await tx.experience.createMany({
            data: dto.experiences.map((name) => ({
              psychologistId,
              name,
            })),
          });
        }
      }

      // 5. Update Spesialisasi
      if (dto.specializations) {
        await tx.specialization.deleteMany({
          where: { psychologistId },
        });

        if (dto.specializations.length > 0) {
          await tx.specialization.createMany({
            data: dto.specializations.map((name) => ({
              psychologistId,
              name,
            })),
          });
        }
      }

      // 6. Update Keahlian (Expertises)
      if (dto.expertises) {
        await tx.expertise.deleteMany({ where: { psychologistId } });

        if (dto.expertises.length > 0) {
          await tx.expertise.createMany({
            data: dto.expertises.map((name) => ({
              psychologistId,
              name,
            })),
          });
        }
      }

      // 7. Update Jadwal Praktik (Schedules)
      if (dto.schedules) {
        await tx.schedule.deleteMany({ where: { psychologistId } });

        if (dto.schedules.length > 0) {
          await tx.schedule.createMany({
            data: dto.schedules.map((schedule) => ({
              psychologistId,
              date: schedule.date ? new Date(schedule.date) : new Date(),
              startTime: schedule.startTime ?? '',
              duration: schedule.duration ? Number(schedule.duration) : 60,
              isAvailable: schedule.isAvailable ?? true,
            })),
          });
        }
      }
    });

    const updated = await this.getProfileByUserId(currentUser.id);

    return {
      message: 'Profil psikolog berhasil diperbarui',
      data: this.mapProfile(updated),
    };
  }
}