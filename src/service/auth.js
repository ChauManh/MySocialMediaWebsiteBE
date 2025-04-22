import User from "../model/user.js";
import { hash, compare } from "bcrypt";
import { generateAccessToken, generateRefreshToken } from "../util/jwtUtils.js";

const signUpService = async ({ fullname, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    if (existingUser.email === email) {
      return {
        EC: 1,
        EM: "Người dùng đã tồn tại",
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
    EM: "Đăng ký thành công",
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
      EM: "Email/Password không hợp lệ",
    };
  }
  const access_token = generateAccessToken(user);
  const refresh_token = generateRefreshToken(user);
  return {
    EC: 0,
    EM: "Đăng nhập thành công",
    result: {
      access_token,
      refresh_token,
    },
  };
};

const refreshTokenService = async (userPayload) => {
  if (!userPayload) {
    return {
      EC: 1,
      EM: "Không tồn tại userPayload",
    };
  }
  const newAccessToken = generateAccessToken(userPayload);
  return {
    EC: 0,
    EM: "Làm mới token thành công",
    result: {
      access_token: newAccessToken,
    },
  };
};

export { signUpService, signInService, refreshTokenService };
