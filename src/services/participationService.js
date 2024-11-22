import participationRepository from '../repositories/participationRepository.js';

async function create(challengeId, user) {
  const userId = user.id;
  return await participationRepository.create(challengeId, userId);
};

async function getUrl(id) {
  return await participationRepository.getUrl(id);
};

export default { create, getUrl };