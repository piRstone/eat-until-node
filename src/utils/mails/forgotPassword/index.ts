import fs from 'fs';
import Handlebars from 'handlebars';
import path from 'path';

import mailjet from '../../mailjet';

const forgotPassword = (email: string, token: string) => {
    const baseURL = process.env.NODE_ENV === 'development'
        ? process.env.LOCAL_URL
        : process.env.APP_URL;
    const link = `${baseURL}/reset-password?token=${token}`

    const logoPath = path.join(__dirname, '../../../public/img/logo-full.png');

    const source = fs.readFileSync(path.join(__dirname, '../../../views/mails/forgotPassword.hbs'), 'utf8');
    const template = Handlebars.compile(source);

    return mailjet
        .post('send', {'version': 'v3.1'})
        .request({
            Messages: [{
                From: {
                    Email: process.env.SENDER_EMAIL,
                    Name: 'Eat Until'
                },
                HTMLPart: template({ logo: logoPath, reset_password_link: link }),
                Subject: 'Réinitialisation de mot de passe - Eat Until',
                TextPart: `
                    Eat Until

                    Cliquez sur le lien ci-dessous pour changer votre mot de passe :

                    ${link}
                `,
                To: [{
                    Email: process.env.NODE_ENV === 'development' ? 'list@lavalley.fr' : email
                }],
            }]
        })
}

export default forgotPassword;
