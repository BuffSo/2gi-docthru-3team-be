import express from 'express';
import { getChallenges, getChallengeById } from '../controllers/challengeController.js';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);

export default router;