import express from 'express';
import { generateQuestions } from '../controllers/chatbotController.js';
import authMiddleware from '../middlewares/auth.js';
import adminMiddleware from '../middlewares/adminMiddleware.js'; 

const router = express.Router();

router.post('/generate-questions', authMiddleware, adminMiddleware, generateQuestions);

export default router;