import express from 'express';
import passport from '../config/passport.js';
import { getApplications, getApplicationById, patchApplication, deleteApplication } from '../controllers/applicationController.js';
import { adminOnly } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 신규 챌린지 신청 목록 조회(Admin)
router.get('/', 
  passport.authenticate('access-token', { session: false }),
  adminOnly,
  getApplications
);

// 신규 챌린지 신청 상세 보기(Admin)
router.get('/:id', 
  passport.authenticate('access-token', { session: false }),
//  adminOnly,  // 챌린지 신청자도 볼 수 있도록 수정
  getApplicationById
);

// 신규 챌린지 승인 및 거절(Admin)
router.patch('/:id', 
  passport.authenticate('access-token', { session: false }),
  adminOnly,
  patchApplication
);

// 신규 챌린지 신청 취소(User)
router.delete('/:id', 
  passport.authenticate('access-token', { session: false }),
  deleteApplication);

export default router;