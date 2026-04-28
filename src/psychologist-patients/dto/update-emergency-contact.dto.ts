import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateEmergencyContactDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  @IsNotEmpty()
  phone!: string;

  @IsString()
  @IsNotEmpty()
  relation!: string;
}