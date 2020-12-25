/* eslint-disable @typescript-eslint/no-var-requires */
const mailjet = require('node-mailjet').connect(process.env.MJ_APIKEY_PUBLIC, process.env.MJ_APIKEY_PRIVATE);

export default mailjet;
