/*
  Warnings:

  - Added the required column `email` to the `WorkLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `WorkLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkLog" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "role" "Role" NOT NULL,
ALTER COLUMN "currentContent" DROP NOT NULL;
