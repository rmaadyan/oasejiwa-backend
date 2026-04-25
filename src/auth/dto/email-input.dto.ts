import { IsEmail, IsNotEmpty } from 'class-validator';

export class EmailInputDto {
    @IsEmail({}, { message: 'Format email tidak valid' })
    @IsNotEmpty({ message: 'Email tidak boleh kosong' })
    email!: string;
}