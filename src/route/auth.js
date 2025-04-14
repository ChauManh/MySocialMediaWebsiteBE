import { Router } from "express";
const router = Router();
import AuthController from "../controller/auth.js";
import { verifyRefreshToken } from "../middleware/authMiddleware.js";

// [POST] /auth
router.post("/signup", AuthController.create);
router.post("/signin", AuthController.userSignIn);
router.post("/refresh_token", verifyRefreshToken, AuthController.refreshToken);

export default router;
