import express from "express";
import { createTest, getAllTests } from "../controllers/testController.js";
import auth from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post('/', auth, adminMiddleware, createTest);

router.get('/', auth, getAllTests);

export default router;

