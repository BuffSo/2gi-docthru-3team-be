import express from 'express';
import { getChallenges, getChallengeById, createChallenge } from '../controllers/challengeController.js';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.post('/', createChallenge);

export default router;