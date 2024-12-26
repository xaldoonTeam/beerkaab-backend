/*
  Warnings:

  - Added the required column `status` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tool_id` to the `Orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CoreUser" ALTER COLUMN "createAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Orders" ADD COLUMN     "status" TEXT NOT NULL,
ADD COLUMN     "time" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tool_id" INTEGER NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Organizations" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Tools" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- DropEnum
DROP TYPE "Role";

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_tool_id_fkey" FOREIGN KEY ("tool_id") REFERENCES "Tools"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
