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

/*
import prisma from '../config/prisma.js';

async function create(data, prismaClient = prisma) {
  const { workId, userId, ...restData } = data;
  return prismaClient.workLog.create({
    data: {
      ...restData,
      work: {
        connect: { id: workId },
      },
      user: {
        connect: { id: userId },
      },
      //invalidField: 'this will cause an error',       // 테스트용(일부러 오류 내기)
    },
  });
}

export default {
  create,
};
*/