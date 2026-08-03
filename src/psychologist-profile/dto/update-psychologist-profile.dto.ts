import {
  IsArray,
  IsBoolean,
  IsInt,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

// 1. DTO Pendidikan
export class EducationDto {
  @IsOptional()
  @IsString()
  degree?: string;

  @IsOptional()
  @IsString()
  institution?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  startYear?: string;

  @IsOptional()
  @IsString()
  endYear?: string;
}

// 2. DTO Jadwal Praktik
export class ScheduleDto {
  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  startTime?: string;

  @IsOptional()
  @IsInt()
  duration?: number;

  @IsOptional()
  @IsBoolean()
  isAvailable?: boolean;
}

// 3. DTO Utama Profil Psikolog
export class UpdatePsychologistProfileDto {
  @IsOptional()
  @IsString()
  fullName?: string;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  @IsString()
  sipp?: string;

  @IsOptional()
  @IsString()
  str?: string;

  @IsOptional()
  @IsString()
  about?: string;

  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  specializations?: string[];

  // 🟢 Disesuaikan agar `schedules` terdaftar dan tidak melempar error TypeScript
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ScheduleDto)
  schedules?: ScheduleDto[];

  // 🟢 `education` tanpa huruf 's'
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EducationDto)
  education?: EducationDto[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  experiences?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  expertises?: string[];

  @IsOptional()
  @IsString()
  signatureUrl?: string;

  @IsOptional()
  @IsString()
  signatureMethod?: string;

  @IsOptional()
  @IsBoolean()
  clearSignature?: boolean;
}