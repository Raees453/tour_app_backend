/*
  Warnings:

  - You are about to drop the column `bio` on the `TourGuide` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `TourGuide` table. All the data in the column will be lost.
  - The `images` column on the `TourGuide` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "TourGuide" DROP COLUMN "bio",
DROP COLUMN "description",
DROP COLUMN "images",
ADD COLUMN     "images" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "profile" TEXT;
