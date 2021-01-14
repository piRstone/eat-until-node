import { Router } from 'express';

import authController from './controllers/auth';

const router = Router();

router.use(authController);

export default router;
