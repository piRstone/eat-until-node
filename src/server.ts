
import './db';

import cors from 'cors';
import express from 'express';
import exphbs from 'express-handlebars';
import jwt from 'express-jwt';
import path from 'path';

import routes from './routes';

const PORT = process.env.PORT || 8001;

const app = express();

// Set CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Declare statics folder
app.use(express.static(path.join(__dirname, 'public')));

// Set Handlebars as template engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use(
    jwt({
        algorithms: ['HS256'],
        requestProperty: 'auth',
        secret: process.env.JWT_SECRET,
    }).unless({
        path: [
            '/',
            '/api/register',
            '/api/login',
            '/api/activate',
            '/api/forgot-password',
            '/api/reset-password',
        ],
    }),
);

app.use('/api', routes);
app.get('/', (_, res) => {
    res.render('home');
});

app.listen(process.env.PORT || 8001, () => {
    console.log(`server started on port ${PORT}`);
});
