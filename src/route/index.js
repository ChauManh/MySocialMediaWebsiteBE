import authRouter from "./auth.js";
import userRouter from "./user.js";
import postRouter from "./post.js"
import searchRouter from "./search.js"

function router(app) {
  app.use("/auth", authRouter);
  app.use("/user", userRouter);
  app.use("/post", postRouter);
  app.use("/search", searchRouter);
}

export default router;
