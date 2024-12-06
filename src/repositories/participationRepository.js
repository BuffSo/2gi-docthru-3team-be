import prisma from "../config/prisma.js";

async function findWork(challengeId, userId) {
  return await prisma.work.findFirst({
    where: { challengeId, userId },
    select: { id: true }
  });
}

async function findParticipate(challengeId, userId) {
  return await prisma.participate.findFirst({
    where: { challengeId, userId },
    select: { id: true }
  });
}

async function create(challengeId, userId) {
  return await prisma.$transaction(async (prisma) => {
    const participate = await prisma.participate.create({
      data: { userId, challengeId }
    });

    const work = await prisma.work.create({
      data: {
        userId,
        challengeId,
        content: "",
        isSubmitted: false
      }
    });

    const challenge = await prisma.challenge.update({
      where: { id: challengeId },
      data: { participants: { increment: 1 } }
    });

    return {
      id: participate.id,
      workId: work.id,
      participants: challenge.participants,
      message: "참가가 완료되었습니다."
    };
  });
}

async function getUrl(id) {
  return await prisma.challenge.findUnique({
    where: { id },
    select: { docUrl: true }
  });
}

export default { findWork, findParticipate, create, getUrl };
