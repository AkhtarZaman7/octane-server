import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail'
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
    if (info.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
const sendInvitation = async (email, teamName, code) => {
  const msg = {
    to: email, // Change to your recipient
    from: 'akhtar.tarar12@icloud.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
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
      to: [email],
      subject: 'You have been invited to join a team',
      text: 'Octane',
      html: `
      <div style="height: 100vh; width: 70%; padding: 5%">
        <p
          style="
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            align-self: center;
            width: 100%;
          "
        >
          You have been invited to Octane
        </p>
        <div style="width:100%; display:flex;flex-direction:row;align-items:center; justify-content:center;">
        <img
          style="
            display: flex;
            align-self: center;
            width: 200px;
            height: 200px;
          "
          src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/logo.png?alt=media&token=38643c6f-6edc-4a83-b718-64761c6dd215"
        />
        </div>
        <p>Invitation Code :${code}</p>
        <p>
          ${teamName} is using Octane to connect your team and provide a
          one- stop platform for collaboration and communication. Some of the key
          features available for your use today:
        </p>
        <ul>
          <li>Check team announcements posted by your coach</li>
          <li>
            Keep up with your teams’ calendar and indicate your availability
          </li>
          <li>Submit health reports before games and practices</li>
          <li>
            Chat with your teammates and share memories in Octane’s very own Team
            Chat feature!
          </li>
        </ul>
        <p
          style="
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            align-self: center;
            width: 100%;
            background-color: #07243f;
            color: aliceblue;
            text-decoration: underline;
            cursor: pointer;
          "
        >
          Accept the invitation to join your team
        </p>
        <p>
          Octane is a mobile + web app for teams to collaborate, communicate and
          stay organized for all games and practices! Use the mobile app to chat
          with your teammates, let your coach know if you are unable to make it to
          upcoming events and manage your health reports to stay safe and
          protected while having fun. Join and spread the word today!
        </p>
        </div>
      `,
    });
    console.log('info', info);
    if (info.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    console.log('error', error);
    return false;
  }
};

export { sendInvitation };

export default sendMail;
