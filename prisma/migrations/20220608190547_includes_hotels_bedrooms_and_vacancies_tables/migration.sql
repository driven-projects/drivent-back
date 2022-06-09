-- CreateEnum
CREATE TYPE "Type" AS ENUM ('SINGLE', 'DOUBLE', 'TRIPLE');

-- CreateTable
CREATE TABLE "Hotels" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "image" VARCHAR(255) NOT NULL,

    CONSTRAINT "Hotels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bedrooms" (
    "id" SERIAL NOT NULL,
    "number" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "type" "Type" NOT NULL,

    CONSTRAINT "Bedrooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancies" (
    "id" SERIAL NOT NULL,
    "isAvailable" BOOLEAN NOT NULL,
    "bedroomId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Vacancies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Vacancies_userId_key" ON "Vacancies"("userId");

-- AddForeignKey
ALTER TABLE "Bedrooms" ADD CONSTRAINT "Bedrooms_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "Hotels"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancies" ADD CONSTRAINT "Vacancies_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancies" ADD CONSTRAINT "Vacancies_bedroomId_fkey" FOREIGN KEY ("bedroomId") REFERENCES "Bedrooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
