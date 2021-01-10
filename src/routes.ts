import { Router } from 'express';

import authController from './controllers/auth';
import inventoriesController from './controllers/inventories';
import productsController from './controllers/products';
import usersController from './controllers/users';

const router = Router();

router.use(authController);
router.use('/inventories', inventoriesController);
router.use('/products', productsController);
router.use('/users', usersController);

export default router;
