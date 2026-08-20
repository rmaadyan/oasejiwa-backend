import {
  IsArray,
  IsIn,
  IsInt,
  IsNotEmpty,
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
  @MaxLength(20000, { message: 'Subjective maksimal 20,000 karakter' })
  subjective!: string;

  @IsString()
  @MaxLength(20000, { message: 'Objective maksimal 20,000 karakter' })
  objective!: string;

  @IsString()
  @MaxLength(20000, { message: 'Assessment maksimal 20,000 karakter' })
  assessment!: string;

  @IsString()
  @MaxLength(20000, { message: 'Plan maksimal 20,000 karakter' })
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
  @MaxLength(20000, { message: 'Catatan tambahan maksimal 20,000 karakter' })
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

  @IsString({ message: 'Diagnosis harus berupa teks' })
  @IsNotEmpty({ message: 'Diagnosis wajib diisi.' })
  diagnosis!: string;

  @IsString({ message: 'Obat saat ini harus berupa teks' })
  @IsNotEmpty({ message: 'Obat saat ini wajib diisi.' })
  medication!: string;

  @IsOptional()
  @IsString()
  allergies?: string;
}