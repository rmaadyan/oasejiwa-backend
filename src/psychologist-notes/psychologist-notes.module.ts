import { Module } from '@nestjs/common';
import { PsychologistNotesController } from './psychologist-notes.controller';
import { PsychologistNotesService } from './psychologist-notes.service';

@Module({
  controllers: [PsychologistNotesController],
  providers: [PsychologistNotesService],
})
export class PsychologistNotesModule {}
