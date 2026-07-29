-- CreateEnum
CREATE TYPE "ConsultationStatus" AS ENUM ('ONGOING', 'COMPLETED', 'REFERRED');

-- CreateEnum
CREATE TYPE "FollowUpPlan" AS ENUM ('CONTINUE_SESSION', 'REFER_TO_OTHER', 'COMPLETED');

-- AlterTable
ALTER TABLE "SessionNote" ADD COLUMN     "additionalNotes" TEXT,
ADD COLUMN     "bookingId" INTEGER,
ADD COLUMN     "consultationDate" TIMESTAMP(3),
ADD COLUMN     "consultationStatus" "ConsultationStatus" NOT NULL DEFAULT 'ONGOING',
ADD COLUMN     "diagnosisSummary" TEXT,
ADD COLUMN     "followUpPlan" "FollowUpPlan" NOT NULL DEFAULT 'CONTINUE_SESSION',
ADD COLUMN     "recommendation" TEXT,
ADD COLUMN     "sessionNumber" INTEGER,
ADD COLUMN     "treatmentApproach" TEXT;

-- CreateIndex
CREATE INDEX "SessionNote_consultationStatus_idx" ON "SessionNote"("consultationStatus");

-- CreateIndex
CREATE INDEX "SessionNote_bookingId_idx" ON "SessionNote"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "SessionNote_bookingId_key" ON "SessionNote"("bookingId");

-- AddForeignKey
ALTER TABLE "SessionNote" ADD CONSTRAINT "SessionNote_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE SET NULL ON UPDATE CASCADE;
