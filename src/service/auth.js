import User from "../model/user.js";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
const { sign } = jwt;
import { config } from "dotenv";
config();

const signUpService = async ({ fullname, email, password }) => {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.email === email) {
      return {
        EC: 1,
        EM: "User already exists",
      };
    }
  }

  const hashedPassword = await hash(password, 10);
  const newUser = new User({
    fullname,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return {
    EC: 0,
    EM: "User created successfully",
  };
};

const signInService = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    return {
      EC: 2,
      EM: "Email/Password không hợp lệ",
    };
  }

  const isMatch = await compare(password, user.password);
  if (!isMatch) {
    return {
      EC: 1,
      EM: "Password không hợp lệ",
    };
  }

  const payload = {
    email: user.email,
    userId: user._id,
    role: user.role,
  };

  const access_token = sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
  return {
    EC: 0,
    EM: "Logged in successfully",
    result: {
      access_token,
      user: {
        fullname: user.fullname,
        profilePicture: user.profilePicture,
        userId: user._id
      }
    },
  };
};

export { signUpService, signInService };
