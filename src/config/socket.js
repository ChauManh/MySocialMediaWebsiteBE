import { Server } from "socket.io";

let io; // biến toàn cục để lưu server websocket
global.connectedUsers = {}; // lưu userId => socketId

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "http://localhost:5173", // frontend của bạn
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("⚡ Một client mới kết nối:", socket.id);

    // Khi client gửi userId để đăng ký
    socket.on("register", (userId) => {
      global.connectedUsers[userId] = socket.id;
      console.log("✅ Đã đăng ký user:", userId, "=> socket:", socket.id);
    });

    // Khi client ngắt kết nối
    socket.on("disconnect", () => {
      console.log("❌ Một client ngắt kết nối:", socket.id);
      // Xóa user khỏi danh sách connected
      for (const [userId, sId] of Object.entries(global.connectedUsers)) {
        if (sId === socket.id) {
          delete global.connectedUsers[userId];
          console.log("🗑️ Xóa user đã ngắt:", userId);
          break;
        }
      }
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io chưa được khởi tạo!");
  }
  return io;
};

export { initSocket, getIO };
