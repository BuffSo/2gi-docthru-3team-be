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

async function findById({ id }) {
  return await prisma.feedback.findUnique({
    where: { id },
    select: { id: true, userId: true, content: true }
  });
}

async function findWork({ id }) {
  const work = await prisma.work.findUnique({
    where: { id },
    select: { isSubmitted: true },
  });

  return work.isSubmitted || false;
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

async function update({ id, content }) {
  return await prisma.feedback.update({
    where: { id },
    data: { content }
  });
}

async function remove({ id }) {
  return await prisma.feedback.delete({ where: { id } });
}

export default { get, count, findById, findWork, create, update, remove };
