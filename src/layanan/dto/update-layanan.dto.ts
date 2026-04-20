import { PartialType } from '@nestjs/mapped-types';
import { CreateLayananDto } from './create-layanan.dto';

export class UpdateLayananDto extends PartialType(CreateLayananDto) {}
