const nodemailer = require('nodemailer');
require('dotenv').config();

const mailoption = {
  from: process.env.MAIL_FROM_ADDRESS,
  to: '',
  subject: '',
  html: '',
};

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
});

module.exports = { mailoption, transporter };
