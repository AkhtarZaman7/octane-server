import express from 'express';
import dotenv from 'dotenv';
// import 'dotenv/config';
import { authenticate } from './src/authorization/index.js';
import userController from './src/controllers/user-controller.js';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
import teamController from './src/controllers/team-controller.js';
import AnnouncementController from './src/controllers/announcement.js';
import ScheduleGamesController from './src/controllers/scheduled-games.js';
import sgMail from '@sendgrid/mail';
import cors from 'cors';
import notificationController from "./src/controllers/notifications.js";
import {firebaseConfig} from './src/firebase/config.js';
import { initializeApp } from 'firebase-admin/app';
import admin from 'firebase-admin';
import adminController from "./src/controllers/admin.js";
initializeApp({
  credential: admin.credential.cert(firebaseConfig),
});

sgMail.setApiKey(
  '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'
);

dotenv.config({ path: './config.env' });
const app = express();
app.use(
  cors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  })
);
app.use(express.json());
app.disable('x-powered-by');

app.post('/login', userController.login);
app.post('/register-user', userController.register);
app.post('/update-user', authenticate, userController.updateUser);
app.post('/invite-user', authenticate, userController.invite);
app.post('/update-firebase-token', authenticate, userController.updateFirebaseToken);
app.post('/send-chat', authenticate, userController.sendChatNotification);
app.post('/send-team-chat', authenticate, userController.sendTeamChat);



app.post('/team', authenticate, teamController.getTeam);
app.post('/team-exists', teamController.teamExists);

app.post('/team-info', authenticate, teamController.getTeamInfo);
app.post('/update-team-info', authenticate, teamController.updateTeamInfo);

app.post('/request-reset-password', userController.requestResetPassword);
app.post('/reset-password', userController.resetPassword);
app.post(
  '/create-announcement',
  authenticate,
  AnnouncementController.createAnnouncement
);
app.post(
  '/notifications',
  authenticate,
  AnnouncementController.getNotifications
);
app.post(
  '/delete-notification',
  authenticate,
  notificationController.deleteNotification
);
app.post(
  '/get-announcements',
  authenticate,
  AnnouncementController.getAnnouncements
);
app.post(
  '/edit-announcement',
  authenticate,
  AnnouncementController.editAnnouncement
);
app.post(
  '/delete-announcement',
  authenticate,
  AnnouncementController.deleteAnnouncement
);
app.post('/schedule-game', authenticate, ScheduleGamesController.scheduleGame);
app.post('/scheduled-game', authenticate, ScheduleGamesController.getGames);
app.post('/edit-game', authenticate, ScheduleGamesController.editGame);

app.post(
  '/update-game-status',
  authenticate,
  ScheduleGamesController.UpdateGameStatus
);
app.post(
  '/update-game-users',
  authenticate,
  ScheduleGamesController.updateGameUsers
);

app.post('/invite-users', authenticate, userController.inviteUsers);
app.post('/user-invitation', userController.userInvitation);
app.post('/delete-user', authenticate, userController.deleteUser);
app.post('/summary', authenticate, adminController.summary);
app.post('/team-summary', authenticate, adminController.teamLevelSummary);
app.post('/system-summary', authenticate, adminController.systemLevelSummary);


const PORT = process.env.PORT || 4000;
(async () => {
  const url =
    'mongodb+srv://octane:octane@cluster0.n7hsl.mongodb.net/?retryWrites=true&w=majority';
  // const url = 'mongodb://127.0.0.1:27017/octane';

  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });
    const db = mongoose.connection;
    db.once('open', (_) => {
      console.log('Database connected:', url);
    });

    db.on('error', (err) => {
      console.error('connection error:', err);
    });
    app.listen({ port: PORT }, () =>
      console.log(`🚀 Server ready at http://localhost:${PORT} 🚀`)
    );
  } catch (e) {
    console.log(e);
  }
})();
