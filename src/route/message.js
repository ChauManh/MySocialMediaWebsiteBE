import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();
import MessageController from "../controller/message.js";

router.post("/", verifyToken, MessageController.sendMessage)
router.get("/:conversationId", verifyToken, MessageController.getMessages);

export default router;
