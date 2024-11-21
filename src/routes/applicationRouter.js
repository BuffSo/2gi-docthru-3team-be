import express from 'express';
import { getApplications, getApplicationById, patchApplication, deleteApplication } from '../controllers/applicationController.js';

const router = express.Router();

router.get('/', getApplications);
router.get('/:id', getApplicationById);
router.patch('/:id', patchApplication);
router.delete('/:id', deleteApplication);

export default router;