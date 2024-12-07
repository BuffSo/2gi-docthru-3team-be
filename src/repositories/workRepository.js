import prisma from '../config/prisma.js';

// Work 상세 조회 (페이징 포함)

async function findById(id) {
  return prisma.work.findUnique({
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
          docUrl: true,
          docType: true,
          field: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true, 
          user: {
            select: { nickname: true },
          },
        },
      },
    },
  });
}

async function getFeedbacksByWorkId(workId, page = 1, limit = 3, order = 'createdAt', sort = 'asc') {
  const offset = (page - 1) * limit;

  const safeSort = ["asc", "desc"].includes(sort) ? sort : "asc";
  // 정렬 필드 매핑
  const orderMapping = {
    created_at: "createdAt",
    id: "id",
  };
  const orderField = orderMapping[order] || "createdAt";

  let orderBy = [{ [orderField]: safeSort }];     // 1차 정렬
  orderBy.push({ id: "asc" });                    //  2차 정렬로 id로 추가   

  // Feedback 페이징된 데이터
  const feedbacks = await prisma.feedback.findMany({
    where: { workId: parseInt(workId, 10) },
    skip: offset,
    take: limit,
    orderBy,
    select: {
      id: true,
      content: true,
      createdAt: true,
      user: {
        select: { nickname: true },
      },
    },
  });

  // Feedback 총 개수
  const totalCount = await prisma.feedback.count({
    where: { workId: parseInt(workId, 10) },
  });

  return { feedbacks, totalCount };
}

// 작업물 수정
const update = async (workId, data, prismaClient = prisma) => {
  return prismaClient.work.update({
    where: { id: parseInt(workId, 10) },
    data,
    include: {
      user: {
        select: { id: true, nickname: true }, 
      },
      challenge: {
        select: { id: true, title: true }, 
      },
    },
  });
};

// 유저 ID와 챌린지 ID로 작업물 조회
async function findByUserAndChallenge(userId, challengeId) {
  return prisma.work.findUnique({
    where: {
      userId_challengeId: {
        userId: parseInt(userId, 10),
        challengeId: parseInt(challengeId, 10),
      },
    },
  });
}

// 작업물 생성
async function create(data, prismaClient = prisma) {
  return prismaClient.work.create({
    data,
    include: {
      user: {
        select: { id: true, nickname: true }, 
      },
      challenge: {
        select: { id: true, title: true }, 
      },
    },
  });
}

// 작업물 삭제
async function deleteById(workId, prismaClient = prisma) {
  return prismaClient.work.delete({
    where: { 
      id: parseInt(workId, 10) 
    },
  });
}

// 좋아요 추가
async function createLike({ workId, userId }) {
  return prisma.like.create({
    data: {
      workId: parseInt(workId, 10),
      userId,
    }
  });
}

// 좋아요 취소
async function deleteLike(likeId) {
  // if (!likeId) {
  //   throw new BadRequestError('likeId 가 falsy 입니다.');
  // }
  return prisma.like.delete({
    where: {
      id: likeId,
    }
  })
}

// 좋아요 수 조회
async function countLikes(workId) {
  return prisma.like.count({
    where: {
      workId: parseInt(workId, 10),
    }
  })
}


export default {
  findById,
  getFeedbacksByWorkId,
  update,
  findByUserAndChallenge,
  create,
  deleteById,
  createLike,
  deleteLike,
  countLikes
};
