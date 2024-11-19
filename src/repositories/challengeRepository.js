import prisma from "../config/prisma.js";

async function get({ where, skip, take }) {
  return await prisma.challenge.findMany({
    where,
    skip,
    take,
    orderBy: { deadLine: "asc" },
  });
};

async function count({ where }) {
  return await prisma.challenge.count({ where });
};

async function getById(id) {
  return await prisma.challenge.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      /* to-do: 챌린지를 신청한 User, Admin만 
                Accepted가 아닌 상태에서 조회 가능하도록 수정 */
      applications: { select: { status: true }},
      works: {
        include: {
          user: {
            select: {
              id: true,
              nickname: true,
              grade: true,
            }
          },
          _count: {
            select: { likes: true },
          },
      },
    },
    _count: {
      select: { works: true },
    },
  },
  });
};

export default { get, count, getById };