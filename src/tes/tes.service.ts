import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTesDto, UpdateTesDto } from './tes.dto';

@Injectable()
export class TesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTesDto) {
    return this.prisma.tes.create({
      data: {
        nama: dto.nama,
        deskripsi: dto.deskripsi,
        penjelasanHasil: dto.penjelasanHasil,
        jenis: dto.jenis,
        coverUrl: dto.coverUrl,
        status: dto.status,
        jumlah: dto.pertanyaan.length,
        pertanyaan: {
          create: dto.pertanyaan.map((p, i) => ({
            id: crypto.randomUUID(),
            teks: p.teks,
            arah: p.arah,
            section: p.section,
            urutan: i + 1,
          })),
        },
        likertOptions: {
          create: dto.likert.map((l) => ({
            id: crypto.randomUUID(),
            label: l.label,
            value: l.value,
          })),
        },
        kategori: {
          create: dto.kategori.map((k) => ({
            id: crypto.randomUUID(),
            nama: k.nama,
            minPersen: k.minPersen,
            maxPersen: k.maxPersen,
            deskripsi: k.deskripsi,
            result: k.result,
          })),
        },
        sectionKategori: {
          create: (dto.sectionKategori ?? []).map((s) => ({
            id: crypto.randomUUID(),
            sectionNama: s.sectionNama,
            nama: s.nama,
            minSkor: s.minSkor,
            maxSkor: s.maxSkor,
            deskripsi: s.deskripsi,
          })),
        },
      },
    });
  }

  async findAll() {
    return this.prisma.tes.findMany({
      include: {
        pertanyaan: { orderBy: { urutan: 'asc' } },
        likertOptions: true,
        kategori: true,
        sectionKategori: true,
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.tes.findUnique({
      where: { id },
      include: {
        pertanyaan: { orderBy: { urutan: 'asc' } },
        likertOptions: true,
        kategori: true,
        sectionKategori: true,
      },
    });
  }

  // new method for update
  async update(id: number, dto: UpdateTesDto) {
    return this.prisma.tes.update({
      where: { id },
      data: {
        ...(dto.nama && { nama: dto.nama }),
        ...(dto.deskripsi && { deskripsi: dto.deskripsi }),
        ...(dto.penjelasanHasil && { penjelasanHasil: dto.penjelasanHasil }),
        ...(dto.jenis && { jenis: dto.jenis }),
        ...(dto.coverUrl && { coverUrl: dto.coverUrl }),
        ...(dto.status && { status: dto.status }),
        ...(dto.pertanyaan && {
          jumlah: dto.pertanyaan.length,
          pertanyaan: {
            deleteMany: {},
            create: dto.pertanyaan.map((p, i) => ({
              id: crypto.randomUUID(),
              teks: p.teks,
              arah: p.arah,
              section: p.section,
              urutan: i + 1,
            })),
          },
        }),
        ...(dto.likert && {
          likertOptions: {
            deleteMany: {},
            create: dto.likert.map((l) => ({
              id: crypto.randomUUID(),
              label: l.label,
              value: l.value,
            })),
          },
        }),
        ...(dto.kategori && {
          kategori: {
            deleteMany: {},
            create: dto.kategori.map((k) => ({
              id: crypto.randomUUID(),
              nama: k.nama,
              minPersen: k.minPersen,
              maxPersen: k.maxPersen,
              deskripsi: k.deskripsi,
              result: k.result,
            })),
          },
        }),
        ...(dto.sectionKategori && {
          sectionKategori: {
            deleteMany: {},
            create: dto.sectionKategori.map((s) => ({
              id: crypto.randomUUID(),
              sectionNama: s.sectionNama,
              nama: s.nama,
              minSkor: s.minSkor,
              maxSkor: s.maxSkor,
              deskripsi: s.deskripsi,
            })),
          },
        }),
      },
      include: {
        pertanyaan: { orderBy: { urutan: 'asc' } },
        likertOptions: true,
        kategori: true,
        sectionKategori: true,
      },
    });
  }

  async remove(id: number) {
    return this.prisma.tes.delete({ where: { id } });
  }
}