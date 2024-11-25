import asyncHandler from "../middlewares/asyncHandler.js";
import workService from "../services/workService.js";
import { debugLog } from "../utils/logger.js";
import { BadRequestError, NotFoundError }  from '../errors/index.js';

/*************************************************************************************
 * 작업물 상세 조회
 * ***********************************************************************************
 */
export const getWorkDetail = asyncHandler(async (req, res) => {
  const { workId } = req.params;
  const { page = 1, limit = 3, order = 'createdAt', sort = 'asc' } = req.query;
  const user = req.user || null;

  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 3;

  const workDetail = await workService.getWorkDetailById(workId, user, pageNumber, limitNumber, order, sort);

  if (!workDetail) {
    throw new NotFoundError('요청하신 작업물이 없습니다.');
  }

  return res.status(200).json(workDetail);
});

/*************************************************************************************
 * 작업물 수정
 * ***********************************************************************************
 */
export const updateWork = asyncHandler(async (req, res, next) => {
  const { workId } = req.params;
  const { content } = req.body;
  const user = req.user;

  debugLog('번역 작업물 수정 user', req.user);

  if (!content) {
    throw new NotFoundError('요청에 작업 내용이 없습니다.');
  }

  const updatedWork = await workService.updateWork({ workId, user, content });

  return res.status(200).json({
    message: '작업물이 성공적으로 수정되었습니다.',
    work: {
      id: updatedWork.id,
      challengeId: updatedWork.challengeId,
      content,
      lastModifiedAt: updatedWork.lastModifiedAt,
    },
  });
});

/*************************************************************************************
 * 작업물 제출
 * ***********************************************************************************
 */
export const submitWork = asyncHandler(async (req, res) => {
  const { challengeId, content } = req.body;
  const user = req.user;

  if( !challengeId || !content) {
    throw new BadRequestError('챌린지 ID 또는, 작업 내용이 없습니다.');
  }

  const submittedWork = await workService.submitWork({ challengeId, user, content });

  return res.status(201).json({
    message: '작업물이 성공적으로 제출되었습니다.',
    work: {
      id: submittedWork.id,
      challengeId: submittedWork.challengeId,
      content: submittedWork.content,
      submittedAt: submittedWork.submittedAt,
      isSubmitted: submittedWork.isSubmitted,
    },
  });
});

/*************************************************************************************
 * 작업물 삭제
 * ***********************************************************************************
 */
export const deleteWork = asyncHandler(async (req, res) => {
  const { workId } = req.params;
  const user = req.user;

  await workService.deleteWork({ workId, user });

  return res.status(200).json({
    message: '작업물이 성공적으로 삭제되었으며, 챌린지 참여가 취소되었습니다.',
  })
})

/*************************************************************************************
 * 좋아요 토글 (추가/취소)
 * ***********************************************************************************
 */
export const toggleLike = asyncHandler(async (req, res) => {
  const { workId } = req.params;
  const user = req.user;

  const result = await workService.toggleLike({ workId, user });

  if (result.isLiked) {
    return res.status(201).json({
      message: '좋아요가 추가되었습니다.',
      likeCount: result.likeCount,
    });
  } else {
    return res.status(200).json({
      message: '좋아요가 취소되었습니다.',
      likeCount: result.likeCount,
    })
  }
})