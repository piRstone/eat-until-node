import { addDays } from 'date-fns';
import { Router } from 'express';

import { Product } from '../models/Product';

const router = Router();

// Get products is in inventories controller (GET /api/inventories/:id/products)

router.get('/:id', async (req, res, next) => {
    const { user } = req.auth;
    const { id } = req.params;

    try {
        const product = await Product.findOne({ where: { id } });

        if (!product) {
            return res.sendStatus(404);
        }

        if (product.userId !== user.id) {
            return res.sendStatus(401);
        }

        return res.status(200).json(product);
    } catch (e) {
        return next(e);
    }
});

router.post('/', async (req, res, next) => {
    const { user } = req.auth;
    const { inventoryId, name, expirationDate, notificationDelay, ean13 } = req.body;

    if (!inventoryId) {
        return res.status(400).json({ error: 'Missing inventory id' });
    }

    if (!name || !expirationDate || !notificationDelay) {
        return res.status(400).json({ error: 'Missing parameter' });
    }

    const notificationDate = addDays(new Date(expirationDate), notificationDelay);

    try {
        const product = await Product.create({
            ean13,
            expirationDate,
            inventoryId,
            name,
            notificationDate,
            notificationDelay,
            userId: user.id,
        });

        return res.status(201).json(product);
    } catch (e) {
        return next(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    const { user } = req.auth;
    const { id } = req.params;
    const { name, expirationDate, notificationDelay } = req.body;

    try {
        const product = await Product.findOne({ where: { id } });

        if (!product) {
            return res.sendStatus(404);
        }

        if (product.userId !== user.id) {
            return res.sendStatus(401);
        }

        if (name) {
            product.name = name;
        }

        if (expirationDate) {
            product.expirationDate = expirationDate;
        }

        let notificationDate: Date;
        if (notificationDelay) {
            product.notificationDelay = notificationDelay;
            notificationDate = addDays(new Date(product.expirationDate), notificationDelay);
        } else {
            notificationDate = addDays(new Date(product.expirationDate), product.notificationDelay);
        }

        product.notificationDate = notificationDate;
        product.save();

        return res.status(200).json(product);
    } catch (e) {
        return next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { user } = req.auth;
    const { id } = req.params;

    try {
        const rowsCount = await Product.destroy({
            where: {
                id,
                userId: user.id,
            }
        });

        if (rowsCount === 0) {
            return res.sendStatus(401);
        }

        return res.sendStatus(200)
    } catch (e) {
        return next(e);
    }
});

export default router;
