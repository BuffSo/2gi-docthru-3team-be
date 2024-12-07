import prisma from '../config/prisma.js';

async function get({ where, skip, take, orderBy, include }) {
  return prisma.challenge.findMany({
    where,
    skip,
    take,
    orderBy,
    include,
  });
}

async function count({ where }) {
  return prisma.challenge.count({ where });
}

async function getApplications({ where, skip, take, orderBy }) {
  return await prisma.application.findMany({
    where,
    skip,
    take,
    orderBy, 
    include: {
      challenge: true,
    },
  });
}

async function countApplications({ where }) {
  return await prisma.application.count({ where });
}

export default {
  get,
  count,
  getApplications,
  countApplications,  
};
