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

export const getChallengeById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const challenge = await challengeService.getById(id, user);
    res.json(challenge);
  } catch (e) {
    console.error(e);
    const status = e.status || 500;
    res.status(status).json({ message: e.message });
  }
});

export const createChallenge = asyncHandler(async (req, res) => {
  try {
    const userId = req.user.id;
    const challengeData = {
      ...req.body,
      userId
    }

    const challenge = await challengeService.create(challengeData);
    res.status(201).json(challenge);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

export const patchChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;

  try {
    const challenge = await challengeService.update(id, req.body, user);
    res.json(challenge);
  } catch (e) {
    console.error(e);
    const status = e.status || 500;
    res.status(status).json({ message: e.message });
  }
});

export const deleteChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { invalidationComment } = req.body;

  try {
    const challenge = await challengeService.invalidate(id, invalidationComment);
    res.json(challenge);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});