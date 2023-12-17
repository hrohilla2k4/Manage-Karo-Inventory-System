// Importing required dependencies
const nodeMailer = require("nodemailer")

// Component for sending email

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {

    // Create email transporter

    const transporter = nodeMailer.createTransport({
        host: 'smtp.office365.com', // Outlook SMTP server
        port: 587, // Outlook SMTP port
        secure: false, // For TLS,
        auth: {
            user: 'rohillaha@outlook.com', // Your Outlook email address
            pass: 'Pass@Outlook##', // Your Outlook password or app password
        },
        tls: {
            ciphers: 'SSLv3',
            rejectUnauthorized: false,
        },
    });

    // Creating options

    const options = {
        from: sent_from,
        to: send_to,
        replyTo: reply_to,
        subject: subject,
        message: message,
        html: message
    }

    // Email status check

    transporter.sendMail(options, (err, info) => {
        if (err) {
            console.log(err.message)
        }
        else {
            console.log(info)
        }
    })

}

//Exporting the sendEmail component
module.exports = sendEmail
