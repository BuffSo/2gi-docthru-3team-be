import prisma from "../config/prisma.js";

async function get({ where, orderBy, skip, take }) {
  return await prisma.challenge.findMany({
    where,
    orderBy,
    skip,
    take
  });
};

async function count({ where }) {
  return await prisma.challenge.count({ where });
};

export default { get, count };