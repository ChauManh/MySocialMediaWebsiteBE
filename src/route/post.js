import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();
import cloudinaryUpload from "../middleware/cloudinaryUpload.js";
import PostController from "../controller/post.js";

// /user
router.post(
  "/",
  verifyToken,
  cloudinaryUpload.array("post", 5),
  PostController.createPost
);
router.patch("/:postId/like", verifyToken, PostController.likePost);
router.get("/posts-display", verifyToken, PostController.getPostsToDisplay);
router.patch("/comment", verifyToken, PostController.createComment);
router.get("/:userId", verifyToken, PostController.getPosts);
router.delete("/:postId", verifyToken, PostController.deletePost);

export default router;
