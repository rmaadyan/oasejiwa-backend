import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
    // ========== 1. ADMIN ==========
    const existingAdmin = await prisma.user.findUnique({
        where: { email: 'psikologioasejiwa@gmail.com' },
    });

    if (existingAdmin) {
        console.log('✅ Admin sudah ada');
    } else {
        const adminHash = await bcrypt.hash('janadminJiwa01', 10);
        const admin = await prisma.user.create({
            data: {
                email: 'psikologioasejiwa@gmail.com',
                role: 'ADMIN',
                isEmailVerified: true,
                isProfileComplete: true,
                authProvider: {
                    create: {
                        provider: 'local',
                        passwordHash: adminHash,
                    },
                },
            },
        });
        console.log('✅ Admin berhasil dibuat:', admin.email);
    }

    // ========== 2. USER ==========
    const existingUser = await prisma.user.findUnique({
        where: { email: 'user@oasejiwa.com' },
    });

    if (existingUser) {
        console.log('✅ User sudah ada');
    } else {
        const userHash = await bcrypt.hash('password123', 10);
        const user = await prisma.user.create({
            data: {
                email: 'user@oasejiwa.com',
                role: 'USER',
                isEmailVerified: true,
                isProfileComplete: true,
                authProvider: {
                    create: {
                        provider: 'local',
                        passwordHash: userHash,
                    },
                },
                userProfile: {
                    create: {
                        fullName: 'Budi Santoso',
                        birthday: new Date('1995-05-15'),
                        gender: 'MALE',
                        city: 'Jakarta',
                        fullAddress: 'Jl. Sudirman No. 10, Jakarta Selatan',
                        phone: '081234567890',
                    },
                },
            },
        });
        console.log('✅ User berhasil dibuat:', user.email);
    }

    // ========== 2b. USER SITI RAHMAWATI ==========
    const existingUserSiti = await prisma.user.findUnique({
        where: { email: 'siti.rahmawati@example.com' },
    });

    if (existingUserSiti) {
        console.log('✅ User Siti Rahmawati sudah ada');
    } else {
        const userHash = await bcrypt.hash('password123', 10);
        const userSiti = await prisma.user.create({
            data: {
                email: 'siti.rahmawati@example.com',
                role: 'USER',
                isEmailVerified: true,
                isProfileComplete: true,
                authProvider: {
                    create: {
                        provider: 'local',
                        passwordHash: userHash,
                    },
                },
                userProfile: {
                    create: {
                        fullName: 'Siti Rahmawati',
                        birthday: new Date('1999-09-22'),
                        gender: 'FEMALE',
                        city: 'Jakarta Selatan',
                        fullAddress: 'Jl. Gatot Subroto No. 88, Jakarta Selatan',
                        phone: '0821-9876-5432',
                    },
                },
            },
        });
        console.log('✅ User Siti Rahmawati berhasil dibuat:', userSiti.email);
    }

    // ========== 3. PSYCHOLOGIST ==========
    const existingPsychologist = await prisma.user.findUnique({
        where: { email: 'psikolog@oasejiwa.com' },
    });

    if (existingPsychologist) {
        console.log('✅ Psikolog sudah ada');
    } else {
        const psikologHash = await bcrypt.hash('password123', 10);
        const psikolog = await prisma.user.create({
            data: {
                email: 'psikolog@oasejiwa.com',
                role: 'PSYCHOLOGIST',
                isEmailVerified: true,
                isProfileComplete: true,
                isFirstLogin: false,
                authProvider: {
                    create: {
                        provider: 'local',
                        passwordHash: psikologHash,
                    },
                },
                psychologistProfile: {
                    create: {
                        fullName: 'Dr. Ani Wijaya, M.Psi., Psikolog',
                        sipp: 'SIPP-2024-001234',
                        str: 'STR-PSI-2024-005678',
                        about: 'Psikolog klinis dengan pengalaman lebih dari 10 tahun menangani kasus kecemasan, depresi, dan konseling keluarga.',
                        educations: {
                            create: [
                                {
                                    degree: 'S1 Psikologi',
                                    institution: 'Universitas Indonesia',
                                    city: 'Depok',
                                    startYear: 2008,
                                    endYear: 2012,
                                },
                                {
                                    degree: 'S2 Profesi Psikolog Klinis',
                                    institution: 'Universitas Gadjah Mada',
                                    city: 'Yogyakarta',
                                    startYear: 2012,
                                    endYear: 2014,
                                },
                            ],
                        },
                        experiences: {
                            create: [
                                { name: 'Psikolog Klinis di RS Jiwa Dr. Soeharto Heerdjan (2014-2020)' },
                                { name: 'Konsultan Psikologi di Klinik Oase Jiwa (2020-sekarang)' },
                            ],
                        },
                        specializations: {
                            create: [
                                { name: 'Psikologi Klinis' },
                                { name: 'Konseling Keluarga' },
                            ],
                        },
                        expertises: {
                            create: [
                                { name: 'Kecemasan & Depresi' },
                                { name: 'Trauma & PTSD' },
                                { name: 'Konseling Pernikahan' },
                            ],
                        },
                    },
                },
            },
        });
        console.log('✅ Psikolog berhasil dibuat:', psikolog.email);
    }

    // ========== 4. SAMPLE DATA FOR REKAM MEDIS DIGITAL ==========
    // 4a. Layanan
    let layanan = await prisma.layanan.findFirst({ where: { nama: 'Konsultasi Psikologi Individu' } });
    if (!layanan) {
        layanan = await prisma.layanan.create({
            data: {
                nama: 'Konsultasi Psikologi Individu',
                jenis: 'Konseling',
                kategori: 'NonPaket',
                deskripsi: 'Sesi konsultasi psikologi tatap muka atau online 60 menit dengan psikolog profesional.',
                durasiMenit: 60,
                harga: 250000,
            },
        });
        console.log('✅ Layanan berhasil dibuat:', layanan.nama);
    }

    // Get created user & psikolog profile IDs
    const userObj = await prisma.user.findUnique({ where: { email: 'user@oasejiwa.com' } });
    const psikologUserObj = await prisma.user.findUnique({
        where: { email: 'psikolog@oasejiwa.com' },
        include: { psychologistProfile: true },
    });

    if (userObj && psikologUserObj?.psychologistProfile) {
        const psikologProfileId = psikologUserObj.psychologistProfile.id;

        // 4b. Booking
        let booking = await prisma.booking.findFirst({ where: { userId: userObj.id } });
        if (!booking) {
            booking = await prisma.booking.create({
                data: {
                    bookingCode: 'OJ-20260726-001',
                    userId: userObj.id,
                    psychologistId: psikologProfileId,
                    serviceId: layanan.id,
                    scheduledDate: new Date('2026-07-26'),
                    scheduledTime: '10:00 - 11:00',
                    totalPrice: 250000,
                    dpAmount: 100000,
                    remainingAmount: 150000,
                    status: 'COMPLETED',
                    consultationForm: {
                        create: {
                            mainReason: 'Mengalami kecemasan berlebih saat menghadapi deadline pekerjaan di kantor.',
                            takingPsychiatricMeds: false,
                            problemDuration: 'ONE_TO_3_MONTHS',
                            symptomFrequency: 'WEEKLY',
                            dailyImpact: 'MODERATE',
                            hasSimilarHistory: false,
                            hasFamilyHistory: false,
                            hasMedicalTreatment: false,
                            hasTraumaticEvent: false,
                            sleepQuality: 'POOR',
                            selfHarmThoughts: 'NEVER',
                            usesAddictiveSubstances: false,
                            eatingPattern: 'IRREGULAR',
                            exerciseFrequency: 'RARELY',
                            stressLevel: 'HIGH',
                            consultationGoals: ['Mengurangi rasa cemas', 'Mengatur pola tidur'],
                            therapyPreference: 'COLLABORATIVE',
                        },
                    },
                },
            });
            console.log('✅ Booking & ConsultationForm berhasil dibuat');
        }

        // 4c. Tes Psikologi & Hasil Tes
        let tes = await prisma.tes.findFirst({ where: { nama: 'Tes Tingkat Kecemasan (GAD-7)' } });
        if (!tes) {
            tes = await prisma.tes.create({
                data: {
                    nama: 'Tes Tingkat Kecemasan (GAD-7)',
                    jumlah: 7,
                    status: 'Aktif',
                    deskripsi: 'Skala pengukur tingkat kecemasan umum.',
                    penjelasanHasil: 'Hasil mengukur tingkat keparahan gejala kecemasan.',
                    jenis: 'Kecemasan',
                },
            });
        }

        const existingTesResult = await prisma.tesResult.findFirst({ where: { userId: userObj.id } });
        if (!existingTesResult) {
            await prisma.tesResult.create({
                data: {
                    userId: userObj.id,
                    tesId: tes.id,
                    namaTes: 'Tes Tingkat Kecemasan (GAD-7)',
                    totalScore: 14,
                    maxScore: 21,
                    percentage: 66.7,
                    kategoriNama: 'Kecemasan Sedang (Moderate Anxiety)',
                },
            });
            console.log('✅ TesResult berhasil dibuat');
        }

        // 4d. Session Note / Rekam Medis Digital (Budi Santoso)
        const existingNote = await prisma.sessionNote.findFirst({ where: { userId: userObj.id } });
        if (!existingNote) {
            await prisma.sessionNote.create({
                data: {
                    psychologistProfileId: psikologProfileId,
                    userId: userObj.id,
                    bookingId: booking.id,
                    sessionNumber: 1,
                    consultationDate: new Date('2026-07-26'),
                    consultationStatus: 'ONGOING',
                    subjective: 'Pasien mengeluhkan kecemasan dan sesak dada saat beban kerja meningkat.',
                    objective: 'Kontak mata baik, tampak gelisah, sesekali meremas tangan.',
                    assessment: 'Kecemasan sedang terkondisi oleh tekanan pekerjaan (Work Stress & Anxiety).',
                    plan: 'Edukasi teknik pernapasan diafragma &Cognitive Restructuring.',
                    diagnosisSummary: 'Kecemasan sedang terkondisi oleh tekanan beban kerja.',
                    treatmentApproach: 'Cognitive Behavioral Therapy (CBT) & Teknik Relaxation Breathing.',
                    recommendation: 'Lanjutkan ke sesi 2 untuk evaluasi latihan pernapasan.',
                    followUpPlan: 'CONTINUE_SESSION',
                    followUpDate: new Date('2026-08-02'),
                    additionalNotes: 'Pasien kooperatif dan termotivasi tinggi untuk pulih.',
                    riskLevel: 'MEDIUM',
                    tags: ['Kecemasan', 'CBT', 'Work Stress'],
                },
            });
            console.log('✅ Rekam Medis Digital Budi Santoso (SessionNote) berhasil dibuat');
        }

        // 4e. Session Note / Rekam Medis Digital (Siti Rahmawati)
        const sitiObj = await prisma.user.findUnique({ where: { email: 'siti.rahmawati@example.com' } });
        if (sitiObj) {
            const existingSitiNote = await prisma.sessionNote.findFirst({ where: { userId: sitiObj.id } });
            if (!existingSitiNote) {
                await prisma.sessionNote.create({
                    data: {
                        psychologistProfileId: psikologProfileId,
                        userId: sitiObj.id,
                        sessionNumber: 1,
                        consultationDate: new Date('2026-07-20'),
                        consultationStatus: 'COMPLETED',
                        subjective: 'Pasien mengeluhkan penurunan mood dan gangguan tidur selama 1 bulan terakhir.',
                        objective: 'Afek hipotimik, kontak mata sedang, kooperatif.',
                        assessment: 'Gangguan Depresi Ringan - Sedang (Mild to Moderate Depression).',
                        plan: 'Behavioral Activation Journal dan konseling 2 minggu sekali.',
                        diagnosisSummary: 'Gangguan Depresi Ringan - Sedang.',
                        treatmentApproach: 'Behavioral Activation Therapy dan Cognitive Restructuring.',
                        recommendation: 'Latihan relaksasi diafragma sebelum tidur.',
                        followUpPlan: 'CONTINUE_SESSION',
                        followUpDate: new Date('2026-08-03'),
                        additionalNotes: 'Pasien sangat kooperatif.',
                        riskLevel: 'MEDIUM',
                        tags: ['Depresi', 'Behavioral Activation'],
                    },
                });
                console.log('✅ Rekam Medis Digital Siti Rahmawati (SessionNote) berhasil dibuat');
            }
        }
    }

    console.log('\n🎉 Seeding lengkap selesai!');
}

main()
.catch(console.error)
.finally(() => prisma.$disconnect());