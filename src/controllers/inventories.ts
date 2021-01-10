import { Router } from 'express';

import { Inventory } from '../models/Inventory';

const router = Router();

router.get('/', async (req, res, next) => {
    const { user } = req.auth;

    try {
        const inventories = await Inventory.findAll({ where: { userId: user.id } });

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

export default router;
