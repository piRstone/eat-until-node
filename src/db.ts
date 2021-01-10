import { Sequelize } from 'sequelize-typescript';

import config from './config/db.config';
import Inventory from './models/Inventory';
import Product from './models/Product';
import User from './models/User';

const db = new Sequelize({
    ...config,
    // models: [`${__dirname}/models`],
});

db.addModels([
    User,
    Inventory,
    Product,
    // ...other models
]);

export default db;
