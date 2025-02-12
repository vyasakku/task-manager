const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendReminderEmail = (email, task) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Task Reminder',
        text: `Don't forget to complete your task: ${task.title}`,
    };

    return transporter.sendMail(mailOptions);
};

module.exports = sendReminderEmail;
