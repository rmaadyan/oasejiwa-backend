import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5433/oase_jiwa_db?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function syncDefaultAccounts() {
  console.log('===================================================');
  console.log('🚀 DEFAULT ACCOUNTS FULL SYNCHRONIZATION RUNNER');
  console.log('===================================================\n');

  const adminHash = await bcrypt.hash('janadminJiwa01', 10);
  const userHash = await bcrypt.hash('user123456', 10);
  const psikologHash = await bcrypt.hash('psikolog123456', 10);

  // 1. ENSURE ADMIN ACCOUNT (psikologioasejiwa@gmail.com)
  console.log('[1] Syncing Admin Account: psikologioasejiwa@gmail.com...');
  let adminUser = await prisma.user.findUnique({
    where: { email: 'psikologioasejiwa@gmail.com' },
    include: { authProvider: true },
  });

  if (!adminUser) {
    adminUser = await prisma.user.create({
      data: {
        email: 'psikologioasejiwa@gmail.com',
        role: 'ADMIN',
        isEmailVerified: true,
        isProfileComplete: true,
        authProvider: {
          create: { provider: 'local', passwordHash: adminHash },
        },
      },
      include: { authProvider: true },
    });
  } else {
    await prisma.user.update({
      where: { id: adminUser.id },
      data: { role: 'ADMIN', isEmailVerified: true, isProfileComplete: true },
    });
    if (adminUser.authProvider) {
      await prisma.authProvider.update({
        where: { id: adminUser.authProvider.id },
        data: { passwordHash: adminHash },
      });
    } else {
      await prisma.authProvider.create({
        data: { userId: adminUser.id, provider: 'local', passwordHash: adminHash },
      });
    }
  }
  console.log(`✅ Admin Account Synced. (User ID: ${adminUser.id})\n`);

  // 2. ENSURE USER ACCOUNT (user@oasejiwa.com)
  console.log('[2] Syncing User (Pasien) Account: user@oasejiwa.com...');
  let userPatient = await prisma.user.findUnique({
    where: { email: 'user@oasejiwa.com' },
    include: { authProvider: true, userProfile: true },
  });

  if (!userPatient) {
    userPatient = await prisma.user.create({
      data: {
        email: 'user@oasejiwa.com',
        role: 'USER',
        isEmailVerified: true,
        isProfileComplete: true,
        authProvider: {
          create: { provider: 'local', passwordHash: userHash },
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
      include: { authProvider: true, userProfile: true },
    });
  } else {
    await prisma.user.update({
      where: { id: userPatient.id },
      data: { role: 'USER', isEmailVerified: true, isProfileComplete: true },
    });
    if (userPatient.authProvider) {
      await prisma.authProvider.update({
        where: { id: userPatient.authProvider.id },
        data: { passwordHash: userHash },
      });
    } else {
      await prisma.authProvider.create({
        data: { userId: userPatient.id, provider: 'local', passwordHash: userHash },
      });
    }
    if (!userPatient.userProfile) {
      await prisma.userProfile.create({
        data: {
          userId: userPatient.id,
          fullName: 'Budi Santoso',
          birthday: new Date('1995-05-15'),
          gender: 'MALE',
          city: 'Jakarta',
          fullAddress: 'Jl. Sudirman No. 10, Jakarta Selatan',
          phone: '081234567890',
        },
      });
    }
  }
  console.log(`✅ User (Pasien) Account Synced. (User ID: ${userPatient.id})\n`);

  // 3. ENSURE PSIKOLOG ACCOUNT (drsarah@oasejiwa.com)
  console.log('[3] Syncing Psychologist Account: drsarah@oasejiwa.com...');
  let psikologUser = await prisma.user.findUnique({
    where: { email: 'drsarah@oasejiwa.com' },
    include: { authProvider: true, psychologistProfile: true },
  });

  // If drsarah@oasejiwa.com doesn't exist yet, check if old psikolog@oasejiwa.com exists and update it
  if (!psikologUser) {
    const oldPsikolog = await prisma.user.findUnique({
      where: { email: 'psikolog@oasejiwa.com' },
      include: { authProvider: true, psychologistProfile: true },
    });

    if (oldPsikolog) {
      psikologUser = await prisma.user.update({
        where: { id: oldPsikolog.id },
        data: { email: 'drsarah@oasejiwa.com', role: 'PSYCHOLOGIST', isEmailVerified: true, isProfileComplete: true },
        include: { authProvider: true, psychologistProfile: true },
      });
    } else {
      psikologUser = await prisma.user.create({
        data: {
          email: 'drsarah@oasejiwa.com',
          role: 'PSYCHOLOGIST',
          isEmailVerified: true,
          isProfileComplete: true,
          authProvider: {
            create: { provider: 'local', passwordHash: psikologHash },
          },
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
    }
  }

  // Ensure AuthProvider & Profile for drsarah@oasejiwa.com
  await prisma.user.update({
    where: { id: psikologUser.id },
    data: { role: 'PSYCHOLOGIST', isEmailVerified: true, isProfileComplete: true },
  });

  if (psikologUser.authProvider) {
    await prisma.authProvider.update({
      where: { id: psikologUser.authProvider.id },
      data: { passwordHash: psikologHash },
    });
  } else {
    await prisma.authProvider.create({
      data: { userId: psikologUser.id, provider: 'local', passwordHash: psikologHash },
    });
  }

  if (!psikologUser.psychologistProfile) {
    await prisma.psychologistProfile.create({
      data: {
        userId: psikologUser.id,
        fullName: 'Dr. Sarah Wijaya, M.Psi., Psikolog',
        sipp: 'SIPP-2024-001234',
        str: 'STR-PSI-2024-005678',
        about: 'Psikolog klinis dengan pengalaman lebih dari 10 tahun menangani kasus kecemasan, depresi, dan konseling keluarga.',
      },
    });
  } else {
    await prisma.psychologistProfile.update({
      where: { id: psikologUser.psychologistProfile.id },
      data: {
        fullName: 'Dr. Sarah Wijaya, M.Psi., Psikolog',
        sipp: 'SIPP-2024-001234',
        str: 'STR-PSI-2024-005678',
      },
    });
  }

  const finalPsikologProfile = await prisma.psychologistProfile.findUnique({
    where: { userId: psikologUser.id },
  });

  console.log(`✅ Psychologist Account Synced. (User ID: ${psikologUser.id}, Profile ID: ${finalPsikologProfile?.id})\n`);

  // 4. RE-LINK ALL FOREIGN KEY RELATIONS TO THE 3 DEFAULT ACCOUNTS
  console.log('[4] Re-linking All Database Foreign Key Relations to Default Accounts...');
  const targetUserId = userPatient.id;
  const targetPsikologProfileId = finalPsikologProfile!.id;

  // Find all other users in DB
  const otherUsers = await prisma.user.findMany({
    where: {
      id: {
        notIn: [adminUser.id, userPatient.id, psikologUser.id],
      },
    },
    include: {
      psychologistProfile: true,
    },
  });

  console.log(`   Found ${otherUsers.length} dummy/other accounts to clean up:`, otherUsers.map((u) => u.email));

  for (const other of otherUsers) {
    // Re-link Bookings
    await prisma.booking.updateMany({
      where: { userId: other.id },
      data: { userId: targetUserId },
    });

    if (other.psychologistProfile) {
      await prisma.booking.updateMany({
        where: { psychologistId: other.psychologistProfile.id },
        data: { psychologistId: targetPsikologProfileId },
      });
      await prisma.sessionNote.updateMany({
        where: { psychologistProfileId: other.psychologistProfile.id },
        data: { psychologistProfileId: targetPsikologProfileId },
      });
      await prisma.schedule.updateMany({
        where: { psychologistId: other.psychologistProfile.id },
        data: { psychologistId: targetPsikologProfileId },
      });
      await prisma.education.updateMany({
        where: { psychologistId: other.psychologistProfile.id },
        data: { psychologistId: targetPsikologProfileId },
      });
      await prisma.experience.updateMany({
        where: { psychologistId: other.psychologistProfile.id },
        data: { psychologistId: targetPsikologProfileId },
      });
      await prisma.specialization.updateMany({
        where: { psychologistId: other.psychologistProfile.id },
        data: { psychologistId: targetPsikologProfileId },
      });
      await prisma.expertise.updateMany({
        where: { psychologistId: other.psychologistProfile.id },
        data: { psychologistId: targetPsikologProfileId },
      });
    }

    // Re-link SessionNotes, OfficialMedicalRecords, TesResults, EmergencyContacts, Reviews
    await prisma.sessionNote.updateMany({
      where: { userId: other.id },
      data: { userId: targetUserId },
    });
    await prisma.officialMedicalRecord.updateMany({
      where: { userId: other.id },
      data: { userId: targetUserId },
    });
    await prisma.tesResult.updateMany({
      where: { userId: other.id },
      data: { userId: targetUserId },
    });
    await prisma.emergencyContact.updateMany({
      where: { userId: other.id },
      data: { userId: targetUserId },
    });
    await prisma.bookingReview.updateMany({
      where: { userId: other.id },
      data: { userId: targetUserId },
    });

    // Delete unique child records of other user before deleting user
    await prisma.patientMedicalRecord.deleteMany({ where: { userId: other.id } });
    await prisma.authProvider.deleteMany({ where: { userId: other.id } });
    await prisma.userProfile.deleteMany({ where: { userId: other.id } });
    if (other.psychologistProfile) {
      await prisma.psychologistProfile.delete({ where: { id: other.psychologistProfile.id } });
    }
    await prisma.user.delete({ where: { id: other.id } });
    console.log(`   Deleted dummy user: ${other.email}`);
  }

  console.log('\n[5] Verifying Final User Table State in PostgreSQL DB...');
  const finalUsers = await prisma.user.findMany({
    include: {
      authProvider: true,
      userProfile: true,
      psychologistProfile: true,
    },
  });

  console.log('===================================================');
  console.log('📊 FINAL ACCOUNTS IN DATABASE (MUST BE EXACTLY 3):');
  console.log('===================================================');
  console.log(JSON.stringify(
    finalUsers.map((u) => ({
      id: u.id,
      email: u.email,
      role: u.role,
      fullName: u.userProfile?.fullName || u.psychologistProfile?.fullName || 'Admin',
      provider: u.authProvider?.provider,
      hasPasswordHash: !!u.authProvider?.passwordHash,
    })),
    null,
    2
  ));

  if (finalUsers.length === 3) {
    console.log('\n🎉 SUCCESS: EXACTLY 3 DEFAULT ACCOUNTS SYNCHRONIZED PERFECTLY!');
  } else {
    console.error(`\n❌ ERROR: DB has ${finalUsers.length} users, expected exactly 3.`);
  }
}

syncDefaultAccounts()
  .catch((e) => console.error('❌ Error during account sync:', e))
  .finally(() => prisma.$disconnect());
