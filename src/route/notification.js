import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
const router = Router();
import NotificationController from "../controller/notification.js";

router.get("/", verifyToken, NotificationController.getNotifications);
router.patch("/:id", verifyToken, NotificationController.readNotification)

export default router;
