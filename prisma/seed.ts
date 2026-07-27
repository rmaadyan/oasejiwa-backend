import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    // 1. Seed Admin
    const adminPasswordHash = await bcrypt.hash('janadminJiwa01', 10);
    const adminEmail = 'psikologioasejiwa@gmail.com';
    let existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });
    if (!existingAdmin) {
        existingAdmin = await prisma.user.create({
            data: {
                email: adminEmail,
                role: 'ADMIN',
                isEmailVerified: true,
                isProfileComplete: true,
                authProvider: {
                    create: {
                        provider: 'local',
                        passwordHash: adminPasswordHash,
                    },
                },
            },
        });
    } else {
        await prisma.user.update({
            where: { id: existingAdmin.id },
            data: { role: 'ADMIN' },
        });
        await prisma.authProvider.updateMany({
            where: { userId: existingAdmin.id },
            data: { passwordHash: adminPasswordHash },
        });
    }
    console.log('Admin account ready:', adminEmail);

    // 2. Seed Regular User / Pasien
    const userPasswordHash = await bcrypt.hash('user123456', 10);
    const userEmail = 'user@oasejiwa.com';
    let existingUser = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!existingUser) {
        await prisma.user.create({
            data: {
                email: userEmail,
                role: 'USER',
                isEmailVerified: true,
                isProfileComplete: true,
                authProvider: {
                    create: {
                        provider: 'local',
                        passwordHash: userPasswordHash,
                    },
                },
                userProfile: {
                    create: {
                        fullName: 'User Testing Oase',
                        gender: 'MALE',
                        country: 'Indonesia',
                        city: 'Jakarta',
                        fullAddress: 'Jl. Testing No. 123',
                        phone: '08123456789',
                    },
                },
            },
        });
    }
    console.log('User testing account ready:', userEmail);

    // 3. Seed Layanan (Konseling Individual)
    const layanan = await prisma.layanan.upsert({
        where: { nama: 'Konseling Individual' },
        update: {
            jenis: 'Konseling',
            kategori: 'NonPaket',
            deskripsi: 'Sesi konseling tatap muka atau online secara pribadi dengan psikolog profesional untuk membantu mengatasi kecemasan, stres, dan pengembangan diri.',
            catatan: 'Termasuk evaluasi awal dan rangkuman rekomendasi sesi.',
            durasiMenit: 60,
            harga: 150000,
            status: 'Aktif',
            gambar: 'http://localhost:3000/uploads/konseling-individu.jpg',
        },
        create: {
            nama: 'Konseling Individual',
            jenis: 'Konseling',
            kategori: 'NonPaket',
            deskripsi: 'Sesi konseling tatap muka atau online secara pribadi dengan psikolog profesional untuk membantu mengatasi kecemasan, stres, dan pengembangan diri.',
            catatan: 'Termasuk evaluasi awal dan rangkuman rekomendasi sesi.',
            durasiMenit: 60,
            harga: 150000,
            status: 'Aktif',
            gambar: 'http://localhost:3000/uploads/konseling-individu.jpg',
        },
    });
    console.log('Layanan berhasil dibuat/diperbarui:', layanan.nama);

    // 4. Seed Psikolog (Dr. Sarah Amelia)
    const psychEmail = 'drsarah@oasejiwa.com';
    const psychPasswordHash = await bcrypt.hash('psikolog123456', 10);
    
    let psychUser = await prisma.user.findUnique({ where: { email: psychEmail } });
    if (!psychUser) {
        psychUser = await prisma.user.create({
            data: {
                email: psychEmail,
                role: 'PSYCHOLOGIST',
                isEmailVerified: true,
                isProfileComplete: true,
                authProvider: {
                    create: {
                        provider: 'local',
                        passwordHash: psychPasswordHash,
                    },
                },
            },
        });
    } else {
        await prisma.user.update({
            where: { id: psychUser.id },
            data: { role: 'PSYCHOLOGIST' },
        });
        await prisma.authProvider.updateMany({
            where: { userId: psychUser.id },
            data: { passwordHash: psychPasswordHash },
        });
    }

    let existingProfile = await prisma.psychologistProfile.findFirst();
    let psychProfileId: string;

    if (!existingProfile) {
        existingProfile = await prisma.psychologistProfile.create({
            data: {
                userId: psychUser.id,
                fullName: 'Dr. Sarah Amelia, M.Psi., Psikolog',
                sipp: '19850412-201501-2-001',
                str: '3171098452-2023',
                about: 'Psikolog Klinis berlisensi dengan pengalaman lebih dari 8 tahun dalam menangani masalah kecemasan, depresi ringan, hubungan interpersonal, dan pengembangan potensi diri.',
                avatarUrl: 'http://localhost:3000/uploads/dr-sarah.jpg',
                educations: {
                    create: [
                        {
                            degree: 'S2 Magister Psikologi Profesi',
                            institution: 'Universitas Indonesia',
                            city: 'Jakarta',
                            startYear: 2012,
                            endYear: 2015,
                        },
                    ],
                },
                specializations: {
                    create: [
                        { name: 'Konseling Dewasa' },
                        { name: 'Manajemen Stres & Kecemasan' },
                        { name: 'Pengembangan Diri' },
                    ],
                },
                expertises: {
                    create: [
                        { name: 'Cognitive Behavioral Therapy (CBT)' },
                        { name: 'Mindfulness Therapy' },
                    ],
                },
                experiences: {
                    create: [
                        { name: 'Psikolog Klinis Senior di Klinik Oase Jiwa (2018 - Sekarang)' },
                    ],
                },
            },
        });
        psychProfileId = existingProfile.id;
        console.log('Psikolog profile berhasil dibuat:', existingProfile.fullName);
    } else {
        psychProfileId = existingProfile.id;
        await prisma.psychologistProfile.update({
            where: { id: psychProfileId },
            data: {
                avatarUrl: 'http://localhost:3000/uploads/dr-sarah.jpg',
            },
        });
        console.log('Psikolog profile di-update avatarUrl-nya:', existingProfile.fullName);
    }

    // Hapus jadwal lama yang tidak terikat booking untuk mereset ke Senin, Kamis, Jumat saja
    const oldSchedules = await prisma.schedule.findMany({
        where: { psychologistId: psychProfileId },
        include: { _count: { select: { bookings: true } } },
    });

    for (const sched of oldSchedules) {
        const dayOfWeek = new Date(sched.date).getDay();
        // Hapus jika bukan Senin (1), Kamis (4), Jumat (5) dan tidak ada booking
        if (![1, 4, 5].includes(dayOfWeek) && sched._count.bookings === 0) {
            await prisma.schedule.delete({ where: { id: sched.id } });
        }
    }

    // Generate jadwal baru HANYA untuk hari Senin (1), Kamis (4), dan Jumat (5)
    const timeSlots = ['09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00'];
    const today = new Date();
    for (let i = 0; i < 30; i++) {
        const d = new Date(today);
        d.setDate(today.getDate() + i);
        const dayOfWeek = d.getDay();

        // Hanya hari Senin (1), Kamis (4), dan Jumat (5)
        if ([1, 4, 5].includes(dayOfWeek)) {
            const dateStr = d.toISOString().slice(0, 10);
            const scheduledDate = new Date(dateStr + 'T17:00:00.000Z');

            for (const startTime of timeSlots) {
                const existingSched = await prisma.schedule.findFirst({
                    where: {
                        psychologistId: psychProfileId,
                        date: scheduledDate,
                        startTime,
                    },
                });

                if (!existingSched) {
                    await prisma.schedule.create({
                        data: {
                            psychologistId: psychProfileId,
                            date: scheduledDate,
                            startTime,
                            duration: 60,
                            isAvailable: true,
                        },
                    });
                }
            }
        }
    }
    console.log('Jadwal konseling berhasil digenerate khusus hari Senin, Kamis, dan Jumat.');
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());