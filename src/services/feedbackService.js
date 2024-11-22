import feedbackRepository from '../repositories/feedbackRepository.js';

async function getFeedbacks({ page, limit, id}) {
  const skip = (page - 1) * limit;
  const take = limit;
  const where = { where: parseInt(id) };
  
  const feedbacks = await feedbackRepository.get({ where, skip, take });

  const totalCount = await feedbackRepository.count({ where });

  return { list: feedbacks, totalCount };
};

export default { getFeedbacks };