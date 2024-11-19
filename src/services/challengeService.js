import challengeRepository from "../repositories/challengeRepository.js";

async function get({ page, limit, filters }) {
  const skip = (page - 1) * limit;
  const take = limit;
  const { field, type, progress, keyword } = filters;

  const where = {
    AND: [
      field && field.length > 0 ? { field: { in: field } } : {}, 
      type ? { docType: type } : {},
      progress !== undefined ? { progress } : {},
      keyword ? {
        OR: [
          { title: { contains: keyword, mode: "insensitive" } },
          { description: { contains: keyword, mode: "insensitive" } }
        ]
      } : {}
    ]
  };

  const challenges = await challengeRepository.get({ where, skip, take });

  const totalCount = await challengeRepository.count({ where });

  return { data: challenges, totalCount };
};

async function getById(id) {
  const challenge = await challengeRepository.getById(id);

  if (!challenge) {
    throw new Error("Challenge not found");
  }

  const worksLikeCount = challenge.works.map((work) => ({
    id: work.id,
    nickname: work.user.nickname,
    grade: work.user.grade,
    likeCount: work._count.likes
  }));

  return {
    ...challenge,
    works: worksLikeCount,
    workTotalCount: challenge._count.works,
    _count: undefined
  };
}

export default { get, getById };