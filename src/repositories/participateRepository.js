import prisma from '../config/prisma.js';

// 유저 ID와 챌린지 ID로 참여 정보 조회
async function findByUserAndChallenge(userId, challengeId) {
  return prisma.participate.findUnique({
    where: {
      userId_challengeId: {
        userId: parseInt(userId, 10),
        challengeId: parseInt(challengeId, 10),
      },
    },
  });
}

export default {
  findByUserAndChallenge,
};
