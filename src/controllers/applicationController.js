import applicationService from "../services/applicationService.js";
import asyncHandler from "../middlewares/asyncHandler.js";
import { BadRequestError } from '../errors/index.js';

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

  try {
    const application = await applicationService.getById(id, user);
    res.json(application);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

export const patchApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status, invalidationComment } = req.body;

  if (!["Accepted", "Rejected"].includes(status)) {
    throw new BadRequestError("유효하지 않은 상태입니다.");
  }

  try {
    const application = await applicationService.update(parseInt(id), { status, invalidationComment });
    res.json(application);
  } catch (e) {
    console.error(e);
    const status = e.status || 500;
    res.status(status).json({ message: e.message });
  }
})

export const deleteApplication = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    await applicationService.remove(id,user);
    res.status(204).send();
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});