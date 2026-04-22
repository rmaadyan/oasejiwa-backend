import { Transform } from 'class-transformer';
import { IsIn, IsOptional, IsString, Min } from 'class-validator';

export class QueryPsychologistNoteDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsIn(['low', 'medium', 'high', 'all'])
  riskLevel?: 'low' | 'medium' | 'high' | 'all' = 'all';

  @IsOptional()
  @IsString()
  dateFrom?: string;

  @IsOptional()
  @IsString()
  dateTo?: string;

  @IsOptional()
  @IsIn(['date', 'patient', 'riskLevel'])
  sortBy?: 'date' | 'patient' | 'riskLevel' = 'date';

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  @Min(1)
  limit?: number = 10;
}