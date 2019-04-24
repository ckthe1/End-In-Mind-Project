require('dotenv').config();

const axios = require('axios');
let express = require('express');
let app = express();
let PORT = 5000;

app.listen(PORT, () => {
    console.log('in port', PORT);
})

// var mailgun = require("mailgun-js");
var api_key = process.env.MAIL_GUN_API_KEY;// update with "End in Mind" account
var DOMAIN = 'ck.chengkou.dev';//update with "End in Mind" account
var mailgun = require('mailgun-js')({ apiKey: api_key, domain: DOMAIN });

const data = {
    from: 'Excited User <me@samples.mailgun.org>',
    to: 'chengkou@chengkou.dev',
    subject: 'Scheduled Message',
    text: 'Testing some Mailgun awesomeness!',
    "o:deliverytime": 'fri, 19 april 2019 09:10:10 -0000'
};

mailgun.messages().send(data, (error, body) => {
    console.log(body);
});


// You can see a record of this email in your logs: https://app.mailgun.com/app/logs

// You can send up to 300 emails/day from this sandbox server.
// Next, you should add your own domain so you can send 10,000 emails/month for fre