import { Router } from "express";
import UserHistoryController from "../controller/userHistory.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/search", verifyToken, UserHistoryController.addSearchHistory);
router.get("/search", verifyToken, UserHistoryController.getSearchHistory);
router.delete(
  "/search/:index",
  verifyToken,
  UserHistoryController.deleteOneSearchHistoryByIndex
);
export default router;
