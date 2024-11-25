import participationService from "../services/participationService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const postParticipation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const participation = await participationService.create(parseInt(id), user);
    res.status(201).json(participation);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || "참여 신청 중 오류가 발생했습니다." });
  }
});

export const getOriginal = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const participation = await participationService.getUrl(id);
    res.json(participation);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});
