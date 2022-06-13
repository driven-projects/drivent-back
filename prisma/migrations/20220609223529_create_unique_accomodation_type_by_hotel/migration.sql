/*
  Warnings:

  - The primary key for the `accomodationsHotel` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `accomodationsHotel` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "accomodationsHotel" DROP CONSTRAINT "accomodationsHotel_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "accomodationsHotel_pkey" PRIMARY KEY ("hotelId", "accomodationsTypeId");
