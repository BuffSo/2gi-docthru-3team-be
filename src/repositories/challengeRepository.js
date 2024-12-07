import prisma from "../config/prisma.js";

async function get({ where, skip, take }) {
  const challenges = await prisma.challenge.findMany({
    where,
    include: {
      applications: true,
    },
    skip,
    take,
    orderBy: { deadLine: "asc" }
  });

  const now = new Date();
  const updatedChallenges = await Promise.all(
    challenges.map(async (challenge) => {
      if (challenge.deadLine < now && challenge.progress) {
        await prisma.challenge.update({
          where: { id: challenge.id },
          data: { progress: false }
        });
        challenge.progress = false; // 명시적으로 업데이트
      }
      return challenge;
    })
  );

  return updatedChallenges;
}

async function count({ where }) {
  return await prisma.challenge.count({ where });
}

async function getById(id) {
  return await prisma.challenge.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      participates: {
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              grade: true
            }
          }
        }
      },
      applications: {
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              grade: true
            }
          },
        },
      },
      works: {
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              grade: true
            }
          },
          _count: {
            select: { likes: true }
          }
        }
      },
      _count: {
        select: { works: true }
      }
    }
  });
}

async function findById(id) {
  return await prisma.challenge.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      applications: true,
      participates: true,
      works: true
    }
  });
}

async function create(data) {
  return await prisma.$transaction(async (prisma) => {
    const challenge = await prisma.challenge.create({ 
      data: {
        title: data.title,
        docUrl: data.docUrl,
        field: data.field,
        docType: data.docType,
        deadLine: data.deadLine,
        maxParticipants: parseInt(data.maxParticipants),
        description: data.description,
        applications: {
          create: {
            user: {
              connect: { id: data.userId }
            },
          },
        },
      }
    });

    return challenge;
  })
}

async function update(id, data) {
  return await prisma.challenge.update({
    where: { id: parseInt(id, 10) },
    data
  });
}

async function invalidate(id, invalidationComment, invalidatedAt) {
  return await prisma.$transaction(async (prisma) => {
    const application = await prisma.application.findUnique({
      where: { challengeId: parseInt(id, 10) },
    });

    if (!application || application.status !== "Accepted") {
      throw new Error('Cannot invalidate. Application status is not "Accepted".');
    }

    // Application 업데이트를 먼저 해야 Challenge 변경시 Trigger 에서 참조할 수 있음
    const updatedApplication = await prisma.application.update({
      where: { challengeId: parseInt(id, 10) },
      data: {
        status: "Invalidated",
        invalidationComment,
        invalidatedAt,
      },
    });

    const updatedChallenge = await prisma.challenge.update({
      where: { id: parseInt(id, 10) },
      data: {
        progress: false, 
      },
    });


    return { updatedChallenge, updatedApplication };
  });
}

async function remove(id) {
  return await prisma.challenge.delete({ where: { id: id }});
};

export default { get, count, getById, findById, create, update, invalidate, remove };
