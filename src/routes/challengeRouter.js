import express from 'express';
import { getChallenges, getChallengeById, patchChallenge, deleteChallenge } from '../controllers/challengeController';

const router = express.Router();

router.get('/', getChallenges);
router.get('/:id', getChallengeById);
router.patch('/:id', patchChallenge);
router.delete('/:id', deleteChallenge);
