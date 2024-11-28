import myChallengeRepository from "../repositories/myChallengeRepository.js";

/*************************************************************************************
 * 참여 중인 챌린지 목록 조회
 * ***********************************************************************************
 */
export async function getOngoingChallenges(userId, filters, pagination) {
  const { keyword, field, type } = filters;
  const { page, limit, order, sort } = pagination;

  const skip = (page - 1) * limit;
  const take = limit;

  const safeSort = ['asc', 'desc'].includes(sort) ? sort : 'desc';
  const orderMapping = {
    participants: 'participants',
    dead_line: 'deadLine',
  };
  const orderField = orderMapping[order] || 'deadLine';

  const where = {
    AND: [
      { participates: { some: { userId } } }, 
      { progress: true },
      field ? { field: { in: field } } : {}, 
      type  ? { docType: type } : {}, 
      keyword ? { title: { contains: keyword, mode: 'insensitive' } } : {},
    ].filter(Boolean),   // Falsy 조건을 제거
  };

  const challenges = await myChallengeRepository.get({
    where,
    skip,
    take,
    orderBy: { [orderField]: safeSort },
    include: {
      works: {
        where: { userId },    // 현재 로그인한 사용자 작업물만 가져옴
      },
    },
  });

  const totalCount = await myChallengeRepository.count({ where });

  return {
    list: challenges.map((challenge) => {
      const { works, ...challengeWithoutWorks } = challenge;
      return {
        ...challengeWithoutWorks,
        myWork: works[0] || null,   // 배열이 아닌 객체로 응답
      }
    }),
    totalCount,
    hasMore: skip + take < totalCount,
  };
}


/*************************************************************************************
 * 완료한 챌린지 목록 조회
 * ***********************************************************************************
 */
export async function getCompletedChallenges(userId, filters, pagination) {
  const { keyword, field, type } = filters;
  const { page, limit, order, sort } = pagination;

  const skip = (page - 1) * limit;
  const take = limit;

  const safeSort = ['asc', 'desc'].includes(sort) ? sort : 'desc';
  const orderMapping = {
    participants: 'participants',
    dead_line: 'deadLine',
  };
  const orderField = orderMapping[order] || 'deadLine';

  const where = {
    AND: [
      { participates: { some: { userId } } }, 
      { progress: false },
      field ? { field: { in: field } } : {}, 
      type  ? { docType: type } : {}, 
      keyword ? { title: { contains: keyword, mode: 'insensitive' } } : {},
    ].filter(Boolean),   // Falsy 조건을 제거
  };

  const challenges = await myChallengeRepository.get({
    where,
    skip,
    take,
    orderBy: { [orderField]: safeSort },
    include: {
      works: {
        where: { userId },    // 현재 로그인한 사용자 작업물만 가져옴
      },
      applications: true,
    },
  });

  const filteredChallenges = challenges.filter(challenge => 
    challenge.applications?.status === "Accepted"
  );
  const totalCount = await myChallengeRepository.count({ where });

  return {
    list: filteredChallenges.map((challenge) => {
      const { works, ...challengeWithoutWorks } = challenge;
      return {
        ...challengeWithoutWorks,
        myWork: works[0] || null,   // 배열이 아닌 객체로 응답
      }
    }),
    totalCount,
    hasMore: skip + take < totalCount,
  };
}

/*************************************************************************************
 * 내가 신청한 챌린지 목록 조회
 * ***********************************************************************************
 */
export async function getApplicationChellenges(userId, status, pagination) {
  const { page, limit, order, sort } = pagination;

  const skip = (page - 1) * limit;
  const take = limit;

  const safeSort = ['asc', 'desc'].includes(sort) ? sort : 'desc';
  const orderMapping = {
    applied_at: 'appliedAt',
    invalidated_at: 'invalidatedAt',
    status: 'status',
    dead_line: 'challenge.deadLine',
    participants: 'challenge.participants',
  };
  const orderField = orderMapping[order] || 'appliedAt';

  const statusMapping = {
    waiting: 'Waiting',
    accepted: 'Accepted',
    rejected: 'Rejected',
    invalidated: 'Invalidated',
  };

  const mappedStatus = status ? statusMapping[status.toLowerCase()] : undefined;

  const where = {
    AND: [
      { userId },
      mappedStatus ? { status: mappedStatus } : {},
    ],
  };

  const orderBy = { [orderField]: safeSort };

  const applications = await myChallengeRepository.getApplications({
    where,
    skip,
    take,
    orderBy,
  });

  const totalCount = await myChallengeRepository.countApplications({ where });

  return {
    list: applications,
    totalCount,
    hasMore: skip + take < totalCount,
  };
}

export default {
  getOngoingChallenges,
  getCompletedChallenges,
  getApplicationChellenges,
};

