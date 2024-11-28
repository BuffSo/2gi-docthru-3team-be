import feedbackRepository from '../repositories/feedbackRepository.js';
import { NotFoundError, BadRequestError } from '../errors/index.js';
import { debugLog } from '../utils/logger.js';

async function get({ page, limit, id}) {
  const skip = (page - 1) * limit;
  const take = limit;
  const where = { workId: parseInt(id) };
  
  const feedbacks = await feedbackRepository.get({ where, skip, take });

  const totalCount = await feedbackRepository.count({ where });

  const hasMore = skip + take < totalCount;

  return { list: feedbacks, totalCount, hasMore };
};

async function create(id, user, content) {
  const isSubmitted = await feedbackRepository.findWork({ id: parseInt(id), userId: user.id });
  if (!isSubmitted) {
    throw new BadRequestError("피드백을 남길 수 있는 작품이 아닙니다.");
  }

  return await feedbackRepository.create({ id: parseInt(id), user, content });
}

async function update(id, user, content) {
  const feedback = await feedbackRepository.findById({ id: parseInt(id) });
  if (!feedback) {
    throw new NotFoundError("수정할 피드백을 찾을 수 없습니다.");
  }

  // const isOwner = await feedbackRepository.findByIdAndUser({ id: parseInt(id), userId: user.id });  // 불필요
  const isOwner = feedback.userId === user.id;

  if (!isOwner && user.role !== "Admin") {
    debugLog('isOwner', isOwner);
    debugLog('user', user);
    throw new BadRequestError("자신이 작성한 피드백만 수정할 수 있습니다.");
  }

  return await feedbackRepository.update({ id: parseInt(id), content });
}

async function remove(id, user) {
  const feedback = await feedbackRepository.findById({ id: parseInt(id)});

  if (!feedback) {
    throw new NotFoundError("삭제할 피드백을 찾을 수 없습니다.");
  }

  const isOwner = feedback.userId === user.id;

  if (!isOwner && user.role !== "Admin") {
    throw new BadRequestError("자신의 피드백만 삭제할 수 있습니다.");
  }

  return await feedbackRepository.remove({ id: parseInt(id) });
}

export default { get, create, update, remove };