-- CreateEnum
CREATE TYPE "JenisLayanan" AS ENUM ('Konseling', 'Workshop', 'Training', 'Lainnya');

-- CreateEnum
CREATE TYPE "Kategori" AS ENUM ('Paket', 'NonPaket');

-- CreateTable
CREATE TABLE "Layanan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jenis" "JenisLayanan" NOT NULL,
    "kategori" "Kategori" NOT NULL,
    "deskripsi" TEXT,
    "catatan" TEXT,
    "durasiMenit" INTEGER NOT NULL,
    "harga" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Aktif',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Layanan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Layanan_nama_key" ON "Layanan"("nama");
