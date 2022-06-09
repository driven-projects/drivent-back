-- DropForeignKey
ALTER TABLE "Vacancies" DROP CONSTRAINT "Vacancies_userId_fkey";

-- AlterTable
ALTER TABLE "Vacancies" ALTER COLUMN "userId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Vacancies" ADD CONSTRAINT "Vacancies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
