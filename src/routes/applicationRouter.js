import express from 'express';
import { getApplications, getApplicationById, deleteApplication } from '../controllers/applicationController.js';

const router = express.Router();

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.delete('/:id', deleteApplication);

export default router;