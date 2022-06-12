/*
  Warnings:

  - You are about to drop the `GithubUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isGithubUser" BOOLEAN;

-- DropTable
DROP TABLE "GithubUser";
