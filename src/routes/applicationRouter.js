import express from 'express';
import { getApplications, deleteApplication } from '../controllers/applicationController.js';

const router = express.Router();

router.get('/', getApplications);
router.delete('/:id', deleteApplication);

export default router;