import { PartialType } from '@nestjs/mapped-types';
import { CreatePsychologistNoteDto } from './create-psychologist-note.dto';

export class UpdatePsychologistNoteDto extends PartialType(
  CreatePsychologistNoteDto,
) {}