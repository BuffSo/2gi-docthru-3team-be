import prisma from "../config/prisma.js";

async function get({ where, skip, take }) {
  return await prisma.challenge.findMany({
    where,
    skip,
    take
  });
};

async function count({ where }) {
  return await prisma.challenge.count({ where });
};

export default { get, count };