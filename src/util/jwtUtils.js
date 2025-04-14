import jwt from "jsonwebtoken";
const { sign } = jwt;
import { config } from "dotenv";
config();

const generateAccessToken = (user) => {
  const payload = {
    email: user.email,
    _id: user._id,
    role: user.role,
  };
  const access_token = sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return access_token;
};

const generateRefreshToken = (user) => {
  const payload = {
    email: user.email,
    _id: user._id,
    role: user.role,
  };
  const refresh_token = sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE,
  });
  return refresh_token;
};

export { generateAccessToken, generateRefreshToken };


