-- CreateEnum
CREATE TYPE "type" AS ENUM ('User', 'Organization');

-- AlterTable
ALTER TABLE "Organizations" ADD COLUMN     "type" "type" NOT NULL DEFAULT 'Organization';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "type" "type" NOT NULL DEFAULT 'User';
