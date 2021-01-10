import { Router } from 'express';

import { User } from '../models/User';
import { getSafeUser } from '../utils/user';

const router = Router();

router.get('/me', async (req, res, next) => {
    const { user: authUser } = req.auth;

    try {
        const user = await User.findOne({ where: { id: authUser.id } });

        return res.status(200).json(getSafeUser(user));
    } catch (e) {
        return next(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    const { user: authUser } = req.auth;
    const { id } = req.params;
    const { firstName, lastName } = req.body;

    try {
        const user = await User.findOne({ where: { id } });

        if (!user) {
            return res.sendStatus(404);
        }

        if (user.id !== authUser.id) {
            return res.sendStatus(401);
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.save();

        return res.status(200).json(getSafeUser(user));
    } catch (e) {
        return next(e);
    }
});

export default router;
