import {
  IsArray,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreatePsychologistNoteDto {
  @IsInt()
  @Min(1)
  sessionId!: number;

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