/*
  Warnings:

  - The values [Workshop] on the enum `JenisLayanan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "JenisLayanan_new" AS ENUM ('Konseling', 'Seminar', 'Training', 'Tes', 'Lainnya');
ALTER TABLE "Layanan" ALTER COLUMN "jenis" TYPE "JenisLayanan_new" USING ("jenis"::text::"JenisLayanan_new");
ALTER TYPE "JenisLayanan" RENAME TO "JenisLayanan_old";
ALTER TYPE "JenisLayanan_new" RENAME TO "JenisLayanan";
DROP TYPE "public"."JenisLayanan_old";
COMMIT;
