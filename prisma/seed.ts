import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import 'dotenv/config';

const prisma = new PrismaClient();

async function main() {
    const existingAdmin = await prisma.user.findUnique({
        where: { email: 'psikologioasejiwa@gmail.com' },
    });

    if (existingAdmin) {
        console.log('Admin sudah ada');
        return;
    }

    const passwordHash = await bcrypt.hash('OaseAdmin^jiwa@1162', 10);

    const admin = await prisma.user.create({
        data: {
            email: 'psikologioasejiwa@gmail.com',
            role: 'ADMIN',
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

    console.log('Admin berhasil dibuat:', admin.email);
}

main()
.catch(console.error)
.finally(() => prisma.$disconnect());