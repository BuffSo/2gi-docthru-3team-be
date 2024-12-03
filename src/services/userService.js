import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from "../config/prisma.js";

import userRepository from "../repositories/userRepository.js";
import { debugLog, devLog } from '../utils/logger.js';
import { BadRequestError, UnauthorizedError, NotFoundError, ConflictError } from '../errors/index.js';
// 토큰 만료 시간
const TOKEN_EXPIRATION = {
  ACCESS: '1d',  
  REFRESH: '2w' 
};

async function hashingPassword(password) {
  return bcrypt.hash(password, 10);
}

function filterSensitiveUserData(user) {
  const { password, refreshToken, ...rest } = user;
  return rest;
}

async function verifyPassword(inputPassword, savedPassword) {
  const isVailid = await bcrypt.compare(inputPassword, savedPassword);
  if( !isVailid ) {
    throw new UnauthorizedError('이메일 또는 비밀번호가 일치하지 않습니다.');
  }
}

async function createUser(user) {
  const existedUser = await userRepository.findByEmail(user.email);

  if (existedUser) {
    throw new ConflictError('이미 사용 중인 이메일입니다.', { email: user.email });
  }

  const hashedPassword = await hashingPassword(user.password);
  const createdUser = await userRepository.save({ ...user, password: hashedPassword });
  return filterSensitiveUserData(createdUser);
}

async function signIn(email, password) {
  const user = await getUser(email, password); // getUser 호출
  const accessToken = createToken(user, 'access');
  const refreshToken = createToken(user, 'refresh');

  await updateUser(user.id, { refreshToken });
  // 등급 업데이트 수행
  const updatedGrade = await updateUserGrade(user.id);
  user.grade = updatedGrade;

  return {
    accessToken,
    refreshToken,
    user,
  };
}

async function getUser(email, password) {
  try {
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedError('이메일 또는 비밀번호가 일치하지 않습니다.');
    }
    await verifyPassword(password, user.password); // 비밀번호 검증
    return filterSensitiveUserData(user);
  } catch (error) {
    console.error('로그인 오류:', error.message); // 에러 로그 추가
    throw error; 
  }
}

async function getUserById(id) {
    if (!id) {
      throw new BadRequestError('유효하지 않은 ID입니다.');
    }
  
  const user = await userRepository.findById(id);

  if( !user ) {
    throw new NotFoundError('사용자를 찾을 수 없습니다.');
  }

  return filterSensitiveUserData(user);  
}

async function updateUser(id, data) {
  return await userRepository.update(id, data);
}

function createToken(user, type) {
  //debugLog(`User object in ${type}Token:`, user);
  const payload = { 
    userId: user.id,
    role: user.role,   // User Role 추가
  };
  const options = {
    expiresIn: type === 'refresh' ? TOKEN_EXPIRATION.REFRESH : TOKEN_EXPIRATION.ACCESS,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, options);
}

async function refreshToken(userId, refreshToken) {
  debugLog(`refreshToken func() userId:, ${userId}`);
  debugLog(`refreshToken func() received refreshToken: ${refreshToken}`);

  const user = await userRepository.findById(userId);

  // 사용자 또는 토큰 유효성 검사
  if (!user) {
    console.error(`Error: User not found. userId: ${userId}`);
    throw new NotFoundError('해당 사용자를 찾을 수 없습니다.');
  }

  if (user.refreshToken !== refreshToken) {
    debugLog(`Error: Refresh token mismatch. userId: ${userId}`);
    throw new UnauthorizedError('인증 정보가 유효하지 않습니다. 다시 로그인해주세요.');
  }
  // 새로운 accessToken 및 refreshToken 생성
  const accessToken = createToken(user);  
  const newRefreshToken = createToken(user, 'refresh'); 

  return { accessToken, newRefreshToken };  
}

async function clearRefreshToken(userId) {
  debugLog('clearRefreshToken Func() userId : ', userId);
  await userRepository.update(userId, { refreshToken: null });
}

async function oauthCreateOrUpdate(provider, providerId, email, nickname) {
  const user = await userRepository.createOrUpdate(provider, providerId, email, nickname);
  return filterSensitiveUserData(user);
}

// 유저 등급 변경
async function updateUserGrade(userId) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      grade: true,
      nickname: true,
     }, 
  });

  // 챌린지 참여 횟수와 추천 횟수 계산
  const challengeParticipationCount = await prisma.participate.count({
    where: { userId },
  });
  const likeCount = await prisma.like.count({
    where: { userId },
  });

  const newGrade =
    (challengeParticipationCount >= 5 && likeCount >= 5) ||
    challengeParticipationCount >= 10 ||
    likeCount >= 10
      ? 'Expert'
      : 'Amateur';

  if (user.grade !== newGrade) {
    await prisma.user.update({
      where: { id: userId },
      data: { grade: newGrade },
    });
    debugLog('challengeParticipationCount', challengeParticipationCount);
    debugLog('likeCount', likeCount);
    devLog(user.nickname, '\'s grade is updated : ', user.grade , ' -> ', newGrade);
  }

  return newGrade;
}

export default {
  createUser,
  getUser,
  signIn,
  getUserById,
  updateUser,
  createToken,
  refreshToken,
  clearRefreshToken,
  oauthCreateOrUpdate,
  updateUserGrade,
}