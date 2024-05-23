-- CreateTable
CREATE TABLE "TourGuide" (
    "id" SERIAL NOT NULL,
    "images" JSONB NOT NULL,
    "bio" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "TourGuide_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "TourGuide" ADD CONSTRAINT "TourGuide_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
