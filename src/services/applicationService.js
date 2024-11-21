import applicationRepository from "../repositories/applicationRepository.js";

async function get({page, limit, filters}) {
  const skip = (page - 1) * limit;
  const take = limit;
  const { status, order, sort, keyword } = filters;

  const where = {
    AND: [
      status ? { status } : {},
      keyword ? {
        OR: [
          { name: { contains: keyword, mode: 'insensitive' } },
          { description: { contains: keyword, mode: 'insensitive' } }
        ],
      } : {},
    ],
  };

  const orderBy = order ? { [order]: sort === 'asc' ? 'asc' : 'desc'} : { appliedAt: 'asc' };

  const applications = await applicationRepository.get({ where, skip, take, orderBy });
  
  const totalCount = await applicationRepository.count({ where });

  return { data: applications, totalCount };
};

export default { get };