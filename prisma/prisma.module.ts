import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Membuat module ini tersedia secara global tanpa perlu import berulang kali
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}