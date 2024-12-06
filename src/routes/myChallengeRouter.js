import express from 'express';
import passport from 'passport';
import { getOngoingChallenges, getCompletedChallenges, getApplicationChellenges } from '../controllers/myChallengeController.js';

const router = express.Router();

// 참여 중인 챌린지 목록 조회
router.get('/ongoing', 
  passport.authenticate('access-token', { session: false }),
  getOngoingChallenges,
)

// 완료한 챌린지 목록 조회
router.get('/completed',
  passport.authenticate('access-token', { session: false }),
  getCompletedChallenges
);

// 내가 신청한 챌린지 목록 조회
router.get('/application',
  passport.authenticate('access-token', { session: false }),
  getApplicationChellenges
);

export default router;