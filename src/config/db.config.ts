require('dotenv').config(); // eslint-disable-line @typescript-eslint/no-var-requires

import * as pg from 'pg';
import { Options } from 'sequelize/types';

pg.defaults.parseInt8 = true;

const prodConfig: Options = {
    database: process.env.PROD_DATABASE_NAME,
    dialect: 'postgres',
    host: process.env.PROD_DATABASE_HOST,
    password: process.env.PROD_DATABASE_PASSWORD,
    pool: {
        acquire: 30000,
        idle: 10000,
        max: 5,
        min: 0
    },
    port: 5432,
    username: process.env.PROD_DATABASE_USER
};

const localConfig: Options = {
    database: process.env.DATABASE_NAME,
    define: {
        freezeTableName: true,
        underscored: true,
    },
    dialect: 'postgres',
    host: process.env.DATABASE_HOST,
    // we don't want to log options
    logging: (query) => console.info(query),
    password: process.env.DATABASE_PASSWORD,
    pool: {
        acquire: 60000,
        evict: 1000,
        idle: 10000,
        max: 5,
        min: 0,
    },
    port: parseInt(process.env.DATABASE_PORT, 10),
    username: process.env.DATABASE_USER,
};

const config = process.env.DATABASE_URL ? prodConfig : localConfig;

export default config;
