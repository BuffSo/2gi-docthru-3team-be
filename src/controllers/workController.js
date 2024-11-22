import asyncHandler from "../middlewares/asyncHandler.js";
import workService from "../services/workService.js";

export const getWorkDetail = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { page = 1, limit = 3 } = req.query;

  // 숫자 변환 (잘못된 값 방지)
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) || 3;

  const workDetail = await workService.getWorkDetailById(id, pageNumber, limitNumber);

  if (!workDetail) {
    return res.status(404).json({ message: '요청하신 작업물이 없습니다.'});
  }

  return res.status(200).json(workDetail);
})