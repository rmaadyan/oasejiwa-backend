import { IsEmail, IsNotEmpty } from 'class-validator';

export class ChangeVerificationEmailDto {
  @IsEmail({}, { message: 'Email lama tidak valid' })
  @IsNotEmpty()
  oldEmail: string;

  @IsEmail({}, { message: 'Email baru tidak valid' })
  @IsNotEmpty()
  newEmail: string;
}
