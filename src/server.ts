
import './db';

import cors from 'cors';
import express from 'express';
import jwt from 'express-jwt';

import routes from './routes';

const PORT = process.env.PORT || 8001;

const app = express();

// set CORS and JSON middleware
app.use(cors());
app.use(express.json());

app.use(
    jwt({
        algorithms: ['HS256'],
        requestProperty: 'auth',
        secret: process.env.JWT_SECRET,
    }).unless({
        path: [
            '/api/register',
            '/api/login',
            RegExp('/files/.*'),
        ],
    }),
);

app.use('/api', routes);

app.listen(process.env.PORT || 8001, () => {
    console.log(`server started on port ${PORT}`);
});
