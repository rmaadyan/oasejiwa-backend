-- DropForeignKey
ALTER TABLE "BookingReview" DROP CONSTRAINT "BookingReview_psychologistId_fkey";

-- DropForeignKey
ALTER TABLE "BookingReview" DROP CONSTRAINT "BookingReview_userId_fkey";

-- CreateIndex
CREATE INDEX "Booking_userId_idx" ON "Booking"("userId");

-- CreateIndex
CREATE INDEX "Booking_psychologistId_idx" ON "Booking"("psychologistId");

-- CreateIndex
CREATE INDEX "Booking_serviceId_idx" ON "Booking"("serviceId");

-- CreateIndex
CREATE INDEX "Schedule_psychologistId_idx" ON "Schedule"("psychologistId");

-- CreateIndex
CREATE INDEX "Schedule_date_idx" ON "Schedule"("date");

-- AddForeignKey
ALTER TABLE "BookingReview" ADD CONSTRAINT "BookingReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingReview" ADD CONSTRAINT "BookingReview_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "PsychologistProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
