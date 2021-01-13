import mailjet from '../../mailjet';

const forgotPassword = (email: string, token: string) => {
    const baseURL = process.env.NODE_ENV === 'development'
        ? process.env.LOCAL_URL
        : process.env.APP_URL;
    const link = `${baseURL}/reset-password?token=${token}`
    return mailjet
        .post('send', {'version': 'v3.1'})
        .request({
            Messages: [{
                From: {
                    Email: process.env.SENDER_EMAIL,
                    Name: 'Eat Until'
                },
                HTMLPart: `
                    <h1>Eat Until</h1>
                    <p>Cliquez sur le lien ci-dessous pour changer votre mot de passe :</p>
                    <a href="${link}">
                        ${link}
                    </a>
                `,
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
