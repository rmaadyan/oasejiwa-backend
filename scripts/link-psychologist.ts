import { PrismaClient } from '../prisma/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const targetEmail = process.argv[2] || 'psikolog@oasejiwa.com';
  const password = process.argv[3] || 'psikolog123456';

  console.log(`[Script] Menghubungkan profil psikolog ke email: ${targetEmail}...`);

  const passwordHash = await bcrypt.hash(password, 10);

  // 1. Dapatkan / Buat User Psikolog dengan email target
  let user = await prisma.user.findUnique({ where: { email: targetEmail } });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: targetEmail,
        role: 'PSYCHOLOGIST',
        isEmailVerified: true,
        isProfileComplete: true,
        authProvider: {
          create: {
            provider: 'local',
            passwordHash,
          },
        },
      },
    });
    console.log(`✓ User baru ber-role PSYCHOLOGIST dibuat: ${user.email}`);
  } else {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'PSYCHOLOGIST' },
    });
    await prisma.authProvider.updateMany({
      where: { userId: user.id },
      data: { passwordHash },
    });
    console.log(`✓ User ${user.email} di-update role → PSYCHOLOGIST & password di-reset`);
  }

  // 2. Hubungkan PsychologistProfile ke user.id ini
  let profile = await prisma.psychologistProfile.findFirst();

  if (profile) {
    await prisma.psychologistProfile.update({
      where: { id: profile.id },
      data: { userId: user.id },
    });
    console.log(`✓ PsychologistProfile (${profile.fullName}) berhasil dihubungkan ke User ID: ${user.id} (${user.email})`);
  } else {
    profile = await prisma.psychologistProfile.create({
      data: {
        userId: user.id,
        fullName: 'Dr. Sarah Amelia, M.Psi., Psikolog',
        sipp: '19850412-201501-2-001',
        str: '3171098452-2023',
        about: 'Psikolog Klinis berlisensi dengan pengalaman lebih dari 8 tahun dalam menangani masalah kecemasan, depresi ringan, hubungan interpersonal, dan pengembangan potensi diri.',
        avatarUrl: 'http://localhost:3000/uploads/dr-sarah.jpg',
      },
    });
    console.log(`✓ PsychologistProfile baru dibuat & dihubungkan ke User ID: ${user.id} (${user.email})`);
  }

  console.log(`
==================================================
AKUN PSIKOLOG SIAP DIGUNAKAN!
Email    : ${targetEmail}
Password : ${password}
==================================================
  `);
}

main()
  .catch((e) => {
    console.error('Error executing link-psychologist script:', e);
  })
  .finally(() => prisma.$disconnect());
