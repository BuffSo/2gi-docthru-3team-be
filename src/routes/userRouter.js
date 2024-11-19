import express from 'express';
import passport from '../config/passport.js';
import { signUp, signIn, refreshAccessToken } from '../controllers/userController.js';

const router = express.Router();


// 회원가입
router.post('/signup', signUp);

// 로그인
router.post('/login', signIn);

// Refresh Token을 통한 Access Token 갱신
router.post('/refresh-token',
  passport.authenticate('refresh-token', { session: false }), // 인증 미들웨어
  refreshAccessToken
);

export default router;