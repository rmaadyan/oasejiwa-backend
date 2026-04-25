import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class LayananService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.layanan.findMany();
  }

  async findOne(id: number) {
    return this.prisma.layanan.findUnique({
      where: { id },
    });
  }

  async create(data: any) {
    return this.prisma.layanan.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisma.layanan.update({
      where: { id: Number(id) },
      data,
    });
  }

  async remove(id: number) {
    return this.prisma.layanan.delete({
      where: { id: Number(id) },
    });
  }
}