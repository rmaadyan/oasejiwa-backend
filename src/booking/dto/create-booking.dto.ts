import { IsString, IsNotEmpty, IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    @IsNotEmpty({ message: 'Psychologist ID tidak boleh kosong' })
    psychologistId: string;

    @IsInt()
    serviceId: number;

    @IsDateString({}, { message: 'Format tanggal tidak valid (gunakan YYYY-MM-DD)' })
    scheduledDate: string;

    @IsString()
    @IsNotEmpty({ message: 'Jam jadwal tidak boleh kosong' })
    scheduledTime: string;

    @IsOptional()
    @IsString()
    notes?: string;
}
