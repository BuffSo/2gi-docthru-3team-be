-- AlterEnum
ALTER TYPE "Status" ADD VALUE 'Invalidated';

-- DropIndex
DROP INDEX "Application_userId_challengeId_key";
