import express from 'express';
import { getResultById } from '../controllers/resultController.js';
import auth from '../middlewares/auth.js';


const router = express.Router();

router.get('/:id', auth, getResultById);

export default router;