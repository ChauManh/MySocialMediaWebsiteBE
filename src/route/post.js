import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();

import PostController from "../controller/post.js";

// /user
router.post("/", verifyToken, PostController.createPost);
router.get("/get-posts/:userId", verifyToken, PostController.getPosts);
router.patch("/", verifyToken, PostController.createComment);

export default router;
