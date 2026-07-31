import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function check() {
  const notesCount = await prisma.sessionNote.count();
  console.log('Total SessionNote rows:', notesCount);

  const uniquePatients = await prisma.sessionNote.findMany({
    where: { deletedAt: null },
    distinct: ['userId'],
    select: { userId: true },
  });
  console.log('Unique Patients count:', uniquePatients.length);
}

check().catch(console.error).finally(() => prisma.$disconnect());
