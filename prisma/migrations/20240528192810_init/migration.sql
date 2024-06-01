-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "profile" TEXT,
    "bio" TEXT,
    "description" TEXT,
    "password" TEXT NOT NULL,
    "passwordChangedAt" TIMESTAMP(3),
    "otp" TEXT,
    "otpExpireAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourGuide" (
    "id" SERIAL NOT NULL,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "city" TEXT,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TourGuide_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");

-- AddForeignKey
ALTER TABLE "TourGuide" ADD CONSTRAINT "TourGuide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
