import { IsIn, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class QueryAdminUsersDto {
  @IsOptional()
  @Transform(({ value }) => Number(value))
  page?: number = 1;

  @IsOptional()
  @Transform(({ value }) => Number(value))
  perPage?: number = 10;

  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsIn(['newest', 'oldest', 'name_asc', 'name_desc', 'most-bookings'])
  sort?: 'newest' | 'oldest' | 'name_asc' | 'name_desc' | 'most-bookings' =
    'newest';

  @IsOptional()
  @IsIn(['all', 'male', 'female', 'MALE', 'FEMALE'])
  gender?: string = 'all';
}