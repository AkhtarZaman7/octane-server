import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

dotenv.config();

function authenticate(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null)
    res.status(401).json({ message: 'auth token not found', success: false });

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err)
      return res.status(403).json({ message: 'invalid token', success: false });
    req.user = user;
    next();
  });
}

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
}

export { authenticate, generateAccessToken };
