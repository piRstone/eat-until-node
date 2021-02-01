import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';

import Product from '../../../models/Product';
import mailjet from '../../mailjet';

const notifyExpiredProducts = (email: string, products: Product[]) => {
    const baseURL = process.env.NODE_ENV === 'development'
        ? process.env.LOCAL_URL
        : process.env.APP_URL;

    const logoPath = `${baseURL}/img/logo-full.png`;

    const source = fs.readFileSync(path.join(__dirname, '../../../views/mails/expiredProducts.hbs'), 'utf8');
    const template = Handlebars.compile(source);

    return mailjet
        .post('send', {'version': 'v3.1'})
        .request({
            Messages: [{
                From: {
                    Email: process.env.SENDER_EMAIL,
                    Name: 'Eat Until'
                },
                HTMLPart: template({ count: products.length, logo: logoPath, products }),
                Subject: `${products.length} products expires soon - Eat Until`,
                TextPart: `
                    ${products.length} products expires soon :

                    ${products.map(product => `${product.name}\n`)}

                    Eat Until team.
                `,
                To: [{
                    Email: process.env.NODE_ENV === 'development' ? 'list@lavalley.fr' : email
                }],
            }]
        })
}

export default notifyExpiredProducts;
