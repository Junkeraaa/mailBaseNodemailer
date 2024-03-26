const express = require("express");
const nodemailer = require("nodemailer");
require('dotenv').config();


const app = express();

const smtp = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.USER_MAIL_SENDER,
        pass: process.env.PASSWORD_MAIL
    }
})

const configEmail = {
    from: process.env.USER_MAIL_SENDER,
    to: process.env.USER_MAIL_DESTINATION,
    subject: "Email teste",
    html: "<p> teste envio de email </p>"
}

new Promise((resolve, reject) => {
    smtp.sendMail(configEmail)
    .then(res => {
        smtp.close()
        return resolve(res)
    }).catch(error => {
        console.log(error);
        smtp.close()
        return reject(error);
    })
})
console.log(process.env.HOST);
console.log(process.env.PORT_GMAIL);
console.log(process.env.SECURE);
console.log(process.env.USER_MAIL_SENDER);
console.log(process.env.PASSWORD_MAIL);
console.log(process.env.USER_MAIL_DESTINATION);

app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`)
});