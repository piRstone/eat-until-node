import mailjet from '../../mailjet';

const createUser = (email: string, token: string) => {
    return mailjet
        .post('send', {'version': 'v3.1'})
        .request({
            Messages: [{
                From: {
                    Email: 'eatuntil@pirstone.com',
                    Name: 'Eat Until'
                },
                HTMLPart: `
                    <h1>Welcome to Eat Until!</h1>
                    <p>Your account has been successfully created!</p>
                    <p>Activate it by clicking the link below</p>
                    <a href="https://eatuntil.pirstone.com/activate?token=${token}">
                        https://eatuntil.pirstone.com/activate?token=${token}
                    </a>
                `,
                Subject: 'Account activation',
                TextPart: `
                    Welcome to Eat Until!

                    Your account has been successfully created!
                    Activate it by clicking the link below:

                    https://eatuntil.pirstone.com/activate?token=${token}
                `,
                To: [{
                    Email: process.env.NODE_ENV === 'development' ? 'list@lavalley.fr' : email
                }],
            }]
        })
}

export default createUser;
