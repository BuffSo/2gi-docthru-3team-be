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

export default { get, count };
