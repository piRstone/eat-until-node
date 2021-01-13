
import './db';

import cors from 'cors';
import express from 'express';
import exphbs from 'express-handlebars';
import jwt from 'express-jwt';
import i18next from 'i18next';
import i18nextMiddleware from 'i18next-http-middleware';
import FileSystemBackend from 'i18next-node-fs-backend';
import path from 'path';

import routes from './routes';
import templatesRoutes from './templatesRoutes';

const PORT = process.env.PORT || 8001;

const app = express();

// Set CORS and JSON middleware
app.use(cors());
app.use(express.json());

// Declare statics folder
app.use(express.static(path.join(__dirname, 'public')));

// To get web form data
app.use(express.urlencoded({
    extended: true
}));

// Setup i18n
i18next
    .use(i18nextMiddleware.LanguageDetector)
    .use(FileSystemBackend)
    .init({
        backend: {
            loadPath: path.join(__dirname, 'locales/{{lng}}.json'),
        },
        preload: ['fr', 'en']
    });

app.use(i18nextMiddleware.handle(i18next));

// Set Handlebars as template engine
app.set('views', path.join(__dirname, 'views'));
app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
        t: function(key: string, param?: string) {
            const options = param ? { param } : undefined;
            return this.t(key, options);
        },
    }
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
            '/reset-password',
            '/confirm-password',
            '/activate',
            '/api/register',
            '/api/login',
            '/api/activate',
            '/api/forgot-password',
            '/api/reset-password',
            '/api/check-token',
            '/api/refresh-token',
        ],
    }),
);

// Routes
app.use('/api', routes);
app.use(templatesRoutes);

app.listen(process.env.PORT || 8001, () => {
    console.log(`server started on port ${PORT}`);
});
