/*
  Warnings:

  - You are about to drop the column `location` on the `Tools` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "duration" INTEGER;

-- AlterTable
ALTER TABLE "Tools" DROP COLUMN "location";
