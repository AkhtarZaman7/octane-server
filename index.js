import express from 'express';
import dotenv from 'dotenv';
// import 'dotenv/config';
import { authenticate } from './src/authorization/index.js';
import userController from './src/controllers/user-controller.js';
import mongoose from 'mongoose';
import { MongoClient, ServerApiVersion } from 'mongodb';
import teamController from './src/controllers/team-controller.js';
import AnnouncementController from './src/controllers/announcement.js';

dotenv.config({ path: './config.env' });
const app = express();

app.use(express.json());
app.disable('x-powered-by');

app.post('/login', userController.login);
app.post('/register-user', userController.register);
app.post('/invite-user', authenticate, userController.invite);
app.post('/team', authenticate, teamController.getTeam);
app.post('/request-reset-password', userController.requestResetPassword);
app.post('/reset-password', userController.resetPassword);
app.post('/create-announcement',authenticate, AnnouncementController.createAnnouncement);
app.post('/get-announcements',authenticate, AnnouncementController.getAnnouncements);
app.post('/edit-announcement',authenticate, AnnouncementController.editAnnouncement);
app.post('/delete-announcement',authenticate, AnnouncementController.deleteAnnouncement);




const PORT = process.env.PORT || 4000;
(async () => {
  // const url = process.env.ATLAS_URL || 'mongodb://127.0.0.1:27017/octane';
  const url = 'mongodb://127.0.0.1:27017/octane';

  try {
    const response = await mongoose.connect(url, {
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
