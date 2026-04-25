import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PsychologistNotesModule } from './psychologist-notes/psychologist-notes.module';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule, PsychologistNotesModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}