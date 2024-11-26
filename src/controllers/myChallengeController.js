import asyncHandler from "../middlewares/asyncHandler.js";
import myChallengeService from "../services/myChallengeService.js";

/*************************************************************************************
 * 참여 중인 챌린지 목록 조회
 * ***********************************************************************************
 */
export const getOngoingChallenges = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, order = 'dead_line', sort = 'desc', keyword = '', field, type } = req.query;
  const userId = req.user.id;

  const filters = {
    keyword,
    field: field ? field.split(',') : undefined,
    type,
  };

  const pagination = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    order,
    sort,
  };

  const result = await myChallengeService.getOngoingChallenges(userId, filters, pagination);
  res.status(200).json(result);
});

/*************************************************************************************
 * 완료한 챌린지 목록 조회
 * ***********************************************************************************
 */
export const getCompletedChallenges = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, order = 'dead_line', sort = 'desc', keyword = '', field, type } = req.query;

  const filters = {
    keyword,
    field: field ? field.split(',') : undefined,
    type,
  };

  const pagination = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    order,
    sort,
  };

  const result = await myChallengeService.getCompletedChallenges(req.user.id, filters, pagination);
  res.status(200).json(result);
});

/*************************************************************************************
 * 내가 신청한 챌린지 목록 조회
 * ***********************************************************************************
 */
export const getApplicationChellenges = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, order = 'applied_at', sort = 'desc', status } = req.query;

  const pagination = {
    page: parseInt(page, 10),
    limit: parseInt(limit, 10),
    order,
    sort,
  };

  const result = await myChallengeService.getApplicationChellenges(req.user.id, status, pagination);
  res.status(200).json(result);
});
