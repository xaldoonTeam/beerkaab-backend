/*
  Warnings:

  - You are about to drop the column `duration` on the `Orders` table. All the data in the column will be lost.
  - Added the required column `category` to the `Tools` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Tools` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ToolStatus" AS ENUM ('AVAILABLE', 'UNAVAILABLE');

-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "duration",
ADD COLUMN     "end_date" TIMESTAMP(3),
ADD COLUMN     "start_date" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "Tools" ADD COLUMN     "category" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "status" "ToolStatus" NOT NULL DEFAULT 'AVAILABLE';

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
