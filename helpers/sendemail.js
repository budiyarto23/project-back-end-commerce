const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'budiyahmed@gmail.com',
        pass: 'xseslcnejndoiadu'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;
