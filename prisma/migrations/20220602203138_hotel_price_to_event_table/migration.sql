/*
  Warnings:

  - You are about to drop the column `hotelPrice` on the `eventTickets` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "eventTickets" DROP COLUMN "hotelPrice";

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "hotelPrice" INTEGER;
