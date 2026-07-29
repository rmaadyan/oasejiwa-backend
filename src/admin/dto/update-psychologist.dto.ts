import { IsString, IsOptional, IsArray, ValidateNested, IsInt, Min, ArrayMinSize, IsDateString, IsBoolean, IsEmail } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateEducationDto {
    @IsOptional()
    @IsString()
    id?: string;

    @IsString()
    @IsOptional()
    degree?: string;

    @IsString()
    @IsOptional()
    institution?: string;

    @IsString()
    @IsOptional()
    city?: string;

    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(1900)
    startYear?: number;

    @Type(() => Number)
    @IsInt()
    @IsOptional()
    @Min(1900)
    endYear?: number;
}

export class UpdateScheduleDto {
    @IsOptional()
    @IsDateString({}, { message: 'Format tanggal tidak valid' })
    date?: string;

    @IsOptional()
    @IsString()
    startTime?: string;

    @Type(() => Number)
    @IsOptional()
    @IsInt()
    @Min(30)
    duration?: number;

    @IsOptional()
    @IsBoolean()
    isAvailable?: boolean;
}

export class UpdatePsychologistDto {
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsString()
    @IsEmail({}, {message: 'Format email tidak valid'})
    email?: string;

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
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateEducationDto)
    educations?: UpdateEducationDto[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    experiences?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    specializations?: string[];

    @IsOptional()
    @IsArray()
    @IsString({ each: true })
    expertises?: string[];

    @IsOptional()
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => UpdateScheduleDto)
    schedules?: UpdateScheduleDto[];
}