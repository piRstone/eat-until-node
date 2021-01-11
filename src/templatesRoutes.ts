import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { validate } from 'uuid';

import { User } from './models/User';

const routes = Router();

routes.get('/', (_, res) => {
    res.render('home');
});

routes.get('/activate', async (req, res) => {
    const { token } = req.query;

    let activated = false;
    let error = undefined;

    try {
        if (!token || !validate(token)) {
            throw new Error('Invalid link.');
        }

        const user = await User.findOne({ where: { signupToken: token } });

        if (!user) {
            throw new Error('Invalid link.');
        }

        user.signupToken = null;
        user.isActive = true;
        await user.save();

        activated = true;
    } catch (e) {
        error = e.message;
    }

    res.render('activation', {
        activated,
        error,
    });
});

routes.get('/reset-password', async (req, res) => {
    const { token } = req.query;

    let error = undefined;

    try {
        if (!token || !validate(token)) {
            throw new Error('Invalid link.');
        }

        const user = await User.findOne({ where: { signupToken: token } });

        if (!user) {
            throw new Error('Invalid link.');
        }
    } catch (e) {
        error = e.message;
    }

    res.render('resetPasswordForm', {
        error,
        token,
    })
});

routes.post('/confirm-password', async (req, res) => {
    const { new_password, token } = req.body;

    let success = false;
    let error = undefined;

    try {
        if (!token) {
            throw new Error('Missing token');
        }

        if (!new_password || new_password.length < 6) {
            throw new Error('Password must be 6 characters long.');
        }

        const password = await bcrypt.hash(new_password, 8);

        const result = await User.update({ password, signupToken: null }, { where: { signupToken: token } });

        if (result[0] !== 1) {
            throw new Error('Invalid link');
        }

        success = true;
    } catch (e) {
        error = e.message;
    }

    res.render('resetPasswordConfirm', {
        error,
        success,
    });
});

export default routes;
