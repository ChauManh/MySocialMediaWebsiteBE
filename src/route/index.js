import authRouter from './auth.js';

function router(app) {
  app.use('/auth', authRouter);
}

export default router;