import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';

export enum JenisLayanan {
  Konseling = 'Konseling',
  Workshop = 'Workshop',
  Training = 'Training',
  Lainnya = 'Lainnya',
}

export enum Kategori {
  Paket = 'Paket',
  NonPaket = 'NonPaket',
}

export class CreateLayananDto {
  @IsString()
  nama: string;

  @IsEnum(JenisLayanan)
  jenis: JenisLayanan;

  @IsEnum(Kategori)
  kategori: Kategori;

  @IsOptional()
  @IsString()
  deskripsi?: string;

  @IsOptional()
  @IsString()
  catatan?: string;

  @IsInt()
  @Min(1)
  durasiMenit: number;

  @IsInt()
  @Min(0)
  harga: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  gambar?: string;
}
