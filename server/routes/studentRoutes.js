import express from 'express';
import { getMyAttempts , getProfileStats} from '../controllers/studentController.js';
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();


router.get('/my-attempts', authMiddleware, getMyAttempts);

router.get('/profile-stats', authMiddleware, getProfileStats);

export default router;
