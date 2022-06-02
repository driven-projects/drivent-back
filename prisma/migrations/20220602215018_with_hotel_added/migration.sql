/*
  Warnings:

  - Added the required column `withHotel` to the `enrollmentTicket` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "enrollmentTicket" ADD COLUMN     "withHotel" BOOLEAN NOT NULL;
