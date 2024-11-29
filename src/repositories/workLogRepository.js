import prisma from '../config/prisma.js';

async function create(data, prismaClient = prisma) {
  const { workId, userId, challengeId, ...restData } = data;

  return prismaClient.workLog.create({
    data: {
      ...restData,
      workId: workId ? parseInt(workId, 10) : null,
      userId: parseInt(userId, 10), 
      challengeId: parseInt(challengeId, 10),
    },
  });
}

export default {
  create,
};