import { IsIn, IsOptional } from 'class-validator';

export class UpdateAdminUserDto {
  @IsOptional()
  @IsIn(['admin', 'patient', 'psychologist'])
  role?: string;

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: string;
}