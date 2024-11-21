import applicationService from "../services/applicationService.js";
import asyncHandler from "../middlewares/asyncHandler.js";

export const getApplications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, keyword, status, order, sort } = req.query;

  const filters = { status, order, sort, keyword };

  try {
    const application = await applicationService.get({
      page: parseInt(page),
      limit: parseInt(limit),
      filters,
    });

    res.json(application);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

export const getApplicationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const testAdmin = {
    id: 2,
    role: "Admin"
  };

  if (testAdmin.role !== "Admin") {
    res.status(403).json({ message: "권한이 없습니다." });
  };

  try {
    const application = await applicationService.getById(id);
    res.json(application);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
})

export const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const testUser = {
    id: 1,
  };

  try {
    await applicationService.remove(id, testUser);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});