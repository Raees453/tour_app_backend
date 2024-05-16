/*
  Warnings:

  - A unique constraint covering the columns `[phone]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `firstName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
CREATE SEQUENCE user_id_seq;
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT NOT NULL,
ADD COLUMN     "lastName" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ALTER COLUMN "id" SET DEFAULT nextval('user_id_seq');
ALTER SEQUENCE user_id_seq OWNED BY "User"."id";

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
