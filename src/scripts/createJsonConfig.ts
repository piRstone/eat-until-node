import * as fs from 'fs';
import util from 'util';

import config from '../config/db.config';

/**
 * Sequelize cli cannot read config module properly
 * We generate a config.json file in build directory
 * so sequelize-cli can use it for migration and other db operations
 */

const env = process.env.NODE_ENV || 'development';

const conf = {
    [env]: config,
};

try {
    fs.writeFileSync('build/config/config.json', JSON.stringify(conf), 'utf8');
    console.info('Config created succesfully');
    process.exit(0);
} catch (error) {
    console.error(util.inspect(error, { depth: null }));
    process.exit(1);
}
