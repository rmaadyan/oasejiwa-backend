import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { EmailModule } from '../email/email.module'; // 👈 1. Import EmailModule

@Module({
    imports: [
      PrismaModule, 
      AuthModule, 
      EmailModule, // 👈 2. Tambahkan EmailModule di sini
    ],
    controllers: [BookingController],
    providers: [BookingService],
    exports: [BookingService],
})
export class BookingModule {}