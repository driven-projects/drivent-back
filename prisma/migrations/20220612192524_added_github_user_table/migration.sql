-- CreateTable
CREATE TABLE "GithubUser" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "access_token" VARCHAR(255) NOT NULL,

    CONSTRAINT "GithubUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GithubUser_email_key" ON "GithubUser"("email");
