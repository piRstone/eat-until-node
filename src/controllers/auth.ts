import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { User } from '../models/User';
import createUser from '../utils/mails/createUser';

const router = Router();

router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Bad request' });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const token = uuid();

    try {
        const user = await User.create({
            email,
            password: passwordHash,
            signupToken: token,
        });

        const mailStatus = await createUser(email, token);

        console.log(mailStatus);

        return res.status(201).json(user);
    } catch (e) {
        return next(e);
    }
});

export default router;
