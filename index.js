import express from 'express';
import dotenv from 'dotenv';
import {
  authenticate,
} from './src/authorization/index.js';
import userController from './src/controllers/user-controller.js';
import mongoose from 'mongoose';

dotenv.config();
const app = express();

app.use(express.json());
app.disable('x-powered-by');

app.post('/login', userController.login);
app.post('/register-user', userController.register);
app.post('/invite-user',authenticate, userController.invite);



const PORT = process.env.PORT || 4000;
(async () => {
  const url = 'mongodb://127.0.0.1:27017/octane';
  try {
    //   await mongoonse.connect(
    //     `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST_NAME}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
    //     { useNewUrlParser: true, useFindAndModify: false }
    //   );

    await mongoose.connect(url, {
      useNewUrlParser: true,
      //   useFindAndModify: false,
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
