import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

async function sendMail(to, subject) {
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
  });
console.log('process.env.EMAIL', process.env.EMAIL)
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL, // sender address
    to: [process.env.EMAIL], // list of receivers
    subject: subject, // Subject line
    text: 'Octane', // plain text body
    html: '<b>Octane Team?</b>', // html body
  });
  if (info.messageId) {
    return true;
  }
  return false;
}

export default sendMail;
