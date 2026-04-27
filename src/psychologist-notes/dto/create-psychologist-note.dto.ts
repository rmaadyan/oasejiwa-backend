import {
  IsArray,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePsychologistNoteDto {
  @IsOptional()
  @IsString()
  scheduleId?: string;

  @IsString()
  userId!: string;

  @IsString()
  subjective!: string;

  @IsString()
  objective!: string;

  @IsString()
  assessment!: string;

  @IsString()
  plan!: string;

  @IsOptional()
  @IsIn(['low', 'medium', 'high'])
  riskLevel?: 'low' | 'medium' | 'high';

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
}