import asyncHandler from '../middlewares/asyncHandler.js';
import userService from '../services/userService.js';
import { debugLog } from '../utils/logger.js';
import { BadRequestError, UnauthorizedError, ForbiddenError }  from '../errors/index.js';

// 회원가입
export const signUp = asyncHandler(async (req, res) => {
  const { email, password, nickname } = req.body;

  if (!email || !password || !nickname) {
    throw new BadRequestError('이메일, 비밀번호, 닉네임을 모두 입력해주세요.');
  }

  const user = await userService.createUser(req.body);
  return res.status(201).json(user);
});

// 로그인
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError('이메일과 비밀번호를 입력해주세요.');
  }
  const { accessToken, refreshToken, user } = await userService.signIn(email, password);

  return res.json({
    accessToken,
    refreshToken,
    user,
  });
});

// 로그아웃
export const logout = asyncHandler(async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    throw new UnauthorizedError('로그인이 필요합니다.');
  }

  await userService.clearRefreshToken(userId);
  res.status(200).json({ message: '정상적으로 로그아웃 되었습니다.' });
});

// Refresh Token을 통한 Access Token 갱신
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  debugLog('refreshToken', refreshToken );

  if (!refreshToken) {
    throw new BadRequestError('Refresh token이 필요합니다.');
  }

  const userId = req.user?.id;

  if (!userId) {
    throw new UnauthorizedError('로그인이 필요합니다.');
  }

  // 토큰 유효성 검사 및 갱신
  const { accessToken, newRefreshToken } = await userService.refreshToken(userId, refreshToken);

  // 새로운 Refresh Token 저장
  await userService.updateUser(userId, { refreshToken: newRefreshToken });

  return res.json({
    accessToken,
    refreshToken: newRefreshToken, // 새로 발급된 Refresh Token 반환
  });
});

// 구글 로그인
export const googleLogin = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, id, nickname, email } = req.user;

  if (!accessToken || !refreshToken) {
    return res.status(400).json({ message: '토큰 생성 실패' });
  }

  const redirectUrl = `${process.env.BASE_URL}/google/callback?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${JSON.stringify({ id, nickname, email })}`;

  res.redirect(redirectUrl);
});

export const kakaoLogin = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, id, nickname, email } = req.user;

  if (!accessToken || !refreshToken) {
    return res.status(400).json({ message: '토큰 생성 실패' });
  }
  
  const redirectUrl = `${process.env.BASE_URL}/kakao/callback?accessToken=${accessToken}&refreshToken=${refreshToken}&user=${JSON.stringify({ id, nickname, email })}`;

  res.redirect(redirectUrl);
});

//////////////////////////////////////////////////////////
//✨ 관리자 권한이 필요한 작업에 대한 예제 코드입니다. //
//////////////////////////////////////////////////////////
export const someAdminFunction = asyncHandler(async (req, res) => {
  const user = req.user;

  // 인증 여부 확인
  if (!user) {
    throw new UnauthorizedError('로그인이 필요합니다.');
  }

  // 관리자 권한 확인
  if (user.role !== 'Admin') {
    throw new ForbiddenError('관리자 권한이 필요합니다.');
  }

  // 예제 데이터: 관리자가 처리할 작업
  const actionResult = {
    adminId: user.id, // JWT에서 추출된 사용자 ID
    adminRole: user.role, // JWT에서 추출된 사용자 역할
    message: '관리자 작업이 성공적으로 수행되었습니다.',
  };

  // 성공적인 응답 반환
  res.status(200).json(actionResult);
});
//////////////////////////////////////////////////////////