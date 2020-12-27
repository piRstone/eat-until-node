import mailjet from '../../mailjet';

const forgotPassword = (email: string, token: string) => {
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
                    <p>To set a new password clic the link below</p>
                    <a href="https://eatuntil.pirstone.com/reset-password?token=${token}">
                        https://eatuntil.pirstone.com/reset-password?token=${token}
                    </a>
                `,
                Subject: 'Password reset',
                TextPart: `
                    Eat Until

                    To set a new password clic the link below

                    https://eatuntil.pirstone.com/reset-password?token=${token}
                `,
                To: [{
                    Email: process.env.NODE_ENV === 'development' ? 'list@lavalley.fr' : email
                }],
            }]
        })
}

export default forgotPassword;
