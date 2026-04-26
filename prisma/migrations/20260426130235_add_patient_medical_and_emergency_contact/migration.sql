-- DropIndex
DROP INDEX "SessionNote_scheduleId_key";

-- CreateTable
CREATE TABLE "PatientMedicalRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "diagnosis" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "currentMedication" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "allergies" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PatientMedicalRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmergencyContact" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "relation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmergencyContact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BookingReview" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "psychologistId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT,
    "isAnonymous" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PatientMedicalRecord_userId_key" ON "PatientMedicalRecord"("userId");

-- CreateIndex
CREATE INDEX "EmergencyContact_userId_idx" ON "EmergencyContact"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingReview_bookingId_key" ON "BookingReview"("bookingId");

-- CreateIndex
CREATE INDEX "BookingReview_userId_idx" ON "BookingReview"("userId");

-- CreateIndex
CREATE INDEX "BookingReview_psychologistId_idx" ON "BookingReview"("psychologistId");

-- CreateIndex
CREATE INDEX "BookingReview_rating_idx" ON "BookingReview"("rating");

-- CreateIndex
CREATE INDEX "Booking_scheduleId_idx" ON "Booking"("scheduleId");

-- CreateIndex
CREATE INDEX "Schedule_psychologistId_idx" ON "Schedule"("psychologistId");

-- CreateIndex
CREATE INDEX "Schedule_date_idx" ON "Schedule"("date");

-- CreateIndex
CREATE INDEX "SessionNote_scheduleId_idx" ON "SessionNote"("scheduleId");

-- AddForeignKey
ALTER TABLE "PatientMedicalRecord" ADD CONSTRAINT "PatientMedicalRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmergencyContact" ADD CONSTRAINT "EmergencyContact_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingReview" ADD CONSTRAINT "BookingReview_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingReview" ADD CONSTRAINT "BookingReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingReview" ADD CONSTRAINT "BookingReview_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "PsychologistProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
