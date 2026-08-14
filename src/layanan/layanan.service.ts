import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLayananDto } from './dto/create-layanan.dto';
import { UpdateLayananDto } from './dto/update-layanan.dto';

@Injectable()
export class LayananService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.layanan.findMany({
      // 🟢 urutkan berdasarkan posisi manual admin, fallback createdAt untuk yang urutan-nya sama
      orderBy: [{ urutan: 'asc' }, { createdAt: 'desc' }],
    });
  }

  async findOne(id: number) {
    const layanan = await this.prisma.layanan.findUnique({ where: { id } });
    if (!layanan) throw new NotFoundException('Layanan tidak ditemukan');
    return layanan;
  }

  async create(dto: CreateLayananDto) {
    // 🟢 kalau urutan tidak dikirim, taruh di posisi paling akhir (max + 1)
    let urutan = (dto as any).urutan;
    if (urutan === undefined || urutan === null) {
      const last = await this.prisma.layanan.findFirst({
        orderBy: { urutan: 'desc' },
        select: { urutan: true },
      });
      urutan = (last?.urutan ?? 0) + 1;
    }
    return this.prisma.layanan.create({ data: { ...(dto as any), urutan } });
  }

  async update(id: number, dto: UpdateLayananDto) {
    await this.findOne(id);
    return this.prisma.layanan.update({ where: { id }, data: dto as any });
  }

  async remove(id: number) {
    await this.findOne(id);

    // Mengubah status menjadi Draft (Soft Delete konsisten dengan UI)
    return this.prisma.layanan.update({
      where: { id },
      data: {
        status: 'Draft',
      },
    });
  }
}
