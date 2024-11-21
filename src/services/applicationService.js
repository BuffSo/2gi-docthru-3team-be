import applicationRepository from "../repositories/applicationRepository.js";
import challengeRepository from "../repositories/challengeRepository.js";

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

  const orderBy = order ? (order === 'deadLine' 
    ? { challenge: { deadLine: sort === 'asc' ? 'asc' : 'desc' } } 
    : { [order]: sort === 'asc' ? 'asc' : 'desc' }) 
    : { appliedAt: 'asc' };

  const applications = await applicationRepository.get({ where, skip, take, orderBy });
  
  const totalCount = await applicationRepository.count({ where });

  return { data: applications, totalCount };
};

async function getById(id) {
  return await applicationRepository.findById(parseInt(id));
}

async function remove(id, user) {
  const application = await applicationRepository.findById(parseInt(id));  // 해당 신청서를 가져오기

  if (!application) {
    throw new Error('신청서를 찾을 수 없습니다.');
  }

  if (application.status !== "Waiting") {
    throw new Error('승인 대기 상태일 때만 신청을 취소할 수 있습니다.');
  }

  const isOwner = user.id === application.userId;

  if (!isOwner) {
    throw new Error("권한이 없습니다." );
  }

  return await challengeRepository.remove(application.challengeId);
}

export default { get, getById, remove };