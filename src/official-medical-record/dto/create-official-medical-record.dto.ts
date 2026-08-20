import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString, IsEnum, MaxLength } from 'class-validator';
import { RiskLevel } from '@prisma/client';

export class CreateOfficialMedicalRecordDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsOptional()
  @IsInt()
  bookingId?: number;

  @IsOptional()
  @IsString()
  sessionNoteId?: string;

  @IsOptional()
  @IsInt()
  sessionNumber?: number;

  @IsOptional()
  @IsDateString()
  consultationDate?: string;

  @IsString()
  @IsNotEmpty()
  diagnosis: string;

  @IsOptional()
  @IsString()
  currentMedication?: string;

  @IsOptional()
  @IsString()
  allergies?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20000, { message: 'Ringkasan masalah maksimal 20,000 karakter' })
  problemSummary: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20000, { message: 'Pendekatan terapi maksimal 20,000 karakter' })
  therapyApproach: string;

  @IsString()
  @IsNotEmpty()
  followUpPlan: string;

  @IsOptional()
  @IsDateString()
  nextSessionDate?: string;

  @IsOptional()
  @IsString()
  @MaxLength(20000, { message: 'Catatan tambahan maksimal 20,000 karakter' })
  additionalNotes?: string;

  @IsOptional()
  @IsEnum(RiskLevel)
  riskLevel?: RiskLevel;

  @IsOptional()
  @IsString()
  riskReason?: string;

  @IsOptional()
  @IsDateString()
  followUpDate?: string;

  @IsOptional()
  @IsString()
  nextSessionRecommendation?: string;
}
