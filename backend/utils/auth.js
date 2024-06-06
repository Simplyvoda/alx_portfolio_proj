import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

config();

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.SECRET_KEY || "",
    { expiresIn: '1h' }
  );
};

export default generateToken;