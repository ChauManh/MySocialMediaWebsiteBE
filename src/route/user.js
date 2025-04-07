import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();

import UserController from "../controller/user.js";

// /user
router.get("/:userId", verifyToken, UserController.getUser);
router.patch("/", verifyToken, UserController.updateUser);

export default router;
