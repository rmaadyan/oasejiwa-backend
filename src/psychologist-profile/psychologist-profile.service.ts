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
        startYear: e.startYear,
        endYear: e.endYear,
      })),
      experiences: profile.experiences,
      experienceList: profile.experiences.map((e: any) => e.name),
      specializations: profile.specializations.map((s: any) => s.name),
      specialization: profile.specializations.map((s: any) => s.name),
      expertises: profile.expertises.map((e: any) => e.name),
      expertise: profile.expertises.map((e: any) => e.name),
      schedules: profile.schedules,
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

  async updateMe(currentUser: any, dto: UpdatePsychologistProfileDto) {
    const profile = await this.getProfileByUserId(currentUser.id);
    const psychologistId = profile.id;

    await this.prisma.$transaction(async (tx) => {
      await tx.psychologistProfile.update({
        where: { id: psychologistId },
        data: {
          ...(dto.fullName !== undefined && { fullName: dto.fullName }),
          ...(dto.sipp !== undefined && { sipp: dto.sipp }),
          ...(dto.str !== undefined && { str: dto.str }),
          ...(dto.about !== undefined && { about: dto.about }),
          ...(dto.avatarUrl !== undefined && { avatarUrl: dto.avatarUrl }),
        },
      });

      if (dto.educations) {
        await tx.education.deleteMany({ where: { psychologistId } });

        if (dto.educations.length > 0) {
          await tx.education.createMany({
            data: dto.educations.map((education) => ({
              psychologistId,
              degree: education.degree ?? '',
              institution: education.institution ?? '',
              city: education.city ?? '',
              startYear: education.startYear ?? new Date().getFullYear(),
              endYear: education.endYear ?? new Date().getFullYear(),
            })),
          });
        }
      }

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

      if (dto.specializations) {
        await tx.specialization.deleteMany({ where: { psychologistId } });

        if (dto.specializations.length > 0) {
          await tx.specialization.createMany({
            data: dto.specializations.map((name) => ({
              psychologistId,
              name,
            })),
          });
        }
      }

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

      if (dto.schedules) {
        await tx.schedule.deleteMany({ where: { psychologistId } });

        if (dto.schedules.length > 0) {
          await tx.schedule.createMany({
            data: dto.schedules.map((schedule) => ({
              psychologistId,
              date: schedule.date ? new Date(schedule.date) : new Date(),
              startTime: schedule.startTime ?? '',
              duration: schedule.duration ?? 60,
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