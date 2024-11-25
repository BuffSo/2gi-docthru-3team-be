/*
  Warnings:

  - A unique constraint covering the columns `[userId,challengeId]` on the table `Participate` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId,challengeId]` on the table `Work` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Participate_userId_challengeId_key" ON "Participate"("userId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "Work_userId_challengeId_key" ON "Work"("userId", "challengeId");
