import { IsInt, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class ProcessPaymentDto {
    @IsInt()
    bookingId: number;

    @IsString()
    @IsNotEmpty({ message: 'Metode pembayaran tidak boleh kosong' })
    method: string;

    @IsOptional()
    @IsString()
    paymentProofUrl?: string;
}
