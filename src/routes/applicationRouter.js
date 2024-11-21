import express from 'express';
import { getApplications } from '../controllers/applicationController.js';

const router = express.Router();

router.get('/', getApplications);

export default router;