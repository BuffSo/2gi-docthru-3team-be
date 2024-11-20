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
  try {
    const challenge = await challengeService.getById(id);
    res.json(challenge);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

export const createChallenge = asyncHandler(async (req, res) => {
  try {
    /* const userId = req.user.userId;
    const challengeData = {
      ...req.body,
      userId
    } */
   
    // 테스트용
    const { userId, ...challengeData } = req.body;

    const challenge = await challengeService.create({ ...challengeData, userId });
    res.status(201).json(challenge);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

export const patchChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const testUser = {
    id: 1,
    nickname: 'nick1',
    role: 'User',
  };
  try {
    const challenge = await challengeService.update(id, req.body, testUser);
    res.json(challenge);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});

export const deleteChallenge = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const user = req.user;
  const testUser = {
    id: 2,
    nickname: 'nick2',
    role: 'Admin',
  };

  const { invalidationComment } = req.body;
  
  try {
    const challenge = await challengeService.invalidate(id, testUser, invalidationComment);
    res.json(challenge);
  } catch (e) {
    console.error(e);
    throw new Error(e);
  }
});