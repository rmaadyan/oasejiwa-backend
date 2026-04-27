import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class ProcessPaymentDto {
    @Type(() => Number)
    @IsInt()
    bookingId!: number;

    @IsString()
    @IsNotEmpty({ message: 'Metode pembayaran tidak boleh kosong' })
    method!: string;

    @IsOptional()
    @IsString()
    paymentProofUrl?: string;
}
