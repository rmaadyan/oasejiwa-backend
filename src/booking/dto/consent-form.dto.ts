import { IsString, IsNotEmpty, IsBoolean, IsOptional, IsEnum, IsDateString } from 'class-validator';

export enum SignatureType {
  TEXT = 'TEXT',
  DRAWING = 'DRAWING',
}

export class ConsentFormDto {
  @IsDateString()
  consentDate: string;

  @IsString()
  @IsNotEmpty()
  clientNameConfirmation: string;

  @IsString()
  @IsNotEmpty()
  signatureData: string;

  @IsEnum(SignatureType)
  signatureType: SignatureType;

  @IsBoolean()
  agreedToTerms: boolean;

  @IsOptional()
  @IsString()
  ipAddress?: string;
}
