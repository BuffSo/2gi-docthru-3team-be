import express from 'express';
import { getWorkDetail } from '../controllers/workController.js';

const router = express.Router();

// 번역 작업물 상세 조회
router.use('/:id', getWorkDetail);

export default router;