import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  birthday?: string;

  @IsString({ message: 'Pilihan gender harus berupa teks' })
  @IsOptional()
  gender?: string;

  @IsString()
  @IsOptional()
  country?: string;

  @IsString()
  @IsOptional()
  city?: string;

  @IsString()
  @IsOptional()
  fullAddress?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  // ✅ TAMBAHKAN DUA BARIS INI DI BACKEND:
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}