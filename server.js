import express, { json } from 'express';
import cors from 'cors';
import route from "./src/route/index.js";
import morgan from 'morgan';
import connect  from "./src/config/mongoDB.js";
import responseHandler from "./src/middleware/responseHandler.js";
import { config } from 'dotenv';
config();

// connect();
const app = express();
// const PORT = process.env.PORT || 5000;
connect();

// Middleware
app.use(morgan('dev'));
app.use(json());
app.use(cors());
app.use(responseHandler);

// Route cơ bản
app.get('/', (req, res) => {
  res.send('Hello from backend!');
});

route(app);

// Chạy server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
