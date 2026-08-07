import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty({ message: 'Kata sandi saat ini tidak boleh kosong' })
  currentPassword!: string;

  @IsString()
  @IsNotEmpty({ message: 'Kata sandi baru tidak boleh kosong' })
  @MinLength(6, { message: 'Kata sandi baru minimal 6 karakter' })
  newPassword!: string;
}