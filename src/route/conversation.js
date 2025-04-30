import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();
import ConversationController from "../controller/conversation.js";

router.post("/", verifyToken, ConversationController.createConversation);
router.get("/", verifyToken, ConversationController.getConversations);

export default router;
