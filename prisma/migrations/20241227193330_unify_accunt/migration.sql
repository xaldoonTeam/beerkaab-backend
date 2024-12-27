/*
  Warnings:

  - The values [PAID,UNPAID] on the enum `ComStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `accountId` on the `Organizations` table. All the data in the column will be lost.
  - The `Isdeleted` column on the `Organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `Organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "recycle" AS ENUM ('hidden', 'Nothidde');

-- AlterEnum
BEGIN;
CREATE TYPE "ComStatus_new" AS ENUM ('paid', 'unpaid');
ALTER TABLE "Organizations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Organizations" ALTER COLUMN "status" TYPE "ComStatus_new" USING ("status"::text::"ComStatus_new");
ALTER TYPE "ComStatus" RENAME TO "ComStatus_old";
ALTER TYPE "ComStatus_new" RENAME TO "ComStatus";
DROP TYPE "ComStatus_old";
ALTER TABLE "Organizations" ALTER COLUMN "status" SET DEFAULT 'unpaid';
COMMIT;

-- DropForeignKey
ALTER TABLE "Organizations" DROP CONSTRAINT "Organizations_accountId_fkey";

-- DropIndex
DROP INDEX "Organizations_accountId_key";

-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "accountId",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'unpaid',
DROP COLUMN "Isdeleted",
ADD COLUMN     "Isdeleted" "recycle" NOT NULL DEFAULT 'Nothidde';

-- DropTable
DROP TABLE "Account";

-- DropEnum
DROP TYPE "RecycleStatus";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_email_key" ON "Organizations"("email");
