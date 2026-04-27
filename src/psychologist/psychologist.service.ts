import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PsychologistService {
    constructor(private prisma: PrismaService) {}

    async getAllPsychologists() {
        const psychologists = await this.prisma.psychologistProfile.findMany({
            select: {
                id: true,
                fullName: true,
                avatarUrl: true,
                sipp: true,
                str: true,
                specializations: {
                    select: { name: true },
                },
            },
        });

        return {
            data: psychologists.map(p => ({
                id: p.id,
                name: p.fullName,
                avatarUrl: p.avatarUrl,
                sipp: p.sipp,
                specializations: p.specializations.map(s => s.name),
            })),
        };
    }

    async getPsychologistById(id: string) {
        const profile = await this.prisma.psychologistProfile.findUnique({
            where: { id },
            include: {
                educations: true,
                experiences: true,
                specializations: true,
                expertises: true,
                schedules: {
                    where: { isAvailable: true }, 
                },
            },
        });

        if (!profile) {
            throw new NotFoundException('Psikolog tidak ditemukan');
        }

        return {
            data: {
                id: profile.id,
                name: profile.fullName,
                avatarUrl: profile.avatarUrl,
                about: profile.about,
                sipp: profile.sipp,
                str: profile.str,
                educations: profile.educations,
                experiences: profile.experiences.map(e => e.name),
                specializations: profile.specializations.map(s => s.name),
                expertises: profile.expertises.map(e => e.name),
                schedules: profile.schedules,
            },
        };
    }
}