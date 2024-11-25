/*
  Warnings:

  - Added the required column `message` to the `WorkLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkLog" ADD COLUMN     "message" TEXT NOT NULL;
