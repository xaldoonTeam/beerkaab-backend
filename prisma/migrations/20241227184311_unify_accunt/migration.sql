/*
  Warnings:

  - The values [paid,unpaid] on the enum `ComStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `email` on the `Organizations` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Organizations` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `Organizations` table. All the data in the column will be lost.
  - The `Isdeleted` column on the `Organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[accountId]` on the table `Organizations` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "RecycleStatus" AS ENUM ('NOT_HIDDEN', 'HIDDEN');

-- AlterEnum
BEGIN;
CREATE TYPE "ComStatus_new" AS ENUM ('PAID', 'UNPAID');
ALTER TABLE "Organizations" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Organizations" ALTER COLUMN "status" TYPE "ComStatus_new" USING ("status"::text::"ComStatus_new");
ALTER TYPE "ComStatus" RENAME TO "ComStatus_old";
ALTER TYPE "ComStatus_new" RENAME TO "ComStatus";
DROP TYPE "ComStatus_old";
ALTER TABLE "Organizations" ALTER COLUMN "status" SET DEFAULT 'UNPAID';
COMMIT;

-- DropIndex
DROP INDEX "Organizations_email_key";

-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "email",
DROP COLUMN "password",
DROP COLUMN "username",
ADD COLUMN     "accountId" INTEGER NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'UNPAID',
DROP COLUMN "Isdeleted",
ADD COLUMN     "Isdeleted" "RecycleStatus" NOT NULL DEFAULT 'NOT_HIDDEN';

-- DropTable
DROP TABLE "User";

-- DropTable
DROP TABLE "Users";

-- DropEnum
DROP TYPE "recycle";

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_email_key" ON "Account"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Organizations_accountId_key" ON "Organizations"("accountId");

-- AddForeignKey
ALTER TABLE "Organizations" ADD CONSTRAINT "Organizations_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
