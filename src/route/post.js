import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();
import cloudinaryUpload from "../middleware/cloudinaryUpload.js";
import PostController from "../controller/post.js";

// /user
router.post("/", verifyToken, cloudinaryUpload.array("post", 5), PostController.createPost);
router.get("/get-posts/:userId", verifyToken, PostController.getPosts);
router.patch("/comment", verifyToken, PostController.createComment);

export default router;
