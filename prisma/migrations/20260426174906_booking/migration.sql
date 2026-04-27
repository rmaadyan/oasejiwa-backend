-- CreateEnum
CREATE TYPE "BookingStatus" AS ENUM ('PENDING_DP', 'WAITING_APPROVAL', 'APPROVED', 'REJECTED', 'FULLY_PAID', 'COMPLETED', 'CANCELLED');

-- CreateEnum
CREATE TYPE "ProblemDuration" AS ENUM ('LESS_THAN_1_MONTH', 'ONE_TO_3_MONTHS', 'THREE_TO_6_MONTHS', 'MORE_THAN_6_MONTHS');

-- CreateEnum
CREATE TYPE "SymptomFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY', 'RARELY');

-- CreateEnum
CREATE TYPE "DailyImpact" AS ENUM ('NONE', 'MILD', 'MODERATE', 'SEVERE');

-- CreateEnum
CREATE TYPE "SleepQuality" AS ENUM ('GOOD', 'FAIR', 'POOR', 'DISTURBED');

-- CreateEnum
CREATE TYPE "SelfHarmThoughts" AS ENUM ('NEVER', 'SOMETIMES', 'FREQUENT');

-- CreateEnum
CREATE TYPE "EatingPattern" AS ENUM ('REGULAR', 'IRREGULAR', 'OVEREATING', 'UNDEREATING');

-- CreateEnum
CREATE TYPE "ExerciseFrequency" AS ENUM ('NEVER', 'RARELY', 'SOMETIMES', 'REGULARLY');

-- CreateEnum
CREATE TYPE "StressLevel" AS ENUM ('LOW', 'MODERATE', 'HIGH', 'VERY_HIGH');

-- CreateEnum
CREATE TYPE "TherapyPreference" AS ENUM ('DIRECTIVE', 'COLLABORATIVE', 'NO_PREFERENCE');

-- CreateEnum
CREATE TYPE "SignatureType" AS ENUM ('TEXT', 'DRAWING');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('DOWN_PAYMENT', 'FULL_PAYMENT');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('PENDING', 'PAID', 'EXPIRED', 'FAILED');

-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "bookingCode" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "psychologistId" TEXT NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "scheduledDate" DATE NOT NULL,
    "scheduledTime" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "dpAmount" INTEGER NOT NULL,
    "remainingAmount" INTEGER NOT NULL,
    "status" "BookingStatus" NOT NULL DEFAULT 'PENDING_DP',
    "adminApprovedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "rejectionReason" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsultationForm" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "mainReason" TEXT NOT NULL,
    "takingPsychiatricMeds" BOOLEAN NOT NULL,
    "problemDuration" "ProblemDuration" NOT NULL,
    "symptomFrequency" "SymptomFrequency" NOT NULL,
    "dailyImpact" "DailyImpact" NOT NULL,
    "hasSimilarHistory" BOOLEAN NOT NULL,
    "similarHistoryDetail" TEXT,
    "hasFamilyHistory" BOOLEAN NOT NULL,
    "familyHistoryDetail" TEXT,
    "hasMedicalTreatment" BOOLEAN NOT NULL,
    "medicalTreatmentDetail" TEXT,
    "hasTraumaticEvent" BOOLEAN NOT NULL,
    "traumaticEventDetail" TEXT,
    "sleepQuality" "SleepQuality" NOT NULL,
    "selfHarmThoughts" "SelfHarmThoughts" NOT NULL,
    "usesAddictiveSubstances" BOOLEAN NOT NULL,
    "addictiveSubstancesDetail" TEXT,
    "eatingPattern" "EatingPattern" NOT NULL,
    "exerciseFrequency" "ExerciseFrequency" NOT NULL,
    "stressLevel" "StressLevel" NOT NULL,
    "consultationGoals" TEXT[],
    "therapyPreference" "TherapyPreference" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsultationForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ConsentForm" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "consentDate" DATE NOT NULL,
    "clientNameConfirmation" TEXT NOT NULL,
    "signatureData" TEXT NOT NULL,
    "signatureType" "SignatureType" NOT NULL,
    "agreedToTerms" BOOLEAN NOT NULL,
    "ipAddress" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsentForm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" SERIAL NOT NULL,
    "bookingId" INTEGER NOT NULL,
    "type" "PaymentType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "method" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "virtualAccount" TEXT,
    "paymentProofUrl" TEXT,
    "status" "PaymentStatus" NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMP(3),
    "expiredAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
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
CREATE UNIQUE INDEX "Booking_bookingCode_key" ON "Booking"("bookingCode");

-- CreateIndex
CREATE UNIQUE INDEX "ConsultationForm_bookingId_key" ON "ConsultationForm"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "ConsentForm_bookingId_key" ON "ConsentForm"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_orderId_key" ON "Payment"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "BookingReview_bookingId_key" ON "BookingReview"("bookingId");

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "PsychologistProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Layanan"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_adminApprovedBy_fkey" FOREIGN KEY ("adminApprovedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsultationForm" ADD CONSTRAINT "ConsultationForm_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ConsentForm" ADD CONSTRAINT "ConsentForm_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingReview" ADD CONSTRAINT "BookingReview_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingReview" ADD CONSTRAINT "BookingReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingReview" ADD CONSTRAINT "BookingReview_psychologistId_fkey" FOREIGN KEY ("psychologistId") REFERENCES "PsychologistProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
