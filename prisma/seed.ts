import { PrismaClient } from './generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const adminHash = await bcrypt.hash('OaseAdmin^jiwa@1162', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'psikologioasejiwa@gmail.com' },
    update: {},
    create: {
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

  console.log('Admin siap:', admin.email);

  const psychologistHash = await bcrypt.hash('12345678', 10);

  const psychologistUser = await prisma.user.upsert({
    where: { email: 'psikolog1@test.com' },
    update: {},
    create: {
      email: 'psikolog1@test.com',
      role: 'PSYCHOLOGIST',
      isEmailVerified: true,
      isProfileComplete: true,
      isFirstLogin: false,
      authProvider: {
        create: {
          provider: 'local',
          passwordHash: psychologistHash,
        },
      },
      psychologistProfile: {
        create: {
          fullName: 'Psikolog Dummy',
          sipp: 'SIPP-DUMMY-001',
          str: 'STR-DUMMY-001',
          about: 'Psikolog dummy untuk testing integrasi.',
          educations: {
            create: [
              {
                degree: 'S2 Psikologi Profesi',
                institution: 'Universitas Dummy',
                city: 'Surabaya',
                startYear: 2018,
                endYear: 2020,
              },
            ],
          },
          experiences: {
            create: [
              {
                name: 'Konselor dummy 5 tahun',
              },
            ],
          },
          specializations: {
            create: [{ name: 'Anxiety' }, { name: 'Stress Management' }],
          },
          expertises: {
            create: [{ name: 'CBT' }],
          },
          schedules: {
            create: [
              {
                date: new Date('2026-05-01T00:00:00.000Z'),
                startTime: '09:00',
                duration: 60,
                isAvailable: true,
              },
              {
                date: new Date('2026-05-02T00:00:00.000Z'),
                startTime: '13:00',
                duration: 60,
                isAvailable: true,
              },
            ],
          },
        },
      },
    },
  });

  console.log('Psikolog siap:', psychologistUser.email);

  const patientHash = await bcrypt.hash('12345678', 10);

  const patient = await prisma.user.upsert({
    where: { email: 'user@test.com' },
    update: {},
    create: {
      email: 'user@test.com',
      role: 'USER',
      isEmailVerified: true,
      isProfileComplete: true,
      authProvider: {
        create: {
          provider: 'local',
          passwordHash: patientHash,
        },
      },
      userProfile: {
        create: {
          fullName: 'User Dummy',
          birthday: new Date('2002-01-01T00:00:00.000Z'),
          gender: 'FEMALE',
          country: 'Indonesia',
          city: 'Surabaya',
          fullAddress: 'Alamat dummy untuk testing',
          phone: '081234567890',
        },
      },
      medicalRecord: {
        create: {
          diagnosis: ['Anxiety'],
          currentMedication: ['Tidak ada'],
          allergies: ['Tidak ada'],
        },
      },
      emergencyContacts: {
        create: [
          {
            name: 'Kontak Darurat Dummy',
            phone: '081111111111',
            relation: 'Keluarga',
          },
        ],
      },
    },
  });

  console.log('User pasien siap:', patient.email);

  const layanan = await prisma.layanan.upsert({
    where: { nama: 'Konseling Individu Dummy' },
    update: {},
    create: {
      nama: 'Konseling Individu Dummy',
      jenis: 'Konseling',
      kategori: 'NonPaket',
      deskripsi: 'Layanan dummy untuk testing booking.',
      catatan: 'Data seed dummy.',
      durasiMenit: 60,
      harga: 150000,
      status: 'Aktif',
      gambar: null,
    },
  });

  console.log('Layanan siap:', layanan.nama);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());