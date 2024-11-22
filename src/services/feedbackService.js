import feedbackRepository from '../repositories/feedbackRepository.js';

async function get({ page, limit, id}) {
  const skip = (page - 1) * limit;
  const take = limit;
  const where = { workId: parseInt(id) };
  
  const feedbacks = await feedbackRepository.get({ where, skip, take });

  const totalCount = await feedbackRepository.count({ where });

  return { list: feedbacks, totalCount };
};

async function create(id, user, content) {
  const isOwner = await feedbackRepository.findById({ id: parseInt(id), userId: user.id });

  if (isOwner) {
    const error = new Error("자신의 작품에는 피드백을 남길 수 없습니다.");
    error.status = 400;
    throw error;
  }

  return await feedbackRepository.create({ id: parseInt(id), user, content });
}

export default { get, create };