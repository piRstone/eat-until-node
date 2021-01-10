import { Router } from 'express';

import authController from './controllers/auth';
import inventoriesController from './controllers/inventories';

const router = Router();

router.use(authController);
router.use('/inventories', inventoriesController);

export default router;
