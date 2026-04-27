import { IsString, IsInt, IsOptional, IsEnum, IsArray, ValidateNested, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class PertanyaanDto {
  @IsString() teks!: string;
  @IsEnum(['positif', 'negatif']) arah!: 'positif' | 'negatif';
  @IsOptional() @IsString() section?: string;
  @IsInt() urutan!: number;
}

export class LikertOptionDto {
  @IsString() label!: string;
  @IsInt() value!: number;
}

export class DiagnosisKategoriDto {
  @IsString() nama!: string;
  @IsNumber() minPersen!: number;
  @IsNumber() maxPersen!: number;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsString() result?: string;
}

export class SectionKategoriDto {
  @IsString() sectionNama!: string;
  @IsString() nama!: string;
  @IsInt() minSkor!: number;
  @IsInt() maxSkor!: number;
  @IsOptional() @IsString() deskripsi?: string;
}

export class CreateTesDto {
  @IsString() nama!: string;
  @IsString() deskripsi!: string;
  @IsString() penjelasanHasil!: string;
  @IsOptional() @IsString() jenis?: string;
  @IsOptional() @IsString() coverUrl?: string;
  @IsEnum(['Aktif', 'Draft']) status!: 'Aktif' | 'Draft';

  @IsArray() @ValidateNested({ each: true }) @Type(() => PertanyaanDto)
  pertanyaan!: PertanyaanDto[];

  @IsArray() @ValidateNested({ each: true }) @Type(() => LikertOptionDto)
  likert!: LikertOptionDto[];

  @IsArray() @ValidateNested({ each: true }) @Type(() => DiagnosisKategoriDto)
  kategori!: DiagnosisKategoriDto[];

  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => SectionKategoriDto)
  sectionKategori?: SectionKategoriDto[];
}

export class UpdateTesDto {
  @IsOptional() @IsString() nama?: string;
  @IsOptional() @IsString() deskripsi?: string;
  @IsOptional() @IsString() penjelasanHasil?: string;
  @IsOptional() @IsString() jenis?: string;
  @IsOptional() @IsString() coverUrl?: string;
  @IsOptional() @IsEnum(['Aktif', 'Draft']) status?: 'Aktif' | 'Draft';

  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => PertanyaanDto)
  pertanyaan?: PertanyaanDto[];

  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => LikertOptionDto)
  likert?: LikertOptionDto[];

  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => DiagnosisKategoriDto)
  kategori?: DiagnosisKategoriDto[];

  @IsOptional() @IsArray() @ValidateNested({ each: true }) @Type(() => SectionKategoriDto)
  sectionKategori?: SectionKategoriDto[];
}