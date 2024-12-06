import feedbackService from "../services/feedbackService.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { debugLog, devLog } from "../utils/logger.js";

export const getFeedbacks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const { id } = req.params;

  try {
    const feedbacks = await feedbackService.get({
      page: parseInt(page),
      limit: parseInt(limit),
      id
    });
    res.json(feedbacks);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

export const postFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { content } = req.body;

  try {
    const feedback = await feedbackService.create(id, user, content);
    res.status(201).json(feedback);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || "피드백 작성 중 오류가 발생했습니다." });
  }
});

export const patchFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const { content } = req.body;

  try {
    const feedback = await feedbackService.update(id, user, content);
    res.json(feedback);
  } catch (e) {
    console.error(e);
    res.status(e.status || 500).json({ message: e.message || "피드백 수정 중 오류가 발생했습니다." });
  }
});

export const deleteFeedback = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  
  await feedbackService.remove(id, user);
  devLog(`user (id : ${user.id}) 가 feedback ('id : ${id}')를 삭제하였습니다.`);

  res.status(204).send();
});
