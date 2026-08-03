-- Migration: sync_schema_drift
-- Menyinkronkan skema Prisma dengan struktur database yang sudah ada
-- Semua perubahan menggunakan IF NOT EXISTS / IF EXISTS agar aman dijalankan berulang

-- ============================================================
-- 1. ENUM: RiskLevel - tambah VERY_LOW dan VERY_HIGH
-- ============================================================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'VERY_LOW' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'RiskLevel')) THEN
    ALTER TYPE "RiskLevel" ADD VALUE 'VERY_LOW';
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_enum WHERE enumlabel = 'VERY_HIGH' AND enumtypid = (SELECT oid FROM pg_type WHERE typname = 'RiskLevel')) THEN
    ALTER TYPE "RiskLevel" ADD VALUE 'VERY_HIGH';
  END IF;
END $$;

-- ============================================================
-- 2. ENUM: TestResultStatus (baru)
-- ============================================================
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'TestResultStatus') THEN
    CREATE TYPE "TestResultStatus" AS ENUM ('COMPLETED', 'IN_PROGRESS', 'DRAFT');
  END IF;
END $$;

-- ============================================================
-- 3. TABLE: UserProfile - tambah kolom-kolom baru
-- ============================================================
ALTER TABLE "UserProfile"
  ADD COLUMN IF NOT EXISTS "placeOfBirth" TEXT,
  ADD COLUMN IF NOT EXISTS "originalAddress" TEXT,
  ADD COLUMN IF NOT EXISTS "occupation" TEXT,
  ADD COLUMN IF NOT EXISTS "maritalStatus" TEXT,
  ADD COLUMN IF NOT EXISTS "siblingPosition" INTEGER,
  ADD COLUMN IF NOT EXISTS "totalSiblings" INTEGER,
  ADD COLUMN IF NOT EXISTS "isFirstVisit" BOOLEAN,
  ADD COLUMN IF NOT EXISTS "educationHistory" JSONB;

-- ============================================================
-- 4. TABLE: PsychologistProfile - tambah kolom baru & ubah nullable
-- ============================================================
ALTER TABLE "PsychologistProfile"
  ADD COLUMN IF NOT EXISTS "signatureUrl" TEXT,
  ADD COLUMN IF NOT EXISTS "signatureUpdatedAt" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "signatureMethod" TEXT DEFAULT 'UPLOAD',
  ADD COLUMN IF NOT EXISTS "status" TEXT NOT NULL DEFAULT 'WAITING_PROFILE';

-- Ubah str dan about menjadi nullable (jika belum)
ALTER TABLE "PsychologistProfile"
  ALTER COLUMN "str" DROP NOT NULL,
  ALTER COLUMN "about" DROP NOT NULL;

-- ============================================================
-- 5. TABLE: SessionNote - tambah kolom baru
-- ============================================================
ALTER TABLE "SessionNote"
  ADD COLUMN IF NOT EXISTS "followUpDate" TIMESTAMP(3),
  ADD COLUMN IF NOT EXISTS "nextSessionRecommendation" TEXT,
  ADD COLUMN IF NOT EXISTS "riskReason" TEXT,
  ADD COLUMN IF NOT EXISTS "currentMedication" TEXT,
  ADD COLUMN IF NOT EXISTS "allergies" TEXT,
  ADD COLUMN IF NOT EXISTS "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
  ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3);

-- ============================================================
-- 6. TABLE: OfficialMedicalRecord (baru - jika belum ada)
-- ============================================================
CREATE TABLE IF NOT EXISTS "OfficialMedicalRecord" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "psychologistProfileId" TEXT NOT NULL,
  "bookingId" INTEGER,
  "sessionNoteId" TEXT,
  "sessionNumber" INTEGER NOT NULL DEFAULT 1,
  "consultationDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "diagnosis" TEXT NOT NULL,
  "currentMedication" TEXT,
  "allergies" TEXT,
  "problemSummary" TEXT NOT NULL,
  "therapyApproach" TEXT NOT NULL,
  "followUpPlan" TEXT NOT NULL DEFAULT 'CONTINUE_SESSION',
  "nextSessionDate" TIMESTAMP(3),
  "additionalNotes" TEXT,
  "riskLevel" "RiskLevel" NOT NULL DEFAULT 'LOW',
  "riskReason" TEXT,
  "followUpDate" TIMESTAMP(3),
  "nextSessionRecommendation" TEXT,
  "pdfUrl" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "OfficialMedicalRecord_pkey" PRIMARY KEY ("id")
);

-- Index untuk OfficialMedicalRecord
CREATE INDEX IF NOT EXISTS "OfficialMedicalRecord_userId_idx" ON "OfficialMedicalRecord"("userId");
CREATE INDEX IF NOT EXISTS "OfficialMedicalRecord_psychologistProfileId_idx" ON "OfficialMedicalRecord"("psychologistProfileId");
CREATE INDEX IF NOT EXISTS "OfficialMedicalRecord_bookingId_idx" ON "OfficialMedicalRecord"("bookingId");
CREATE INDEX IF NOT EXISTS "OfficialMedicalRecord_sessionNoteId_idx" ON "OfficialMedicalRecord"("sessionNoteId");

-- Foreign Keys untuk OfficialMedicalRecord
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'OfficialMedicalRecord_userId_fkey') THEN
    ALTER TABLE "OfficialMedicalRecord" ADD CONSTRAINT "OfficialMedicalRecord_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'OfficialMedicalRecord_psychologistProfileId_fkey') THEN
    ALTER TABLE "OfficialMedicalRecord" ADD CONSTRAINT "OfficialMedicalRecord_psychologistProfileId_fkey"
      FOREIGN KEY ("psychologistProfileId") REFERENCES "PsychologistProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'OfficialMedicalRecord_bookingId_fkey') THEN
    ALTER TABLE "OfficialMedicalRecord" ADD CONSTRAINT "OfficialMedicalRecord_bookingId_fkey"
      FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'OfficialMedicalRecord_sessionNoteId_fkey') THEN
    ALTER TABLE "OfficialMedicalRecord" ADD CONSTRAINT "OfficialMedicalRecord_sessionNoteId_fkey"
      FOREIGN KEY ("sessionNoteId") REFERENCES "SessionNote"("id") ON DELETE SET NULL ON UPDATE CASCADE;
  END IF;
END $$;

-- ============================================================
-- 7. TABLE: TesResult (baru - jika belum ada)
-- ============================================================
CREATE TABLE IF NOT EXISTS "TesResult" (
  "id" TEXT NOT NULL,
  "userId" TEXT NOT NULL,
  "tesId" INTEGER NOT NULL,
  "namaTes" TEXT NOT NULL,
  "jenisTes" TEXT,
  "totalScore" INTEGER NOT NULL,
  "maxScore" INTEGER NOT NULL,
  "percentage" DOUBLE PRECISION NOT NULL,
  "kategoriNama" TEXT NOT NULL,
  "diagnosis" TEXT,
  "detailDiagnosis" TEXT,
  "interpretasi" TEXT,
  "rekomendasi" TEXT[] DEFAULT ARRAY[]::TEXT[],
  "status" "TestResultStatus" NOT NULL DEFAULT 'COMPLETED',
  "sectionScores" JSONB,
  "answers" JSONB,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "TesResult_pkey" PRIMARY KEY ("id")
);

-- Index untuk TesResult
CREATE INDEX IF NOT EXISTS "TesResult_userId_idx" ON "TesResult"("userId");
CREATE INDEX IF NOT EXISTS "TesResult_tesId_idx" ON "TesResult"("tesId");
CREATE INDEX IF NOT EXISTS "TesResult_status_idx" ON "TesResult"("status");
CREATE INDEX IF NOT EXISTS "TesResult_createdAt_idx" ON "TesResult"("createdAt");

-- Foreign Keys untuk TesResult
DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'TesResult_userId_fkey') THEN
    ALTER TABLE "TesResult" ADD CONSTRAINT "TesResult_userId_fkey"
      FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.table_constraints WHERE constraint_name = 'TesResult_tesId_fkey') THEN
    ALTER TABLE "TesResult" ADD CONSTRAINT "TesResult_tesId_fkey"
      FOREIGN KEY ("tesId") REFERENCES "Tes"("id") ON DELETE CASCADE ON UPDATE CASCADE;
  END IF;
END $$;

-- ============================================================
-- 8. TABLE: User - tambah relasi OfficialMedicalRecord (tidak perlu kolom baru,
--    relasi sudah ada melalui FK di OfficialMedicalRecord dan TesResult)
-- ============================================================

-- ============================================================
-- 9. INDEX tambahan untuk SessionNote (jika belum ada)
-- ============================================================
CREATE INDEX IF NOT EXISTS "SessionNote_bookingId_idx" ON "SessionNote"("bookingId");
