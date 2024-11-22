import prisma from "../config/prisma.js";

async function get({ where, skip, take }) {
  return await prisma.feedback.findMany({
    where,
    skip,
    take,
    orderBy: { createdAt: "desc" }
  });
}

async function count({ where }) {
  return await prisma.feedback.count({ where });
}

async function findById({ id, userId }) {
  const work = await prisma.work.findUnique({
    where: { id },
    select: { userId: true }
  });

  return work.userId === userId;
}

async function create({ id, user, content }) {
  return await prisma.feedback.create({
    data: {
      userId: user.id,
      workId: id,
      content,
    }
  });
}

export default { get, count, findById, create };
