import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { PsychologistNotesModule } from './psychologist-notes/psychologist-notes.module';
import { ConfigService } from './config/config.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [PrismaModule, PsychologistNotesModule],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}