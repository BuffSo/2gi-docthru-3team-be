/*
  Warnings:

  - Added the required column `challengeId` to the `WorkLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkLog" ADD COLUMN     "challengeId" INTEGER NOT NULL;
