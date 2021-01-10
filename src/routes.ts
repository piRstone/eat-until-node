import { Router } from 'express';

import authController from './controllers/auth';
import inventoriesController from './controllers/inventories';
import productsController from './controllers/products';

const router = Router();

router.use(authController);
router.use('/inventories', inventoriesController);
router.use('/products', productsController);

export default router;
