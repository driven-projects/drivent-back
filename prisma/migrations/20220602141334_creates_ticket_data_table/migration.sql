-- CreateTable
CREATE TABLE "ticketData" (
    "id" SERIAL NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "value" INTEGER NOT NULL,
    "accomodation" BOOLEAN NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "ticketData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticketData_userId_key" ON "ticketData"("userId");

-- AddForeignKey
ALTER TABLE "ticketData" ADD CONSTRAINT "ticketData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
