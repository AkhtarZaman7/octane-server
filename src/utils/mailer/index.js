import nodemailer from "nodemailer";
import dotenv from "dotenv";
import sgMail from "@sendgrid/mail";
dotenv.config();
//TODO:// check if env variables are set
async function sendMail(to, subject) {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ionos.com",
      //  service: "Gmail",
      auth: {
        // user: "azcodes12@gmail.com",
        // pass: "030280901002aA",
        user: "no-reply@octanetech.ca",
        pass: "Barcelona9921!",
      },
    });
    let info = await transporter.sendMail({
      from: "no-reply@octanetech.ca",
      //from: "azcodes12@gmail.com",
      to: [to],
      subject: "Password Reset",
      text: "Octane",
      html: `   <div style="border:30px solid #07243e; padding: 5%;">
      <div
        style="
           text-align: center;
          "
      >
        <img
          style=" width: 200px; height: 200px"
          src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/octane.png?alt=media&token=f4dc8529-8992-4942-bffd-aa4f51108388"
        />
      </div>
      <p
        style="
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            align-self: center;
            width: 100%;
          "
      >
        Use below code to Reset your Password!
      </p>

      <p
        style="
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            align-self: center;
            width: 100%;
          "
      >
        ${subject}
      </p>
     

      <p>
        Octane is a mobile + web app for teams to collaborate, communicate and
        stay organized for all games and practices! Use the mobile app to chat
        with your teammates, let your coach know if you are unable to make it
        to upcoming events and manage your health reports to stay safe and
        protected while having fun.
        <strong>Join and spread the word today!</strong>
      </p>

      <p style="color: grey; text-align: center;">
        Octane Tech - Toronto, ON, CANADA
      </p>
      <p style="color: grey; text-align: center;">
        Octane Tech is private held by ALM Inc.| Privacy Policy | Terms &
        Conditions
      </p>

      <p style="font-weight: bold; text-align: center;">
        VISIT US ON YOUR FAVORITE SOCIAL MEDIA CHANNEL
      </p>
      <div
        style="
        text-align: center;
          "
      >
        <a href="https://www.facebook.com/Octane-Tech-104035735576947/">
          <img
            style="height: 50px; width: 50px"
            src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/fb1.png?alt=media&token=fb669f8b-cf10-48a0-bb1b-2b2046994d17"
            alt="facebook"
          />
        </a>
        <a href="https://www.instagram.com/octane.technology/">
          <img
            style="height: 50px; width: 50px"
            src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/insta.png?alt=media&token=adbf8dd7-5853-457c-950d-82a0279eb96a"
            alt="instagram"
          />
        </a>
        <a href="https://www.tiktok.com/@octanetech">
          <img
            style="height: 50px; width: 50px"
            src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/tiktok.png?alt=media&token=261fbdeb-ef0c-4ed5-a1bc-df680ef939b5"
            alt="tiktok"
          />
        </a>
        <a href="https://twitter.com/OctaneTech1">
          <img
            style="height: 50px; width: 50px"
            src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/tw1.png?alt=media&token=fb2e57ea-119e-4e9b-bca7-20ec23931e56"
            alt="twitter"
          />
        </a>
      </div>
    </div>`,
    });
    console.log(info);
    if (info.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
const sendInvitation = async (email, teamName, code) => {
  // const msg = {
  //   to: email, // Change to your recipient
  //   from: "akhtar.tarar12@icloud.com", // Change to your verified sender
  //   subject: "Sending with SendGrid is Fun",
  //   text: "and easy to do anywhere, even with Node.js",
  //   html: "<strong>and easy to do anywhere, even with Node.js</strong>",
  // };
  // sgMail
  //   .send(msg)
  //   .then(() => {
  //     console.log("Email sent");
  //   })
  //   .catch((error) => {
  //     console.error(error);
  //   });
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.ionos.com",
      auth: {
        user: "no-reply@octanetech.ca",
        pass: "Barcelona9921!",
      },
    });
    let info = await transporter.sendMail({
      from: "no-reply@octanetech.ca",
      to: [email],
      subject: "You have been invited to join a team",
      text: "Octane",
      html: `   <div style="border:30px solid #07243e; padding: 5%;">
      <div
        style="
           text-align: center;
          "
      >
        <img
          style=" width: 200px; height: 200px"
          src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/octane.png?alt=media&token=f4dc8529-8992-4942-bffd-aa4f51108388"
        />
      </div>
      <p
        style="
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            align-self: center;
            width: 100%;
          "
      >
        You've Been Invited to join ${teamName} on Octane!
      </p>

      <p
        style="
            font-size: 32px;
            font-weight: bold;
            text-align: center;
            align-self: center;
            width: 100%;
          "
      >
        Invitation Code :${code}
      </p>
      <p
        style="
            
            text-align: left;
            align-self: center;
            width: 100%;"
      >
        ${teamName} is using Octane to connect your team and provide a
        one-stop platform for collaboration and communication. Enjoy the
        following and more!
      </p>
      <ul>
        <li>Check team announcements posted by your coach</li>
        <li>Keep up with your team???s upcoming games and practices</li>
        <li>Indicate your availability through the team schedule feature</li>
        <li>
          Chat with your teammates and share memories in Octane???s very own
          Team Chat!
        </li>
      </ul>

      <p>
        Octane is a mobile + web app for teams to collaborate, communicate and
        stay organized for all games and practices! Use the mobile app to chat
        with your teammates, let your coach know if you are unable to make it
        to upcoming events and manage your health reports to stay safe and
        protected while having fun.
        <strong>Join and spread the word today!</strong>
      </p>

      <p
        style="
            
            font-weight: bold; 
            text-align: center;
            align-self: center;
            width: 100%;
          "
      >
        <strong>
          Download the app and join ${teamName} with your personal invitation
          code ${code}!
        </strong>
      </p>
      <div
        style="
        text-align: center;
          "
      >
        <img
          style="height: 120px; width: 200px; resize: vertical"
          src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/appstore.png?alt=media&token=e2a2ecf6-b383-4ccb-881f-027ca8412240"
          alt="apple store"
        />
        <img
          style="height: 100px; width: 200px;margin-bottom:10px"
          src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/playstore.png?alt=media&token=bb00de20-9e04-4909-a3a8-d58c50486363"
          alt="playstore"
        />
      </div>

      <p style="color: grey; text-align: center; margin-top: 100px; text-align: center;">
        You've been added to ${teamName} and may receive ongoing notifications
        after signing up and registering for Octane. You may adjust
        notifications on your personal mobile device directly.
      </p>
      <p style="color: grey; text-align: center;">
        Octane Tech - Toronto, ON, CANADA
      </p>
      <p style="color: grey; text-align: center;">
        Octane Tech is private held by ALM Inc.| Privacy Policy | Terms &
        Conditions
      </p>

      <p style="font-weight: bold; text-align: center;">
        VISIT US ON YOUR FAVORITE SOCIAL MEDIA CHANNEL
      </p>
      <div
        style="
        text-align: center;
          "
      >
        <a href="https://www.facebook.com/Octane-Tech-104035735576947/">
          <img
            style="height: 50px; width: 50px"
            src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/fb1.png?alt=media&token=fb669f8b-cf10-48a0-bb1b-2b2046994d17"
            alt="facebook"
          />
        </a>
        <a href="https://www.instagram.com/octane.technology/">
          <img
            style="height: 50px; width: 50px"
            src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/insta.png?alt=media&token=adbf8dd7-5853-457c-950d-82a0279eb96a"
            alt="instagram"
          />
        </a>
        <a href="https://www.tiktok.com/@octanetech">
          <img
            style="height: 50px; width: 50px"
            src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/tiktok.png?alt=media&token=261fbdeb-ef0c-4ed5-a1bc-df680ef939b5"
            alt="tiktok"
          />
        </a>
        <a href="https://twitter.com/OctaneTech1">
          <img
            style="height: 50px; width: 50px"
            src="https://firebasestorage.googleapis.com/v0/b/octane-a916b.appspot.com/o/tw1.png?alt=media&token=fb2e57ea-119e-4e9b-bca7-20ec23931e56"
            alt="twitter"
          />
        </a>
      </div>
    </div>`,
    });
    console.log("info", info);
    if (info.messageId) {
      return true;
    }
    return false;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

export { sendInvitation };

export default sendMail;
