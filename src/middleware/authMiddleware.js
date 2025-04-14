import { config } from "dotenv";
config();
import { expressjwt } from "express-jwt";
import jwt from "jsonwebtoken";

// authMiddleware.js
export const verifyToken = expressjwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  requestProperty: "user",
});

export const verifyAdmin = (req, res, next) => {
  if (req.user?.role === "admin") next();
  else return res.error(1, "Forbidden", 403);
};

export const verifyRefreshToken = (req, res, next) => {
  const { refresh_token } = req.body;
  console.log("refresh_token", refresh_token);
  if (!refresh_token) return res.error(1, "Refresh token không tồn tại", 401);
  jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.error(2, "Refresh token không hợp lệ", 401);
    req.user = decoded;
    next();
  });
};
