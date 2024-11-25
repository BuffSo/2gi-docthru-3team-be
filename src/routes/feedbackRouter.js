import express from 'express';
import passport from '../config/passport.js';
import { getFeedbacks, postFeedback, patchFeedback, deleteFeedback } from '../controllers/feedbackController.js';

const router = express.Router();

router.get('/works/:id/feedbacks',
  passport.authenticate('access-token', { session: false }),
  getFeedbacks
);

router.post('/works/:id/feedbacks',
  passport.authenticate('access-token', { session: false }),
  postFeedback
);

router.patch('/feedbacks/:id',
  passport.authenticate('access-token', { session: false }),
  patchFeedback
);

router.delete('/feedbacks/:id',
  passport.authenticate('access-token', { session: false }),
  deleteFeedback
);

export default router;