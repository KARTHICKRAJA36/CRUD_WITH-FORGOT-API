

const nodemailer = require('nodemailer');


const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'karthicksvg161@gmail.com',
      pass: 'euvrczdttyqminxt'
    }
  });

  const mailOptions = {
    from: 'karthicksvg161@gmail.com',
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
