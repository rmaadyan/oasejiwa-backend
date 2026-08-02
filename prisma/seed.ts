import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/**
 * 🟢 INITIAL DATABASE SEEDER (BEST PRACTICE FOR TESTING & PRODUCTION)
 *
 * Catatan Penting:
 * - Script ini HANYA berfungsi sebagai Initial Seeder (pembuat data awal).
 * - Menggunakan pengecekan findUnique() / idempotent pattern.
 * - TIDAK MENGHAPUS, TIDAK MERUBAH, dan TIDAK MEMINDAHKAN data testing yang dibuat melalui UI.
 */
async function main() {
  console.log('===================================================');
  console.log('🌱 RUNNING INITIAL DATABASE SEEDER (NON-DESTRUCTIVE)');
  console.log('===================================================\n');

  const adminHash = await bcrypt.hash('janadminJiwa01', 10);
  const userHash = await bcrypt.hash('user123456', 10);
  const psikologHash = await bcrypt.hash('psikolog123456', 10);

  // 1. Initial Admin Account
  const existingAdmin = await prisma.user.findUnique({
    where: { email: 'psikologioasejiwa@gmail.com' },
  });

  if (!existingAdmin) {
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
    console.log('✅ Initial Admin created:', admin.email);
  } else {
    console.log('ℹ️ Admin account already exists:', existingAdmin.email);
  }

  // 2. Initial User (Pasien) Account
  const existingUser = await prisma.user.findUnique({
    where: { email: 'user@oasejiwa.com' },
  });

  if (!existingUser) {
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
    console.log('✅ Initial User (Pasien) created:', user.email);
  } else {
    console.log('ℹ️ User (Pasien) account already exists:', existingUser.email);
  }

  // 3. Initial Psychologist Account
  const existingPsikolog = await prisma.user.findUnique({
    where: { email: 'drsarah@oasejiwa.com' },
  });

  if (!existingPsikolog) {
    const psikolog = await prisma.user.create({
      data: {
        email: 'drsarah@oasejiwa.com',
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
            fullName: 'Dr. Sarah Wijaya, M.Psi., Psikolog',
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
    console.log('✅ Initial Psychologist created:', psikolog.email);
  } else {
    console.log('ℹ️ Psychologist account already exists:', existingPsikolog.email);
  }

  // 4. Initial Service (Layanan)
  const existingLayanan = await prisma.layanan.findFirst({
    where: { nama: 'Konsultasi Psikologi Individu' },
  });

  if (!existingLayanan) {
    const layanan = await prisma.layanan.create({
      data: {
        nama: 'Konsultasi Psikologi Individu',
        jenis: 'Konseling',
        kategori: 'NonPaket',
        deskripsi: 'Sesi konsultasi psikologi tatap muka atau online 60 menit dengan psikolog profesional.',
        durasiMenit: 60,
        harga: 250000,
      },
    });
    console.log('✅ Initial Layanan created:', layanan.nama);
  } else {
    console.log('ℹ️ Initial Layanan already exists:', existingLayanan.nama);
  }

  console.log('\n🎉 Initial Seeding Finished! Database is ready for UI testing.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());