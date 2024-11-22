import feedbackService from "../services/feedbackService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getFeedbacks = asyncHandler(async (req, res) => {
  const { page = 1, limit = 3 } = req.query;
  const { id } = req.params;

  try {
    const feedbacks = await feedbackService.getFeedbacks({
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

