import { IsIn, IsOptional } from 'class-validator';

export class UpdateAdminUserDto {
  @IsOptional()
  @IsIn(['USER', 'ADMIN', 'PSYCHOLOGIST', 'PATIENT'], {
    message: 'Role harus salah satu dari: USER, ADMIN, PSYCHOLOGIST, atau PATIENT',
  })
  role?: 'USER' | 'ADMIN' | 'PSYCHOLOGIST' | 'PATIENT';

  @IsOptional()
  @IsIn(['active', 'inactive'])
  status?: 'active' | 'inactive';
}