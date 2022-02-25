import express from 'express';
import dotenv from 'dotenv';
import {
  authenticate,
  generateAccessToken,
} from './src/authorization/index.js';

dotenv.config();
const app = express();

app.use(express.json());

app.post('/login', (req, res) => {
  // Authenticate User
  const username = req.body.username;
  const user = { name: username };
  const accessToken = generateAccessToken(user);
  res.json({ accessToken: accessToken });
});

app.post('/post', authenticate, (req, res) => {
  console.log('access given');
  res.json({ message: 'access given' });
});

app.listen(4000, () => {
  console.log('server started on port 4000');
});
