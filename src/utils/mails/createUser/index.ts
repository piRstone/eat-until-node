import mailjet from '../../mailjet';

const createUser = (email: string, token: string) => {
    const baseURL = process.env.NODE_ENV === 'development'
        ? process.env.LOCAL_URL
        : process.env.APP_URL;
    const link = `${baseURL}/activate?token=${token}`

    return mailjet
        .post('send', {'version': 'v3.1'})
        .request({
            Messages: [{
                From: {
                    Email: process.env.SENDER_EMAIL,
                    Name: 'Eat Until'
                },
                HTMLPart: `
                    <h1>Bienvenue sur Eat Until !</h1>
                    <p>Votre compte vient d'être créé.</p>
                    <p>Activez-le en cliquant sur le lien ci-dessous</p>
                    <a href="${link}">
                        ${link}
                    </a>
                `,
                Subject: 'Activation du compte - Eat Until',
                TextPart: `
                    Bienvenue sur Eat Until !

                    Votre compte vient d'être créé.
                    Activez-le en cliquant sur le lien ci-dessous :

                    ${link}
                `,
                To: [{
                    Email: process.env.NODE_ENV === 'development' ? 'list@lavalley.fr' : email
                }],
            }]
        })
}

export default createUser;
