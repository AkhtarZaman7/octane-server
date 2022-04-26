import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../modals/user.js';

dotenv.config();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    res.json({ message: 'auth token not found', success: false });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'invalid token', success: false });
    }

    const { email } = user;
    const userData = await User.findOne({ email: email });

    if (!userData) {
      return res.json({ message: 'invalid token', success: false });
    }
    req.user = userData;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

export { authenticate, generateAccessToken };
