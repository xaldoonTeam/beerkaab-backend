/*
  Warnings:

  - The `Isdeleted` column on the `Organizations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "recycle" AS ENUM ('hidden', 'Nothidde');

-- AlterTable
ALTER TABLE "Organizations" DROP COLUMN "Isdeleted",
ADD COLUMN     "Isdeleted" "recycle" NOT NULL DEFAULT 'Nothidde';

-- DropEnum
DROP TYPE "Isdleted";
