import {IsEmail, IsString, IsNotEmpty, MinLength, IsDateString, IsEnum} from 'class-validator';

export enum GenderDto {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export class RegisterDto {
    @IsEmail({}, {message: 'Format email tidak valid'})
    @IsNotEmpty({message: 'Email tidak boleh kosong'})
    email:string;

    @IsString()
    @IsNotEmpty({message: 'Password tidak boleh kosong'})
    @MinLength(8, {message: 'Password minimal 8 karakter'})
    password:string;

    @IsString()
    @IsNotEmpty({message: 'Nama tidak boleh kosong'})
    fullName:string;

    @IsDateString({}, {message: 'Format tanggal tidak valid'})
    @IsNotEmpty({message: 'Tanggal lahir tidak boleh kosong'})
    birthday:string;

    @IsEnum(GenderDto, {message: 'Gender harus MALE atau FEMALE'})
    @IsNotEmpty({message: 'Gender tidak boleh kosong'})
    gender:GenderDto;

    @IsString()
    @IsNotEmpty({message: 'Negara tidak boleh kosong'})
    country:string;

    @IsString()
    @IsNotEmpty({ message: 'Kota tidak boleh kosong' })
    city: string;

    @IsString()
    @IsNotEmpty({ message: 'Alamat tidak boleh kosong' })
    fullAddress: string;

    @IsString()
    @IsNotEmpty({ message: 'Nomor WhatsApp tidak boleh kosong' })
    phone: string;
}