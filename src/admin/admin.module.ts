import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { PrismaModule } from '../prisma/prisma.module';
import { EmailModule } from '../email/email.module'; // 🟢 1. Import EmailModule
import { PsychologistModule } from '../psychologist/psychologist.module';
import { BookingModule } from '../booking/booking.module';

@Module({
  imports: [
    PrismaModule,
    EmailModule, // 🟢 2. Masukkan ke dalam array imports
    PsychologistModule,
    BookingModule,
  ],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}