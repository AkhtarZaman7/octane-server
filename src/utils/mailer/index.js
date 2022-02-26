import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
//TODO:// check if env variables are set
async function sendMail(to, subject) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: [process.env.EMAIL],
    subject: subject,
    text: 'Octane',
    html: '<b>Octane Team?</b>',
  });
  if (info.messageId) {
    return true;
  }
  return false;
}

export default sendMail;
