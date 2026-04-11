import { IsEmail, IsString, IsNotEmpty, IsArray, ValidateNested, IsInt, Min, ArrayMinSize, IsOptional, IsDateString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class EducationDto {
    @IsString()
    @IsNotEmpty({ message: 'Gelar tidak boleh kosong' })
    degree: string;

    @IsString()
    @IsNotEmpty({ message: 'Institusi tidak boleh kosong' })
    institution: string;

    @IsString()
    @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
    city: string;

    @Type(() => Number)
    @IsInt()
    @Min(1900)
    startYear: number;

    @Type(() => Number)
    @IsInt()
    @Min(1900)
    endYear: number;
}

export class ScheduleDto {
    @IsDateString({}, { message: 'Format tanggal tidak valid' })
    date: string;

    @IsString()
    @IsNotEmpty({ message: 'Jam mulai tidak boleh kosong' })
    startTime: string;

    @Type(() => Number)
    @IsInt()
    @Min(30, { message: 'Durasi minimal 30 menit' })
    duration: number;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}

export class CreatePsychologistDto {
    @IsEmail({}, { message: 'Format email tidak valid' })
    @IsNotEmpty({ message: 'Email tidak boleh kosong' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
    fullName: string;

    @IsString()
    @IsNotEmpty({ message: 'SIPP tidak boleh kosong' })
    sipp: string;

    @IsString()
    @IsNotEmpty({ message: 'STR tidak boleh kosong' })
    str: string;

    @IsString()
    @IsNotEmpty({ message: 'Tentang psikolog tidak boleh kosong' })
    about: string;

    @IsArray()
    @ArrayMinSize(1, { message: 'Minimal harus ada 1 pendidikan' })
    @ValidateNested({ each: true })
    @Type(() => EducationDto)
    educations: EducationDto[];

    @IsArray()
    @ArrayMinSize(1, { message: 'Minimal harus ada 1 pengalaman' })
    @IsString({ each: true })
    experiences: string[];

    @IsArray()
    @ArrayMinSize(1, { message: 'Minimal harus ada 1 spesialisasi' })
    @IsString({ each: true })
    specializations: string[];

    @IsArray()
    @ArrayMinSize(1, { message: 'Minimal harus ada 1 keahlian' })
    @IsString({ each: true })
    expertises: string[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ScheduleDto)
    schedules?: ScheduleDto[];
}