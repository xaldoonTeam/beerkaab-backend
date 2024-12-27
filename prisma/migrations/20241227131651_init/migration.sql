-- CreateEnum
CREATE TYPE "ComStatus" AS ENUM ('paid', 'unpaid');

-- CreateEnum
CREATE TYPE "Isdleted" AS ENUM ('true', 'false');

-- AlterTable
ALTER TABLE "Organizations" ADD COLUMN     "Isdeleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "status" "ComStatus" NOT NULL DEFAULT 'unpaid';
