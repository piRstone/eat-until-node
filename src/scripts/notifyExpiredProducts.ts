import '../db';

import { addDays, format, subDays } from 'date-fns';
import { Op } from 'sequelize';

import Inventory from '../models/Inventory';
import Product from '../models/Product';
import User from '../models/User';
import notifyExpiredProducts from '../utils/mails/notifyExpiredProducts';

const notify = async () => {
    const today = format(subDays(new Date(), 1), 'yyyy-MM-dd');
    const products = await Product.findAll({
        include: [{
            model: User,
        }, {
            model: Inventory,
        }],
        where: {
            notificationDate: {
                [Op.gte]: new Date(today),
                [Op.lte]: addDays(new Date(today), 1),
            }
        }
    });

    const userProducts = products.reduce((acc, cur) => {
        const curUserProducs = acc[cur.user.email] || [];
        return {
            ...acc,
            [cur.user.email]: [
                ...curUserProducs,
                cur,
            ]
        }
    }, {});

    console.log(userProducts);

    Object.keys(userProducts).map((key) => {
        notifyExpiredProducts(key, userProducts[key]);
    });

};

notify();
