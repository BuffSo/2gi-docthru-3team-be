import express from 'express';
import { getChallenges } from '../controllers/challengeController.js';

const router = express.Router();

router.get('/', getChallenges);

export default router;