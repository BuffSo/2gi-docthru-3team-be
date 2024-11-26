import participationRepository from '../repositories/participationRepository.js';
import challengeRepository from '../repositories/challengeRepository.js';
import { BadRequestError, ForbiddenError } from '../errors/index.js';

async function create(challengeId, user) {
  const userId = user.id;
  const challenge = await challengeRepository.findById(challengeId);

  const isParticipated = await participationRepository.findParticipate(challengeId, userId);
  if (isParticipated) {
    const work = await participationRepository.findWork(challengeId, userId);
    return {
      id: isParticipated.id,
      workId: work?.id,
      message: "이미 참가한 챌린지입니다."
    };
  }

  if (user.role === "Admin") {
    throw new ForbiddenError("관리자는 참가할 수 없습니다.");
  }

  if (challenge.maxParticipants <= challenge.participants) {
    throw new BadRequestError("참가 인원이 초과되었습니다.");
  };

  if (!challenge.progress || challenge.applications.status !== "Accepted") {
    throw new BadRequestError("진행 중인 챌린지가 아닙니다.");
  }

  return await participationRepository.create(parseInt(challengeId), userId);
};

async function getUrl(id) {
  return await participationRepository.getUrl(parseInt(id));
};

export default { create, getUrl };