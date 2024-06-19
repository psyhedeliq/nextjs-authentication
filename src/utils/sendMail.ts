import nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';

export default async function sendMail(
    to: string,
    name: string,
    image: string,
    url: string,
    subject: string,
    template: string
) {
    const {
        MAILING_EMAIL,
        MAILING_PASSWORD,
        SMTP_HOST,
        SMTP_EMAIL,
        SMTP_PASSWORD,
        SMTP_PORT,
    } = process.env;

    let transporter = nodemailer.createTransport({
        // --- Use Gmail to send emails ---
        service: 'gmail',
        auth: {
            user: MAILING_EMAIL,
            pass: MAILING_PASSWORD,
        },

        // --- Use custom SMTP server to send emails ---
        // https://app.elasticemail.com/ -> You can currently send emails only to the email address you used to register your account. Purchase a plan to be able to send to other addresses.
        // port: Number(SMTP_PORT),
        // host: SMTP_HOST,
        // auth: {
        //     user: SMTP_EMAIL,
        //     pass: SMTP_PASSWORD,
        // },
    });

    // --- HTML Replacement ---
    const data = handlebars.compile(template);
    const replacements = {
        name: name,
        email_link: url,
        image: image,
    };
    const html = data(replacements);

    // --- Verify connection configuration ---
    await new Promise((resolve, reject) => {
        transporter.verify((error, success) => {
            if (error) {
                console.log(error);
                reject(error);
            } else {
                console.log('Server is ready to take our messages');
                resolve(success);
            }
        });
    });

    // --- Send mail ---
    const options = {
        from: MAILING_EMAIL,
        to,
        subject,
        html,
    };

    await new Promise((resolve, reject) => {
        transporter.sendMail(options, (error, info) => {
            if (error) {
                console.error(error);
                reject(error);
            } else {
                console.log('Email sent: ' + info.response);
                console.log('Info: ', info);
                resolve(info);
            }
        });
    });
}
