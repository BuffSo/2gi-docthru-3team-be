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

async function create({ id, user, content }) {
  return await prisma.feedback.create({
    data: {
      content,
      userId: { connect: { id: user.id } },
      workId: { connect: { id } }
    }
  });
}

export default { get, count, create };
