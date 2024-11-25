import express from 'express';
import { deleteWork, getWorkDetail, submitWork, toggleLike, updateWork } from '../controllers/workController.js';
import passport from '../config/passport.js';

const router = express.Router();

// 번역 작업물 상세 조회
router.get('/:workId', 
  passport.authenticate('access-token', { session: false }), 
  getWorkDetail
);

// 번역 작업물 수정
router.patch('/:workId', 
  passport.authenticate('access-token', { session: false }), 
  updateWork
);
  
// 번역 작업물 제출
router.post('/',
  passport.authenticate('access-token', { session: false }),
  submitWork
)

// 번역 작업물 삭제
router.delete('/:workId', 
  passport.authenticate('access-token', { session: false }), 
  deleteWork
);

router.post('/:workId/likes',
  passport.authenticate('access-token', { session: false }),
  toggleLike 
)

export default router;