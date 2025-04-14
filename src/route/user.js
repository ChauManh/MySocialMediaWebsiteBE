import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import cloudinaryUpload from "../middleware/cloudinaryUpload.js";
const router = Router();
import UserController from "../controller/user.js";

router.get("/", verifyToken, UserController.getOwnerUser); 
router.get("/friends/:userId", verifyToken, UserController.getFriendList);
router.patch("/profilePicture", verifyToken, cloudinaryUpload.single("profilePicture"), UserController.updateAvatar);
router.patch("/backgroundPicture", verifyToken, cloudinaryUpload.single("backgroundPicture"), UserController.updateBackground); 
router.patch("/delete/avatar", verifyToken, UserController.deleteAvatar);
router.patch("/delete/background", verifyToken, UserController.deleteBackground);
router.get("/:userId", verifyToken, UserController.getUser); 
router.patch("/", verifyToken, UserController.updateUser); 
router.post("/friend-request/:userId", verifyToken, UserController.sendFriendRequest);
router.delete("/friend-request/:userId", verifyToken, UserController.backSentRequest); 
router.patch("/friend-request/accept/:userId", verifyToken, UserController.acceptFriendRequest); 
router.patch("/friend-request/deny/:userId", verifyToken, UserController.denyFriendRequest); 
router.delete("/friend/:userId", verifyToken, UserController.cancelFriend); 

export default router;
