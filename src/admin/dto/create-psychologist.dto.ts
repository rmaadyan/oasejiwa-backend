import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreatePsychologistByAdminDto {
  @IsString()
  @IsNotEmpty({ message: 'Nama lengkap wajib diisi' })
  fullName!: string;

  @IsEmail({}, { message: 'Format email tidak valid' })
  @IsNotEmpty({ message: 'Email wajib diisi' })
  email!: string;

  @IsNotEmpty()
  @IsString()
  phoneNumber!: string;

  @IsString()
  @IsNotEmpty({ message: 'Nomor SIPP wajib diisi' })
  sipp!: string;

  @IsString()
  @IsOptional()
  str?: string;

  @IsString()
  @MinLength(6, { message: 'Password sementara minimal 6 karakter' })
  @IsNotEmpty({ message: 'Password sementara wajib diisi' })
  temporaryPassword!: string;
}