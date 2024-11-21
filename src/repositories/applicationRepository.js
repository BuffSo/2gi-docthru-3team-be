import prisma from "../config/prisma.js";

async function get({ where, skip, take, orderBy }) {
  return await prisma.application.findMany({
    where,
    skip,
    take,
    orderBy,
    include: {
      challenge: true
    },
  });
};

async function findById(id) {
  return await prisma.application.findUnique({ 
    where: { id: id },
    include: { challenge: true } 
  });
};

async function count({ where }) {
  return await prisma.application.count({ where });
};

async function create(data) {
  return await prisma.application.create({ data });
};

export default { get, findById, count, create };
