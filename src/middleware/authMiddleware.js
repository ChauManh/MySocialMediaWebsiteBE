import { config } from "dotenv";
config();
import { expressjwt } from "express-jwt";

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
