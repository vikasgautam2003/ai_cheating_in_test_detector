    import express from 'express';
    import { logViolation } from '../controllers/attemptController.js';
    import { submitTest } from '../controllers/attemptController.js';


    import auth from '../middlewares/auth.js';

    const router = express.Router();

    router.post('/:id/log', auth, logViolation);

    // routes/attemptRoutes.js
    router.post("/:id/submit", auth, submitTest);


    export default router;