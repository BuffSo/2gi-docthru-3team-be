import express from 'express';
import passport from '../config/passport.js';
import { getFeedbacks, postFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/:id/feedbacks',
  passport.authenticate('access-token', { session: false }),
  getFeedbacks
);

router.post('/:id/feedbacks',
  passport.authenticate('access-token', { session: false }),
  postFeedback
);

export default router;