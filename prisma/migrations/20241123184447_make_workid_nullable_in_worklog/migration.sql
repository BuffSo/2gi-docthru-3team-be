-- DropForeignKey
ALTER TABLE "WorkLog" DROP CONSTRAINT "WorkLog_workId_fkey";

-- AlterTable
ALTER TABLE "WorkLog" ALTER COLUMN "workId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE SET NULL ON UPDATE CASCADE;
