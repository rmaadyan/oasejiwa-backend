import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsDateString,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ConsultationFormDto } from './consultation-form.dto';
import { ConsentFormDto } from './consent-form.dto';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty({ message: 'Psychologist ID tidak boleh kosong' })
  psychologistId!: string;

  @IsInt()
  serviceId!: number;

  // 🟢 Izinkan scheduleId bersifat opsional & menerima string, null, atau undefined
  @IsOptional()
  @IsString()
  scheduleId?: string | null;

  @IsNotEmpty()
  @IsDateString(
    {},
    { message: 'scheduledDate harus berupa format tanggal ISO yang valid (contoh: YYYY-MM-DD)' }
  )
  scheduledDate!: string;

  @IsString()
  @IsNotEmpty({ message: 'Jam jadwal tidak boleh kosong' })
  scheduledTime!: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @ValidateNested()
  @Type(() => ConsultationFormDto)
  consultationForm!: ConsultationFormDto;

  @ValidateNested()
  @Type(() => ConsentFormDto)
  consentForm!: ConsentFormDto;
}