import express from 'express';
import { getChallenges, getChallengeById, createChallenge, patchChallenge, deleteChallenge } from '../controllers/challengeController.js';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.post('/', createChallenge);
router.patch('/:id', patchChallenge);
router.patch('/:id/invalidate', deleteChallenge);

export default router;