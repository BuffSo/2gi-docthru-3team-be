import applicationService from "../services/applicationService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getApplications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, keyword, status, order, sort } = req.query;

  const filters = { status, order, sort, keyword };

  try {
    const application = await applicationService.get({
      page: parseInt(page),
      limit: parseInt(limit),
      filters
    });

    res.json(application);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});
