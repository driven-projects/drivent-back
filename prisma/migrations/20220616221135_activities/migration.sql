-- CreateTable
CREATE TABLE "location" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "seat" (
    "id" SERIAL NOT NULL,
    "enrollmentId" INTEGER,
    "activityId" INTEGER NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "seat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activity" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,
    "startTime" TIME(0) NOT NULL,
    "endTime" TIME(0) NOT NULL,
    "locationId" INTEGER NOT NULL,

    CONSTRAINT "activity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "location_name_key" ON "location"("name");

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_enrollmentId_fkey" FOREIGN KEY ("enrollmentId") REFERENCES "Enrollment"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "seat" ADD CONSTRAINT "seat_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "activity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "activity" ADD CONSTRAINT "activity_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
