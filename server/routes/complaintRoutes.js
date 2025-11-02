// packages/server/src/routes/complaint.routes.js

import express from 'express';
import { createComplaint } from '../controllers/complaintController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();


router.post('/', authMiddleware, createComplaint);

export default router;