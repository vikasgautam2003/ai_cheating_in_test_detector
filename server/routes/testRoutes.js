import express from "express";
import { createTest, getAllTests, getTestById, startTest} from "../controllers/testController.js";
import auth from "../middlewares/auth.js";
import adminMiddleware from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post('/', auth, adminMiddleware, createTest);

router.get('/', auth, getAllTests);

router.get("/:id", auth, getTestById);

router.post('/:id/start', auth, startTest);

// router.post("/:id/submit", auth, submitTest);

export default router;


