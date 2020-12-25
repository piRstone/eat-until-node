import { Sequelize } from 'sequelize-typescript';

import config from './config/db.config';
import User from './models/User';

const db = new Sequelize({
    ...config,
    // models: [`${__dirname}/models`],
});

db.addModels([
    User,
    // ...other models
]);

export default db;
