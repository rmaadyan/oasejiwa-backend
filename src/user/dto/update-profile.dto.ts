import { IsString, IsOptional, IsDateString, IsEnum, Matches } from "class-validator";

export enum GenderDto{
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export class UpdateProfileDto{
    @IsOptional()
    @IsString()
    fullName?: string;

    @IsOptional()
    @IsDateString({}, { message: 'Format tanggal tidak valid (YYYY-MM-DD)'})
    birthday?: string;

    @IsOptional()
    @IsEnum(GenderDto, {message: 'Gender harus MALE atau FEMALE'})
    gender?:GenderDto;

    @IsOptional()
    @IsString()
    country?: string;

    @IsOptional()
    @IsString()
    city?: string;

    @IsOptional()
    @IsString()
    fullAddress?: string;

    @IsOptional()
    @IsString()
    @Matches(/^[+]?[\d\s\-()]{7,15}$/, {message:'Format nomor telepon tidak valid'})
    phone?: string;
}

