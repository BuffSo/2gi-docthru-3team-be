import workRepository from '../repositories/workRepository.js';

// Work 상세 조회 서비스
async function getWorkDetailById(id, page = 1, limit = 10) {
  const work = await workRepository.findById(id, page, limit);

  if (!work) {
    return null;
  }

  return {
    id: work.id,
    content: work.content,
    lastModifiedAt: work.lastModifiedAt,
    isSubmitted: work.isSubmitted,
    submittedAt: work.submittedAt,
    user: {
      id: work.user.id,
      nickname: work.user.nickname,
    },
    challenge: {
      id: work.challenge.id,
      title: work.challenge.title,
    },
    feedbacks: work.feedbacks, // 이미 Repository에서 가공된 데이터 사용
    likeCount: work.likeCount,
  };
}

export default {
  getWorkDetailById,
};

/*
import workRepository from '../repositories/workRepository.js';

// Work 상세 조회
async function getWorkDetailById(id) {
  const work = await workRepository.findById(id);

  if (!work) {
    return null;
  }

  const likeCount = work.likes.length;

  return {
    id: work.id,
    content: work.content,
    lastModifiedAt: work.lastModifiedAt,
    isSubmitted: work.isSubmitted,
    submittedAt: work.submittedAt,
    user: {
      id: work.user.id,
      nickname: work.user.nickname,
    },
    challenge: {
      id: work.challenge.id,
      title: work.challenge.title,
    },
    feedbacks: work.feedbacks.map((feedback) => ({
      id: feedback.id,
      content: feedback.content,
      createdAt: feedback.createdAt,
      user: { nickname: feedback.user.nickname },
    })),
    likeCount,
  };
}

export default {
  getWorkDetailById,
};
*/