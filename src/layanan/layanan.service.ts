import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // sesuaikan path-nya

@Injectable()
export class LayananService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.layanan.findMany();
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
}