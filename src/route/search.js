import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();
import SearchController from "../controller/search.js";

router.get("/users", verifyToken, SearchController.searchUsers);
// router.get("/posts", verifyToken, SearchController.searchPosts);

export default router;
