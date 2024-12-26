/*
  Warnings:

  - You are about to drop the column `time` on the `Orders` table. All the data in the column will be lost.
  - You are about to drop the `CoreUser` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `Organizations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `username` to the `Organizations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" DROP COLUMN "time";

-- AlterTable
ALTER TABLE "Organizations" ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "username" TEXT NOT NULL;

-- DropTable
DROP TABLE "CoreUser";
