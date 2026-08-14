import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class CreatePsychologistNoteDto {
  @IsOptional()
  @IsString()
  scheduleId?: string;

  @IsOptional()
  @IsInt()
  bookingId?: number;

  @IsString()
  userId!: string;

  @IsString()
  @MaxLength(600, { message: 'Subjective maksimal 600 karakter' })
  subjective!: string;

  @IsString()
  @MaxLength(600, { message: 'Objective maksimal 600 karakter' })
  objective!: string;

  @IsString()
  @MaxLength(700, { message: 'Assessment maksimal 700 karakter' })
  assessment!: string;

  @IsString()
  @MaxLength(700, { message: 'Plan maksimal 700 karakter' })
  plan!: string;

  @IsOptional()
  @IsString()
  riskLevel?: string;

  @IsOptional()
  @IsInt()
  sessionNumber?: number;

  @IsOptional()
  @IsString()
  consultationDate?: string;

  @IsOptional()
  @IsIn(['ONGOING', 'COMPLETED', 'REFERRED'])
  consultationStatus?: 'ONGOING' | 'COMPLETED' | 'REFERRED';

  @IsOptional()
  @IsString()
  diagnosisSummary?: string;

  @IsOptional()
  @IsString()
  treatmentApproach?: string;

  @IsOptional()
  @IsString()
  recommendation?: string;

  @IsOptional()
  @IsIn(['CONTINUE_SESSION', 'REFER_TO_OTHER', 'COMPLETED'])
  followUpPlan?: 'CONTINUE_SESSION' | 'REFER_TO_OTHER' | 'COMPLETED';

  @IsOptional()
  @IsString()
  @MaxLength(200, { message: 'Catatan tambahan maksimal 200 karakter' })
  additionalNotes?: string;

  @IsOptional()
  @IsString()
  followUpDate?: string;

  @IsOptional()
  @IsString()
  nextSessionRecommendation?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  riskReason?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  riskRecommendations?: string[];

  @IsOptional()
  @IsString()
  assessingPsychologistName?: string;

  @IsOptional()
  @IsString()
  assessmentDate?: string;

  @IsOptional()
  @IsString()
  diagnosis?: string;

  @IsOptional()
  @IsString()
  medication?: string;

  @IsOptional()
  @IsString()
  allergies?: string;
}