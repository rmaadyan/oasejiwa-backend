import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdatePatientMedicalDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  diagnosis?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  currentMedication?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  allergies?: string[];
}