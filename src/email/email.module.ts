import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  exports: [EmailService], // 👈 Wajib ada agar module lain (AdminModule & PsychologistModule) bisa pakai EmailService
})
export class EmailModule {}