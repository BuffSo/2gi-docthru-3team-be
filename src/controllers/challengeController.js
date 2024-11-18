import challengeService from "../services/challengeService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getChallenges = asyncHandler(async (req, res) => {
  const { page = 1, limit = 5, keyword = "", field, type, progress } = req.query;

  const fieldArray = field ? field.split(',') : [];  
  const typeArray = type ? type.split(',') : [];
  const progressArray = progress ? progress.split(',') : [];
  
  const filters = {
    field: fieldArray.length > 0 ? fieldArray : undefined,
    docType: typeArray.length > 0 ? typeArray : undefined,
    progress: progressArray.length > 0 ? progressArray : undefined,
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
