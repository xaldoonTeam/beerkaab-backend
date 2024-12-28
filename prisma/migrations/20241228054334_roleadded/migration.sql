-- CreateEnum
CREATE TYPE "type" AS ENUM ('User', 'Organization');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'superAdmin');

-- AlterTable
ALTER TABLE "Organizations" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'admin',
ADD COLUMN     "type" "type" NOT NULL DEFAULT 'Organization';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'user',
ADD COLUMN     "type" "type" NOT NULL DEFAULT 'User';
