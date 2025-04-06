import { Router } from "express";
const router = Router();

import AuthController from "../controller/auth.js";

// [POST] /auth
router.post("/signup", AuthController.create);
router.post("/signin", AuthController.userSignIn);

export default router;
