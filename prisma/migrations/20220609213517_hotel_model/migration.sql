-- CreateTable
CREATE TABLE "hotel" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255) NOT NULL,

    CONSTRAINT "hotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accomodationsType" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,

    CONSTRAINT "accomodationsType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "accomodationsHotel" (
    "id" SERIAL NOT NULL,
    "hotelId" INTEGER NOT NULL,
    "accomodationsTypeId" INTEGER NOT NULL,

    CONSTRAINT "accomodationsHotel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "accomodationsTypeId" INTEGER NOT NULL,
    "hotelId" INTEGER NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bed" (
    "id" SERIAL NOT NULL,
    "roomId" INTEGER NOT NULL,
    "enrollmentId" INTEGER,

    CONSTRAINT "bed_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "accomodationsHotel" ADD CONSTRAINT "accomodationsHotel_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "accomodationsHotel" ADD CONSTRAINT "accomodationsHotel_accomodationsTypeId_fkey" FOREIGN KEY ("accomodationsTypeId") REFERENCES "accomodationsType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_hotelId_fkey" FOREIGN KEY ("hotelId") REFERENCES "hotel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "room" ADD CONSTRAINT "room_accomodationsTypeId_fkey" FOREIGN KEY ("accomodationsTypeId") REFERENCES "accomodationsType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bed" ADD CONSTRAINT "bed_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bed" ADD CONSTRAINT "bed_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
