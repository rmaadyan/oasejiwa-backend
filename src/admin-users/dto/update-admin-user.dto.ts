import { IsIn, IsOptional } from 'class-validator';

export class UpdateAdminUserDto {
  @IsOptional()
  @IsIn(['USER', 'ADMIN', 'PSYCHOLOGIST'])
  role?: 'USER' | 'ADMIN' | 'PSYCHOLOGIST';

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}