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

  return { list: applications, totalCount };
};

async function getById(id) {
  return await applicationRepository.findById(parseInt(id));
};

async function update(id, data) {
  const application = await applicationRepository.findById(id);

  if (!application) {
    const error = new Error("신청서를 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  if (application.status !== "Waiting") {
    const error = new Error("승인 또는 거절 처리를 할 수 없습니다.");
    error.status = 400;
    throw error;
  }

  if (data.status === "Rejected" && !data.invalidationComment) {
    const error =  new Error("거절 사유가 필요합니다.");
    error.status = 400;
    throw error;
  }

  return await applicationRepository.update(id, data);
}

async function remove(id, user) {
  const application = await applicationRepository.findById(parseInt(id));  

  if (!application) {
    const error = new Error('신청서를 찾을 수 없습니다.');
    error.status = 404;
    throw error;
  }

  if (application.status !== "Waiting") {
    const error = new Error('승인 대기 상태일 때만 신청을 취소할 수 있습니다.');
    error.status = 400;
    throw error;
  }

  const isOwner = user.id === application.userId;

  if (!isOwner) {
    const error = new Error("권한이 없습니다.");
    error.status = 403;
    throw error;
  }

  return await challengeRepository.remove(application.challengeId);
}

export default { get, getById, update, remove };