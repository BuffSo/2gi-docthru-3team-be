import applicationRepository from "../repositories/applicationRepository.js";
import challengeRepository from "../repositories/challengeRepository.js";
import { BadRequestError, NotFoundError, ForbiddenError } from "../errors/index.js";

async function get({ page, limit, filters }) {
  const skip = (page - 1) * limit;
  const take = limit;
  const { status, keyword } = filters;

  const where = {
    AND: [
      status ? { status } : {},
      keyword ? {
        OR: [
          { challenge: { title: { contains: keyword, mode: 'insensitive' } } },
          { challenge: { description: { contains: keyword, mode: 'insensitive' } } },
        ],
      } : {},
    ],
  };

  const applications = await applicationRepository.get({ where, skip, take, filters });
  
  const totalCount = await applicationRepository.count({ where });

  return { list: applications, totalCount };
};

async function getById(id, user) {
  const application = await applicationRepository.findById(parseInt(id));

  if (user.id !== application.userId) {
    throw new ForbiddenError("권한이 없습니다.");
  }

  return application;
};

async function update(id, data) {
  const application = await applicationRepository.findById(id);

  if (!application) {
    throw new NotFoundError("신청서를 찾을 수 없습니다.");
    // const error = new Error("신청서를 찾을 수 없습니다.");
    // error.status = 404;
    // throw error;
  }

  if (application.status !== "Waiting") {
    throw new BadRequestError("승인 대기 상태일 때만 처리할 수 있습니다.");
  }

  if (data.status === "Rejected" && !data.invalidationComment) {
    throw new BadRequestError("거절 사유가 필요합니다.");
  }

  if (data.status === "Accepted") {
    await challengeRepository.update(application.challengeId, { 
      progress: true 
    });
  }

  return await applicationRepository.update(id, data);
}

async function remove(id, user) {
  const application = await applicationRepository.findById(parseInt(id));  

  if (!application) {
    throw new NotFoundError("신청서를 찾을 수 없습니다.");
  }

  if (application.status !== "Waiting") {
    throw new BadRequestError("승인 대기 상태일 때만 신청을 취소할 수 있습니다.");
  }

  const isOwner = user.id === application.userId;

  if (!isOwner) {
    throw new ForbiddenError("권한이 없습니다.");
  }

  return await challengeRepository.remove(application.challengeId);
}

export default { get, getById, update, remove };