import participationRepository from '../repositories/participationRepository.js';
import challengeRepository from '../repositories/challengeRepository.js';

async function create(challengeId, user) {
  const userId = user.id;
  const challenge = await challengeRepository.findById(challengeId);

  if (user.role === "Admin") {
    const error = new Error("관리자는 참가할 수 없습니다.");
    error.status = 403;
    throw error;
  }

  if (challenge.maxParticipants <= challenge.participants) {
    const error = new Error("참가 인원이 초과되었습니다.");
    error.status = 400;
    throw error;
  };

  if (!challenge.progress || !challenge.applications.status === "Accepted") {
    const error = new Error("참여할 수 없는 챌린지 입니다.");
    error.status = 400;
    throw error;
  }

  return await participationRepository.create(parseInt(challengeId), userId);
};

async function getUrl(id) {
  return await participationRepository.getUrl(id);
};

export default { create, getUrl };