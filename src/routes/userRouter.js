import express from 'express';
import passport from '../config/passport.js';
import { signUp, signIn, refreshAccessToken, someAdminFunction } from '../controllers/userController.js';
import { adminOnly } from '../middlewares/authMiddleware.js';

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

//////////////////////////////////////////////////////////
//✨ 관리자 권한이 필요한 작업에 대한 예제 코드입니다. //
//////////////////////////////////////////////////////////
router.get('/admin-action', 
  passport.authenticate('access-token', { session: false }), 
  adminOnly, 
  someAdminFunction
);
//////////////////////////////////////////////////////////

export default router;