import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLayananDto } from './dto/create-layanan.dto';
import { UpdateLayananDto } from './dto/update-layanan.dto';

@Injectable()
export class LayananService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.layanan.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const layanan = await this.prisma.layanan.findUnique({ where: { id } });
    if (!layanan) throw new NotFoundException('Layanan tidak ditemukan');
    return layanan;
  }

  async create(dto: CreateLayananDto) {
    return this.prisma.layanan.create({ data: dto });
  }

  async update(id: number, dto: UpdateLayananDto) {
    await this.findOne(id);
    return this.prisma.layanan.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.layanan.delete({ where: { id } });
    return { message: 'Layanan berhasil dihapus' };
  }
}