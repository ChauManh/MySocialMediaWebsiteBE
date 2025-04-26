import express, { json } from "express";
import cors from "cors";
import route from "./src/route/index.js";
import morgan from "morgan";
import connect from "./src/config/mongoDB.js";
import responseHandler from "./src/middleware/responseHandler.js";
import { config } from "dotenv";
import http from "http";
import { initSocket } from "./src/config/socket.js";
config();

const app = express();
const server = http.createServer(app); // Tạo server từ express để dùng cho socket

// Connect database
connect();

// Middleware
app.use(morgan("dev"));
app.use(json());
app.use(cors());
app.use(responseHandler);

// Route cơ bản
app.get("/", (req, res) => {
  res.send("Hello from backend!");
});

// Routes
route(app);

// 🚀 Khởi động socket.io
initSocket(server);

// Chạy server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
