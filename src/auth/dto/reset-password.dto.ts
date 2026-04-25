import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty({ message: 'Token tidak boleh kosong' })
    token!: string;

    @IsString()
    @IsNotEmpty({ message: 'Password tidak boleh kosong' })
    @MinLength(8, { message: 'Password minimal 8 karakter' })
    @MaxLength(64, {message: 'Password maksimal 64 karakter'})
    newPassword!: string;
}