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

export default routes;
