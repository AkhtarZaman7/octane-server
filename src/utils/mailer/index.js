import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();
//TODO:// check if env variables are set
async function sendMail(to, subject) {
  try {
    let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'azcodes12@gmail.com',
        pass: '030280901002aA',
      },
    });
    let info = await transporter.sendMail({
      from: 'azcodes12@gmail.com',
      to: [to],
      subject: subject,
      text: 'Octane',
      html: '<b>Octane Team?</b>',
    });
    console.log('info', info);
    if (info.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}

export default sendMail;
