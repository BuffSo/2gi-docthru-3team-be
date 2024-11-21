/*
  Warnings:

  - You are about to drop the column `description` on the `Work` table. All the data in the column will be lost.
  - Added the required column `content` to the `Work` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Work" ADD COLUMN "content" TEXT;
UPDATE "Work" SET "content" = "description";
ALTER TABLE "Work" ALTER COLUMN "content" SET NOT NULL;
ALTER TABLE "Work" DROP COLUMN "description";
