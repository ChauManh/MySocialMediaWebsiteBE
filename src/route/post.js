import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();
import cloudinaryUpload from "../middleware/cloudinaryUpload.js";
import PostController from "../controller/post.js";

router.post(
  "/",
  verifyToken,
  cloudinaryUpload.array("post", 5),
  PostController.createPost
);
router.patch("/:postId/like", verifyToken, PostController.likePost);
router.get("/posts-display", verifyToken, PostController.getPostsToDisplay);
router.patch("/:postId/comment", verifyToken, PostController.createComment);
router.patch("/:postId/save", verifyToken, PostController.savePost);
router.get("/saved", verifyToken, PostController.getSavedPosts);
router.get("/posts/:userId", verifyToken, PostController.getPosts);
router.get("/:postId", PostController.getDetailPost);
router.delete("/:postId", verifyToken, PostController.deletePost);

export default router;
