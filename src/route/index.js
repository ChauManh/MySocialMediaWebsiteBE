import authRouter from "./auth.js";
import userRouter from "./user.js";
import postRouter from "./post.js"
import searchRouter from "./search.js"
import notificationRouter from "./notification.js";
import conversationRouter from "./conversation.js"
import messageRouter from "./message.js"

function router(app) {
  app.use("/api/auth", authRouter);
  app.use("/api/user", userRouter);
  app.use("/api/post", postRouter);
  app.use("/api/search", searchRouter);
  app.use("/api/notification", notificationRouter);
  app.use("/api/conversation", conversationRouter);
  app.use("/api/message", messageRouter);
}

export default router;
