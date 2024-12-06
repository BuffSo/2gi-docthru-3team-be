import express from 'express';
import passport from '../config/passport.js';
import { signUp, signIn, refreshAccessToken, someAdminFunction, logout, googleLogin, kakaoLogin } from '../controllers/userController.js';
import { adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();


// 회원가입
router.post('/signup', signUp);

// 로그인
router.post('/login', signIn);

// 로그아웃
router.post('/logout', 
  passport.authenticate('access-token', { session: false }),
  logout
);

// Refresh Token을 통한 Access Token 갱신
router.post('/refresh-token',
  passport.authenticate('refresh-token', { session: false }), // 인증 미들웨어
  refreshAccessToken
);

// 구글 로그인
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// 구글 로그인 콜백
router.get('/google/callback', (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user, info) => {
    if (err || !user) {
      const message = info?.message || '인증 실패';
      return res.redirect(`${process.env.BASE_URL}/login?error=${encodeURIComponent(message)}`);
    }
    req.user = user;
    next();
  })(req, res, next);
}, googleLogin
);

router.get('/kakao',
  passport.authenticate('kakao')
);

router.get('/kakao/callback', (req, res, next) => {
  passport.authenticate('kakao', { session: false }, (err, user, info) => {
    if (err || !user) {
      const message = info?.message || '인증 실패';
      return res.redirect(`${process.env.BASE_URL}/login?error=${encodeURIComponent(message)}`);
    }
    req.user = user;
    next();
  })(req, res, next);
  }, kakaoLogin
);

//////////////////////////////////////////////////////////
//✨ 관리자 권한이 필요한 작업에 대한 예제 코드입니다. //
//////////////////////////////////////////////////////////
router.get('/admin-action', 
  passport.authenticate('access-token', { session: false }), 
  (req, res, next) => {
    console.log('Auth Passed:', req.user); // 인증 성공 여부 확인
    next();
  },
  adminOnly, 
  someAdminFunction
);
//////////////////////////////////////////////////////////

export default router;