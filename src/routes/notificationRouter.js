import express from 'express';
import passport from 'passport';
import { getNotificationWithUserInfo, markNotificationAsRead } from '../controllers/notificationController.js';

const router = express.Router();

// 알림 조회 (with 유저 정보) 조회
router.get('/',
  passport.authenticate('access-token', { session: false }),
  getNotificationWithUserInfo
)

// 특정 알림 읽음 표시
router.patch('/:id/read',
  passport.authenticate('access-token', { session: false }),
  markNotificationAsRead
)

export default router;
