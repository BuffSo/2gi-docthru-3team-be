-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Admin', 'User');

-- CreateEnum
CREATE TYPE "Grade" AS ENUM ('Amateur', 'Expert');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('Waiting', 'Accepted', 'Rejected', 'Invalidated');

-- CreateEnum
CREATE TYPE "Field" AS ENUM ('Next', 'Modern', 'API', 'Web', 'Career');

-- CreateEnum
CREATE TYPE "Type" AS ENUM ('Document', 'Blog');

-- CreateEnum
CREATE TYPE "WorkAction" AS ENUM ('Create', 'Update', 'Delete');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'User',
    "nickname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "refreshToken" TEXT,
    "provider" TEXT NOT NULL DEFAULT 'local',
    "providerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "grade" "Grade" DEFAULT 'Amateur',
    "name" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Application" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'Waiting',
    "appliedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "invalidationComment" TEXT,
    "invalidatedAt" TIMESTAMP(3),

    CONSTRAINT "Application_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Challenge" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "field" "Field" NOT NULL,
    "docType" "Type" NOT NULL,
    "docUrl" TEXT NOT NULL,
    "deadLine" TIMESTAMP(3) NOT NULL,
    "description" TEXT NOT NULL,
    "progress" BOOLEAN NOT NULL DEFAULT false,
    "participants" INTEGER NOT NULL DEFAULT 0,
    "maxParticipants" INTEGER NOT NULL,

    CONSTRAINT "Challenge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedback" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "workId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Work" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "lastModifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isSubmitted" BOOLEAN NOT NULL,
    "submittedAt" TIMESTAMP(3),

    CONSTRAINT "Work_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Like" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "workId" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participate" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,

    CONSTRAINT "Participate_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkLog" (
    "id" SERIAL NOT NULL,
    "workId" INTEGER,
    "userId" INTEGER NOT NULL,
    "challengeId" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "action" "WorkAction" NOT NULL,
    "message" TEXT,
    "previousContent" TEXT,
    "currentContent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WorkLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_nickname_key" ON "User"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_providerId_key" ON "User"("providerId");

-- CreateIndex
CREATE UNIQUE INDEX "Application_challengeId_key" ON "Application"("challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "Work_userId_challengeId_key" ON "Work"("userId", "challengeId");

-- CreateIndex
CREATE UNIQUE INDEX "Participate_userId_challengeId_key" ON "Participate"("userId", "challengeId");

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Application" ADD CONSTRAINT "Application_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Work" ADD CONSTRAINT "Work_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participate" ADD CONSTRAINT "Participate_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Participate" ADD CONSTRAINT "Participate_challengeId_fkey" FOREIGN KEY ("challengeId") REFERENCES "Challenge"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Work"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkLog" ADD CONSTRAINT "WorkLog_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
