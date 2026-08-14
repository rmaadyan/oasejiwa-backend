import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { JenisLayanan, Kategori } from '@prisma/client';
export class CreateLayananDto {
  @IsString()
  nama!: string;

  @IsEnum(JenisLayanan)
  jenis!: JenisLayanan;

  @IsEnum(Kategori)
  kategori!: Kategori;

  @IsOptional()
  @IsString()
  deskripsi?: string;

  @IsOptional()
  @IsString()
  catatan?: string;

  @IsInt()
  @Min(0)
  durasiMenit!: number;

  @IsInt()
  @Min(0)
  harga!: number;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  gambar?: string;

  // 🟢 TAMBAHAN: posisi urutan tampil (opsional — kalau tidak dikirim,
  // service akan otomatis taruh di posisi paling akhir)
  @IsOptional()
  @IsInt()
  @Min(0)
  urutan?: number;
}
