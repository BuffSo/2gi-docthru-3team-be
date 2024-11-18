import challengeService from "../services/challengeService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getChallenges = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, keyword = "", field, type, progress } = req.query;

  const fieldArray = field ? field.split(',') : [];  
  
  const filters = {
    field: fieldArray.length > 0 ? fieldArray : undefined,
    type,
    progress: progress === "ongoing" ? true : progress === "completed" ? false : undefined,
    keyword
  };

  try {
    const challenges = await challengeService.get({
      page: parseInt(page),
      limit: parseInt(limit),
      filters
    });
    res.json(challenges);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});
