import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function syncDefaultAccounts() {
  console.log('===================================================');
  console.log('🚀 STANDALONE DATABASE CLEANUP & SYNCHRONIZATION');
  console.log('===================================================\n');

  const adminHash = await bcrypt.hash('janadminJiwa01', 10);
  const userHash = await bcrypt.hash('user123456', 10);
  const psikologHash = await bcrypt.hash('psikolog123456', 10);

  // 1. Admin Account Sync
  let admin = await prisma.user.findUnique({
    where: { email: 'psikologioasejiwa@gmail.com' },
    include: { authProvider: true },
  });
  if (admin) {
    await prisma.user.update({
      where: { id: admin.id },
      data: { role: 'ADMIN', isEmailVerified: true, isProfileComplete: true },
    });
    if (admin.authProvider) {
      await prisma.authProvider.update({
        where: { id: admin.authProvider.id },
        data: { passwordHash: adminHash },
      });
    }
  } else {
    admin = await prisma.user.create({
      data: {
        email: 'psikologioasejiwa@gmail.com',
        role: 'ADMIN',
        isEmailVerified: true,
        isProfileComplete: true,
        authProvider: { create: { provider: 'local', passwordHash: adminHash } },
      },
      include: { authProvider: true },
    });
  }

  // 2. User Account Sync
  let user = await prisma.user.findUnique({
    where: { email: 'user@oasejiwa.com' },
    include: { authProvider: true, userProfile: true },
  });
  if (user) {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: 'USER', isEmailVerified: true, isProfileComplete: true },
    });
    if (user.authProvider) {
      await prisma.authProvider.update({
        where: { id: user.authProvider.id },
        data: { passwordHash: userHash },
      });
    }
  } else {
    user = await prisma.user.create({
      data: {
        email: 'user@oasejiwa.com',
        role: 'USER',
        isEmailVerified: true,
        isProfileComplete: true,
        authProvider: { create: { provider: 'local', passwordHash: userHash } },
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
      include: { authProvider: true, userProfile: true },
    });
  }

  // 3. Psychologist Account Sync
  let psikolog = await prisma.user.findUnique({
    where: { email: 'drsarah@oasejiwa.com' },
    include: { authProvider: true, psychologistProfile: true },
  });
  if (!psikolog) {
    psikolog = await prisma.user.create({
      data: {
        email: 'drsarah@oasejiwa.com',
        role: 'PSYCHOLOGIST',
        isEmailVerified: true,
        isProfileComplete: true,
        authProvider: { create: { provider: 'local', passwordHash: psikologHash } },
        psychologistProfile: {
          create: {
            fullName: 'Dr. Sarah Wijaya, M.Psi., Psikolog',
            sipp: 'SIPP-2024-001234',
            str: 'STR-PSI-2024-005678',
            about: 'Psikolog klinis dengan pengalaman lebih dari 10 tahun menangani kasus kecemasan, depresi, dan konseling keluarga.',
          },
        },
      },
      include: { authProvider: true, psychologistProfile: true },
    });
  } else {
    if (psikolog.authProvider) {
      await prisma.authProvider.update({
        where: { id: psikolog.authProvider.id },
        data: { passwordHash: psikologHash },
      });
    }
  }

  const psikologProfile = await prisma.psychologistProfile.findUnique({ where: { userId: psikolog.id } });

  // 4. Re-link relations & delete unneeded dummy users
  const targetUserId = user.id;
  const targetPsikologProfileId = psikologProfile!.id;

  const otherUsers = await prisma.user.findMany({
    where: {
      id: { notIn: [admin.id, user.id, psikolog.id] },
    },
    include: { psychologistProfile: true },
  });

  for (const other of otherUsers) {
    await prisma.booking.updateMany({ where: { userId: other.id }, data: { userId: targetUserId } });
    if (other.psychologistProfile) {
      await prisma.booking.updateMany({ where: { psychologistId: other.psychologistProfile.id }, data: { psychologistId: targetPsikologProfileId } });
      await prisma.sessionNote.updateMany({ where: { psychologistProfileId: other.psychologistProfile.id }, data: { psychologistProfileId: targetPsikologProfileId } });
      await prisma.schedule.updateMany({ where: { psychologistId: other.psychologistProfile.id }, data: { psychologistId: targetPsikologProfileId } });
    }
    await prisma.sessionNote.updateMany({ where: { userId: other.id }, data: { userId: targetUserId } });
    await prisma.officialMedicalRecord.updateMany({ where: { userId: other.id }, data: { userId: targetUserId } });
    await prisma.tesResult.updateMany({ where: { userId: other.id }, data: { userId: targetUserId } });
    await prisma.emergencyContact.updateMany({ where: { userId: other.id }, data: { userId: targetUserId } });
    await prisma.bookingReview.updateMany({ where: { userId: other.id }, data: { userId: targetUserId } });

    await prisma.patientMedicalRecord.deleteMany({ where: { userId: other.id } });
    await prisma.authProvider.deleteMany({ where: { userId: other.id } });
    await prisma.userProfile.deleteMany({ where: { userId: other.id } });
    if (other.psychologistProfile) {
      await prisma.psychologistProfile.delete({ where: { id: other.psychologistProfile.id } });
    }
    await prisma.user.delete({ where: { id: other.id } });
    console.log('🧹 Cleaned up dummy user:', other.email);
  }

  console.log('✅ Standalone database synchronization completed.');
}

syncDefaultAccounts()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
