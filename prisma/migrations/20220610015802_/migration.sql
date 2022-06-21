/*
  Warnings:

  - You are about to drop the column `cardNumber` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `cvc` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `expireDate` on the `Payment` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `ticketValue` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "cardNumber",
DROP COLUMN "cvc",
DROP COLUMN "expireDate",
DROP COLUMN "name",
ADD COLUMN     "ticketValue" VARCHAR(255) NOT NULL;
