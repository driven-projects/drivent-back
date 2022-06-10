/*
  Warnings:

  - A unique constraint covering the columns `[type]` on the table `accomodationsType` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "accomodationsType" ALTER COLUMN "type" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "accomodationsType_type_key" ON "accomodationsType"("type");
