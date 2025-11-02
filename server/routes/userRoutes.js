import express from 'express';
import { getMe } from '../controllers/userController.js';
import auth from '../middlewares/auth.js'

const router = express.Router();


router.get('/', auth, getMe);

export default router;
