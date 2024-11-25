import prisma from '../config/prisma.js';
import challengeRepository from '../repositories/challengeRepository.js';
import workRepository from '../repositories/workRepository.js';
import participateRepository from '../repositories/participateRepository.js';
import { BadRequestError, NotFoundError, ForbiddenError }  from '../errors/index.js';
import workLogRepository from '../repositories/workLogRepository.js';
import { debugLog } from '../utils/logger.js';

/*************************************************************************************
 * 작업물 상세 조회
 * ***********************************************************************************
 */
async function getWorkDetailById(id, user, page = 1, limit = 3, order = 'createdAt', sort = 'asc') {
  const work = await workRepository.findById(id, page, limit);

  if (!work) {
    throw new NotFoundError('요청하신 작업물을 찾을 수 없습니다.');
  }

  let userLike = null;
  if (user) {
    userLike = await prisma.like.findFirst({
      where: {
        userId: user.id,
        workId: parseInt(id, 10),
      }
    });
  }

  // Feedback 데이터 페이징 처리
  const { feedbacks, totalCount } = await workRepository.getFeedbacksByWorkId(id, page, limit, order, sort);
  const hasMore = (page * limit) < totalCount; 

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
      docUrl: work.challenge.docUrl,
    },
    feedbacks: {
      list: feedbacks,
      totalCount,
      hasMore,
    },
    likeCount: work.likes.length,
    isLiked: !!userLike,
  };
}

/*************************************************************************************
 * 작업물 수정
 * ***********************************************************************************
 */
async function updateWork({ workId, user, content }) {
  const work = await workRepository.findById(workId);

  if (!work) {
    throw new NotFoundError('작업물을 찾을 수 없습니다.')
  }

  const isOwner = work.user.id === user.id;
  const isAdmin = user.role === 'Admin';
  if (!isOwner && !isAdmin) {
    throw new ForbiddenError('권한이 없습니다.')
  }

  const challenge = await challengeRepository.findById(work.challenge.id);
  const now = new Date();
  if (now > challenge.deadLine) {
    throw new BadRequestError('마감된 챌린지의 작업물은 수정할 수 없습니다.');
  }
  
  // const updatedWork = await workRepository.update(
  //   workId, 
  //   {
  //     content,
  //     lastModifiedAt: new Date(),
  //   }
  // );

  const previousContent = work.content;

  // 작업물 업데이트와 로그 생성
  const updatedWork = await prisma.$transaction(async (prismaClient) => {
    const updatedWork = await workRepository.update(
      workId, 
      {
        content,
        lastModifiedAt: new Date(),
      },
      prismaClient
    );

    await workLogRepository.create(
      {
        workId: work.id,
        userId: user.id,
        challengeId: work.challenge.id,
        email: user.email, 
        role: user.role,   
        action: 'Update',
        previousContent,
        currentContent: content,
        createdAt: new Date(),
      },
      prismaClient
    );
    return updatedWork;
  })

  return { ...updatedWork, challengeId: work.challenge.id };
}

/*************************************************************************************
 * 작업물 제출
 * ***********************************************************************************
 */
async function submitWork({ challengeId, user, content }) {
  const challenge = await challengeRepository.findById(challengeId);

  if (!challenge) {
    throw new NotFoundError('해당 챌린지를 찾을 수 없습니다.');
  }

  const now = new Date();
  if (now > challenge.deadLine) {
    throw new BadRequestError('챌린지 마감일이 지났습니다.');
  }

  const participation = await participateRepository.findByUserAndChallenge(user.id, challengeId);
  if (!participation) {
    throw new ForbiddenError('챌린지에 참여하지 않았습니다.');
  }

  // 기존 작업물 확인
  let work = await workRepository.findByUserAndChallenge(user.id, challengeId);

  if (work) {
    if (work.isSubmitted) {
      debugLog(`이미 제출한 작업물이 있습니다. (id: ${work.id})`);
      throw new BadRequestError('이미 제출한 작업물이 있습니다.');
    } else {
      // 작업물 업데이트와 로그 생성
      const previousContent = work.content;

      work = await prisma.$transaction(async (prismaClient) => {
        const updatedWork = await workRepository.update(
          work.id,
          {
            content,
            challengeId: challenge.id,
            lastModifiedAt: new Date(),
            isSubmitted: true,
            submittedAt: new Date(),
          },
          prismaClient
        );

        await workLogRepository.create(
          {
            workId: work.id,
            userId: user.id,
            challengeId: challenge.id,
            email: user.email,
            role: user.role,
            action: 'Update',
            previousContent,
            currentContent: content,
            createdAt: new Date(),
          },
          prismaClient
        );

        return updatedWork;
      });
    }
  } else {
    // 작업물 생성과 로그 생성
    work = await prisma.$transaction(async (prismaClient) => {
      const createdWork = await workRepository.create(
        {
          userId: user.id,
          challengeId: challenge.id,
          content,
          lastModifiedAt: new Date(),
          isSubmitted: true,
          submittedAt: new Date(),
        },
        prismaClient
      );

      await workLogRepository.create(
        {
          workId: createdWork.id,
          userId: user.id,
          challengeId: challenge.id,
          email: user.email,
          role: user.role,
          action: 'Create',
          previousContent: null,
          currentContent: content,
          createdAt: new Date(),
        },
        prismaClient
      );

      return createdWork;
    });
  }

  return { ...work, challengeId };
}

/*************************************************************************************
 * 작업물 삭제
 * ***********************************************************************************
 */
async function deleteWork({ workId, user, message }) {

  const work = await workRepository.findById(workId);

  if (!work) {
    throw new NotFoundError('작업물을 찾을 수 없습니다.');
  }

  const isOwner = work.user.id === user.id;
  const isAdmin = user.role === 'Admin';
  if (!isOwner && !isAdmin) {
    throw new ForbiddenError('권한이 없습니다.');
  }

  if (isAdmin && !message) {
    throw new BadRequestError('삭제 사유를 함께 보내주셔야 합니다.');
  }

  const challenge = await challengeRepository.findById(work.challenge.id);
  const now = new Date();
  if (now > challenge.deadLine) {
    throw new BadRequestError('마감된 챌린지의 작업물은 삭제할 수 없습니다.');
  }

  // 삭제 전에 필요한 로그 데이터를 미리 준비
  const workLogData = {
    workId: work.id,
    userId: user.id,
    challengeId: work.challenge.id,
    email: user.email, 
    role: user.role,   
    action: 'Delete',
    previousContent: work.content,
    currentContent: work.content,
    createdAt: new Date(),
    message: message || null,
  };

  // 작업물 삭제와 로그 생성 및 챌린지 참여 취소
  await prisma.$transaction(async (prismaClient) => {

    const challengeId = work.challenge.id;

    // 챌린지 참여 기록 삭제 (prismaClient 사용)
    await prismaClient.participate.deleteMany({
      where: {
        challengeId: challengeId,
        userId: user.id,
      },
    });
    
    // 챌린지 참여자 수 1 감소
    await prismaClient.challenge.update({
      where: { id: challengeId },
      data: { participants: { decrement: 1 } }
    });

    // 작업물 삭제 로그
    await workLogRepository.create(
      workLogData,
      prismaClient
    );
    
    // 작업물 삭제
    await workRepository.deleteById(workId, prismaClient);
  });
}

/*************************************************************************************
 * 좋아요 토글 (추가/취소)
 * ***********************************************************************************
 */
async function toggleLike({ workId, user }) {
  const work = await workRepository.findById(workId);

  if (!work) {
    throw new NotFoundError('해당 작업물을 찾을 수 없습니다.');
  }

  const existingLike = work.likes.find((like) => like.userId === user.id );

  if (existingLike) {
    await workRepository.deleteLike(existingLike.id);
  } else {
    await workRepository.createLike({ workId, userId: user.id });
  }

  const likeCount = await workRepository.countLikes(workId);

  return {
    isLiked: !existingLike,
    likeCount,
  }
}

export default {
  getWorkDetailById,
  updateWork,
  submitWork,
  deleteWork,
  toggleLike,
};

