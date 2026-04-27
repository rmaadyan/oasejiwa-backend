import { IsString, IsNotEmpty, IsDateString } from 'class-validator';

export class RescheduleBookingDto {
    @IsDateString({}, { message: 'Format tanggal baru tidak valid (gunakan YYYY-MM-DD)' })
    newScheduledDate!: string;

    @IsString()
    @IsNotEmpty({ message: 'Jam jadwal baru tidak boleh kosong' })
    newScheduledTime!: string;
}
