/*
  Warnings:

  - Added the required column `address` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_organization_id_fkey";

-- DropForeignKey
ALTER TABLE "Tools" DROP CONSTRAINT "Tools_organization_id_fkey";

-- AlterTable
ALTER TABLE "Organizations" ADD COLUMN     "address" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Tools" ADD CONSTRAINT "Tools_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_organization_id_fkey" FOREIGN KEY ("organization_id") REFERENCES "Organizations"("id") ON DELETE CASCADE ON UPDATE CASCADE;
