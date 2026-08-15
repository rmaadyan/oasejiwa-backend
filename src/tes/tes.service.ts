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
            image: p.image || (p as any).imageUrl || null,
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
    const list = await this.prisma.tes.findMany({
      include: {
        pertanyaan: { orderBy: { urutan: 'asc' } },
        likertOptions: true,
        kategori: true,
        sectionKategori: true,
      },
    });

    for (const t of list) {
      if ((t.id === 2 || (t.nama || '').includes('DASS-21')) && t.pertanyaan && t.pertanyaan.length > 21) {
        await this.prisma.pertanyaan.deleteMany({
          where: {
            tesId: t.id,
            urutan: { gt: 21 },
          },
        });
        await this.prisma.tes.update({
          where: { id: t.id },
          data: { jumlah: 21 },
        });
        t.pertanyaan = t.pertanyaan.slice(0, 21);
        t.jumlah = 21;
      }
    }

    return list.map((t) => {
      const pList = (t.id === 2 || (t.nama || '').includes('DASS-21')) && t.pertanyaan && t.pertanyaan.length > 21
        ? t.pertanyaan.slice(0, 21)
        : t.pertanyaan;

      return {
        ...t,
        pertanyaan: pList,
        jumlah: pList && pList.length > 0 ? pList.length : (t.jumlah || 21),
      };
    });
  }

  async findOne(id: number) {
    const t = await this.prisma.tes.findUnique({
      where: { id },
      include: {
        pertanyaan: { orderBy: { urutan: 'asc' } },
        likertOptions: true,
        kategori: true,
        sectionKategori: true,
      },
    });
    if (!t) return null;

    if ((t.id === 2 || (t.nama || '').includes('DASS-21')) && t.pertanyaan && t.pertanyaan.length > 21) {
      await this.prisma.pertanyaan.deleteMany({
        where: {
          tesId: t.id,
          urutan: { gt: 21 },
        },
      });
      await this.prisma.tes.update({
        where: { id: t.id },
        data: { jumlah: 21 },
      });
      t.pertanyaan = t.pertanyaan.slice(0, 21);
      t.jumlah = 21;
    }

    const pList = (t.id === 2 || (t.nama || '').includes('DASS-21')) && t.pertanyaan && t.pertanyaan.length > 21
      ? t.pertanyaan.slice(0, 21)
      : t.pertanyaan;

    return {
      ...t,
      pertanyaan: pList,
      jumlah: pList && pList.length > 0 ? pList.length : (t.jumlah || 21),
    };
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
              image: p.image || (p as any).imageUrl || null,
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

  async submitTes(userId: string, tesId: number, dto: any) {
    let targetTesId = tesId;
    let tesRecord = await this.prisma.tes.findUnique({ where: { id: targetTesId } });

    if (!tesRecord) {
      tesRecord = await this.prisma.tes.findFirst({
        where: { status: 'Aktif' },
        orderBy: { id: 'asc' },
      });

      if (!tesRecord) {
        tesRecord = await this.prisma.tes.create({
          data: {
            nama: dto.namaTes || 'Tes Psikologi DASS-21',
            jumlah: 21,
            status: 'Aktif',
            deskripsi: 'Depression Anxiety Stress Scale (DASS-21)',
            penjelasanHasil: 'Skrining awal tingkat Depresi, Kecemasan, dan Stres.',
            jenis: dto.jenisTes || 'Psikologi',
          },
        });
      }

      targetTesId = tesRecord.id;
    }

    return this.prisma.tesResult.create({
      data: {
        userId,
        tesId: targetTesId,
        namaTes: dto.namaTes || tesRecord.nama,
        jenisTes: dto.jenisTes ?? tesRecord.jenis ?? 'Psikologi',
        totalScore: dto.totalScore,
        maxScore: dto.maxScore,
        percentage: dto.percentage,
        kategoriNama: dto.kategoriNama,
        diagnosis: dto.diagnosis ?? dto.kategoriNama ?? null,
        detailDiagnosis: dto.detailDiagnosis ?? null,
        interpretasi: dto.interpretasi ?? null,
        rekomendasi: dto.rekomendasi ?? [],
        sectionScores: dto.sectionScores ?? null,
        answers: dto.answers ?? null,
      },
      include: {
        tes: true,
        user: {
          include: {
            userProfile: true,
          },
        },
      },
    });
  }

  async findUserTesResults(userId: string) {
    return this.prisma.tesResult.findMany({
      where: { userId },
      include: {
        tes: {
          select: {
            id: true,
            nama: true,
            jenis: true,
            deskripsi: true,
            penjelasanHasil: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            userProfile: {
              select: {
                fullName: true,
                phone: true,
                gender: true,
                birthday: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findTesResultById(id: string) {
    const result = await this.prisma.tesResult.findUnique({
      where: { id },
      include: {
        tes: {
          select: {
            id: true,
            nama: true,
            jenis: true,
            deskripsi: true,
            penjelasanHasil: true,
            kategori: true,
            sectionKategori: true,
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            userProfile: {
              select: {
                fullName: true,
              },
            },
          },
        },
      },
    });

    if (!result) {
      return null;
    }

    return result;
  }

  async findAllTesResults() {
    return this.prisma.tesResult.findMany({
      include: {
        user: {
          include: {
            userProfile: true,
          },
        },
        tes: {
          select: {
            id: true,
            nama: true,
            jenis: true,
            deskripsi: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async removeTesResult(id: string) {
    return this.prisma.tesResult.delete({ where: { id } });
  }
}