/*
  Warnings:

  - The `Isdeleted` column on the `Organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "Isdeleted",
ADD COLUMN     "Isdeleted" "Isdleted" NOT NULL DEFAULT 'false';
