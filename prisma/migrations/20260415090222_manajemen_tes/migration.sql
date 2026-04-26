-- CreateEnum
CREATE TYPE "TesStatus" AS ENUM ('Aktif', 'Draft');

-- CreateEnum
CREATE TYPE "ArahItem" AS ENUM ('positif', 'negatif');

-- CreateTable
CREATE TABLE "Tes" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jumlah" INTEGER NOT NULL,
    "status" "TesStatus" NOT NULL DEFAULT 'Draft',
    "deskripsi" TEXT NOT NULL,
    "penjelasanHasil" TEXT NOT NULL,
    "jenis" TEXT,
    "coverUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pertanyaan" (
    "id" TEXT NOT NULL,
    "teks" TEXT NOT NULL,
    "arah" "ArahItem" NOT NULL,
    "section" TEXT,
    "urutan" INTEGER NOT NULL,
    "tesId" INTEGER NOT NULL,

    CONSTRAINT "Pertanyaan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LikertOption" (
    "id" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "tesId" INTEGER NOT NULL,

    CONSTRAINT "LikertOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiagnosisKategori" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "minPersen" DOUBLE PRECISION NOT NULL,
    "maxPersen" DOUBLE PRECISION NOT NULL,
    "deskripsi" TEXT,
    "result" TEXT,
    "tesId" INTEGER NOT NULL,

    CONSTRAINT "DiagnosisKategori_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SectionKategori" (
    "id" TEXT NOT NULL,
    "sectionNama" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "minSkor" INTEGER NOT NULL,
    "maxSkor" INTEGER NOT NULL,
    "deskripsi" TEXT,
    "tesId" INTEGER NOT NULL,

    CONSTRAINT "SectionKategori_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pertanyaan" ADD CONSTRAINT "Pertanyaan_tesId_fkey" FOREIGN KEY ("tesId") REFERENCES "Tes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikertOption" ADD CONSTRAINT "LikertOption_tesId_fkey" FOREIGN KEY ("tesId") REFERENCES "Tes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiagnosisKategori" ADD CONSTRAINT "DiagnosisKategori_tesId_fkey" FOREIGN KEY ("tesId") REFERENCES "Tes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SectionKategori" ADD CONSTRAINT "SectionKategori_tesId_fkey" FOREIGN KEY ("tesId") REFERENCES "Tes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
