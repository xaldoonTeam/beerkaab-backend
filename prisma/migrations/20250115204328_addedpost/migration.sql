/*
  Warnings:

  - Added the required column `Image` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "Image" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'HIDDEN';
