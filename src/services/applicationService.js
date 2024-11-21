import applicationRepository from "../repositories/applicationRepository.js";

async function get({ page, limit, filters }) {
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

async function remove(id, user) {
  const application = await applicationRepository.getById(id);  // 해당 신청서를 가져오기

  if (!application) {
    throw new Error('신청서를 찾을 수 없습니다.');
  }

  const isOwner = user.id === application.userId;

  if (!isOwner) {
    throw new Error("권한이 없습니다." );
  }

  return await applicationRepository.remove(id);
}

export default { get, remove };