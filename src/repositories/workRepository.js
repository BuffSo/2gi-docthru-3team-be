import prisma from '../config/prisma.js';

// Work 상세 조회 (페이징 포함)
async function findById(id, page = 1, limit = 10) {
  // Work 정보 조회
  const work = await prisma.work.findUnique({
    where: { id: parseInt(id, 10) },
    include: {
      user: {
        select: {
          id: true,
          nickname: true,
        },
      },
      challenge: {
        select: {
          id: true,
          title: true,
        },
      },
      likes: {
        select: {
          id: true,
          user: {
            select: { nickname: true },
          },
        },
      },
    },
  });

  if (!work) {
    return null;
  }

  // Feedback 데이터 페이징 처리
  const feedbacks = await prisma.feedback.findMany({
    where: { workId: parseInt(id, 10) },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: [
      { createdAt: 'asc' }, // 1차 정렬: createdAt 오름차순
      { id: 'asc' }         // 2차 정렬: id 오름차순
    ],
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: { nickname: true },
      },
    },
  });
  
  // Feedback 총 개수 계산
  const totalCount = await prisma.feedback.count({
    where: { workId: parseInt(id, 10) },
  });

  return {
    ...work,
    feedbacks: {
      list: feedbacks,
      totalCount,
    },
    likeCount: work.likes.length,
  };
}

export default {
  findById,
};
