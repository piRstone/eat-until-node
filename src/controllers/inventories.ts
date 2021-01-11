import { Router } from 'express';
import { Sequelize } from 'sequelize';

import { Inventory } from '../models/Inventory';
import { Product } from '../models/Product';

const router = Router();

router.get('/', async (req, res, next) => {
    const { user } = req.auth;

    try {
        const inventories = await Inventory.findAll({
            attributes: {
                include: [[Sequelize.fn('COUNT', Sequelize.col('products.id')), 'productsCount']],
            },
            group: ['Inventory.id'],
            include: [{
                attributes: [],
                model: Product,
            }],
            where: { userId: user.id }
        });

        return res.status(200).json(inventories);
    } catch (e) {
        return next(e);
    }
});

router.post('/', async (req, res, next) => {
    const { user } = req.auth;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Missing inventory name' });
    }

    try {
        const inventory = await Inventory.create({
            name,
            userId: user.id,
        });

        return res.status(201).json(inventory);
    } catch (e) {
        return next(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    const { user } = req.auth;
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Missing inventory name' });
    }

    try {
        const inventory = await Inventory.findOne({ where: { id } });

        if (inventory.userId !== user.id) {
            return res.sendStatus(401);
        }

        inventory.name = name;
        inventory.save();

        return res.status(200).json(inventory);
    } catch (e) {
        return next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    const { user } = req.auth;
    const { id } = req.params;

    try {
        const rowsCount = await Inventory.destroy({
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

router.get('/:id/products', async (req, res, next) => {
    const { user } = req.auth;
    const { id } = req.params;

    try {
        const inventory = await Inventory.findOne({ where: { id } });

        if (!inventory) {
            return res.status(404).json({ error: 'Inventory not found' });
        }

        if (inventory.userId !== user.id) {
            return res.sendStatus(401);
        }

        const products = await Product.findAll({ where: { inventoryId: id } });

        return res.status(200).json(products);
    } catch (e) {
        return next(e);
    }
});

router.post('/:id/clear-products', async (req, res, next) => {
    const { user } = req.auth;
    const { id } = req.params;

    try {
        const inventory = await Inventory.findOne({ where: { id } });

        if (!inventory) {
            return res.status(404).json({ error: 'Inventory not found' });
        }

        if (inventory.userId !== user.id) {
            return res.sendStatus(401);
        }

        await Product.destroy({ where: { inventoryId: id } });

        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
});

export default router;
