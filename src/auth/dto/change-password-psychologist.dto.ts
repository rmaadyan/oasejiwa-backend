import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class ChangePasswordPsychologistDto {
    @IsString()
    @IsNotEmpty({ message: 'Password lama tidak boleh kosong' })
    oldPassword: string;

    @IsString()
    @IsNotEmpty({ message: 'Password baru tidak boleh kosong' })
    @MinLength(8, { message: 'Password baru minimal 8 karakter' })
    newPassword: string;
}