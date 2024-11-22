import prisma from "../config/prisma";

async function create(challengeId, userId) {
  return await prisma.$transaction(async (prisma) => {
    const isParticipated = await prisma.participate.findFirst({
      where: { userId, challengeId }
    });

    if (isParticipated) {
      const error = new Error("이미 참가한 챌린지입니다.");
      error.status = 400;
      throw error;
    }

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

export default { create, getUrl };
