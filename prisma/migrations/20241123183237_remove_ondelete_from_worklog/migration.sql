-- DropForeignKey
ALTER TABLE "WorkLog" DROP CONSTRAINT "WorkLog_workId_fkey";

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
