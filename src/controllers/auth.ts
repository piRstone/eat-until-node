import bcrypt from 'bcryptjs';
import { addDays } from 'date-fns';
import { Router } from 'express';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import randToken from 'rand-token';
import { v4 as uuid } from 'uuid';

import { User } from '../models/User';
import createUser from '../utils/mails/createUser';
import forgotPassword from '../utils/mails/forgotPassword';
import { getSafeUser } from '../utils/user';

const router = Router();

router.post('/register', async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Bad request' });
    }

    const passwordHash = await bcrypt.hash(password, 8);
    const token = uuid();

    try {
        // Create user
        await User.create({
            email,
            password: passwordHash,
            signupToken: token,
        });

        // Send activation email
        await createUser(email, token);

        return res.sendStatus(201);
    } catch (e) {
        return next(e);
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Please provide email and password to login.' });
    }

    const user = await User.findOne({ where: { email } });

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(400).json({ error: 'Bad credentials' });
    }

    if (!user.isActive) {
        return res.status(400).json({ error: 'User not activated' });
    }

    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1 days' });
    const refreshToken = randToken.uid(255);
    const expiry = addDays(new Date(), 30);

    user.refreshToken = refreshToken;
    user.refreshTokenExpiry = expiry;
    await user.save();

    const safeUser = getSafeUser(user);

    return res.status(200).json({
        refreshToken,
        token,
        user: safeUser,
    });
});

router.post('/check-token', async (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(400);
    }

    try {
        jwt.verify(token, process.env.JWT_SECRET);

        return res.sendStatus(200);
    } catch (e) {
        if (e instanceof TokenExpiredError) {
            return res.status(401).json({ error: e.message });
        }
        return next(e);
    }
});

router.post('/refresh-token', async (_, res) => {
    // TODO
    return res.sendStatus(200);
});

router.get('/activate', async (req, res, next) => {
    const { token } = req.query;

    if (!token) {
        return res.status(400).json({ error: 'Missing token' });
    }

    try {
        const user = await User.findOne({ where: { signupToken: token } });

        if (!user) {
            return res.status(400).json({ error: 'Wrong token' });
        }

        user.signupToken = null;
        user.isActive = true;
        await user.save();

        return res.sendStatus(200);
    } catch(e) {
        return next(e);
    }

});

router.post('/forgot-password', async (req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ error: 'Missing email' });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            // Don't tell an error occured to prevent information disclosure
            return res.sendStatus(200);
        }

        const signupToken = uuid();

        await User.update({
            signupToken,
        }, {
            where: { email }
        });

        // Send forgot password email
        await forgotPassword(email, signupToken);

        return res.sendStatus(200);
    } catch (e) {
        return next(e);
    }
});

export default router;
