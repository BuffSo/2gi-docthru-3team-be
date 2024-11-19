import asyncHandler from '../middlewares/asyncHandler.js';
import userService from '../services/userService.js';

// 회원가입
export const signUp = asyncHandler(async (req, res) => {
  const user = await userService.createUser(req.body);
  return res.status(201).json(user);
});

// 로그인
export const signIn = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await userService.signIn(email, password);

  return res.json({
    accessToken,
    refreshToken,
    user,
  });
});

// Refresh Token을 통한 Access Token 갱신
export const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required' });
  }

  const userId = req.user?.id;

  // 토큰 유효성 검사 및 갱신
  const { accessToken, newRefreshToken } = await userService.refreshToken(userId, refreshToken);

  // 새로운 Refresh Token 저장
  await userService.updateUser(userId, { refreshToken: newRefreshToken });

  return res.json({
    accessToken,
    refreshToken: newRefreshToken, // 새로 발급된 Refresh Token 반환
  });
});