import feedbackRepository from '../repositories/feedbackRepository.js';

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
  const isOwner = await feedbackRepository.findById({ id: parseInt(id), userId: user.id });

  if (isOwner) {
    const error = new Error("자신의 작품에는 피드백을 남길 수 없습니다.");
    error.status = 400;
    throw error;
  }

  const isSubmitted = await feedbackRepository.findWork({ id: parseInt(id), userId: user.id });
  if (!isSubmitted) {
    const error = new Error("피드백을 남길 수 있는 작품이 아닙니다.");
    error.status = 400;
    throw error;
  }

  return await feedbackRepository.create({ id: parseInt(id), user, content });
}

async function update(id, user, content) {
  const isOwner = await feedbackRepository.findById({ id: parseInt(id), userId: user.id });

  if (!isOwner || !user.role === "Admin") {
    const error = new Error("자신의 피드백만 수정할 수 있습니다.");
    error.status = 400;
    throw error;
  }

  const feedback = await feedbackRepository.findById({ id: parseInt(id), userId: user.id });

  if (!feedback) {
    const error = new Error("수정할 피드백을 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  return await feedbackRepository.update({ id: parseInt(id), content });
}

async function remove(id, user) {
  const isOwner = await feedbackRepository.findById({ id: parseInt(id), userId: user.id });

  if (!isOwner || !user.role === "Admin") {
    const error = new Error("자신의 피드백만 삭제할 수 있습니다.");
    error.status = 400;
    throw error;
  }

  const feedback = await feedbackRepository.findById({ id: parseInt(id), userId: user.id });

  if (!feedback) {
    const error = new Error("삭제할 피드백을 찾을 수 없습니다.");
    error.status = 404;
    throw error;
  }

  return await feedbackRepository.remove({ id: parseInt(id) });
}

export default { get, create, update, remove };