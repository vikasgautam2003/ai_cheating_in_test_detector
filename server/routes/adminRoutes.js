import express from 'express';
import { getDashboardStats , getAdminTests, deleteTest, getAllAttemptsForAdmin, getRecentActivity} from '../controllers/adminController.js';
import authMiddleware from '../middlewares/auth.js';
import adminMiddleware from '../middlewares/adminMiddleware.js';

const router = express.Router();

router.get('/dashboard-stats', authMiddleware, adminMiddleware, getDashboardStats);


router.get('/tests', authMiddleware, adminMiddleware, getAdminTests);
router.delete('/tests/:id', authMiddleware, adminMiddleware, deleteTest);

router.get('/attempts', authMiddleware, adminMiddleware, getAllAttemptsForAdmin);

router.get('/recent-activity', authMiddleware, adminMiddleware, getRecentActivity);


export default router;
