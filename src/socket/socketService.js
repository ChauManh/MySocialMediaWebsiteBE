import { getIO } from "../config/socket.js";

// Gửi thông báo cho 1 người
const emitToUser = (userId, eventName, data) => {
  const io = getIO();
  const socketId = global.connectedUsers[userId];
  if (socketId) {
    io.to(socketId).emit(eventName, data);
  }
  return;
};

export { emitToUser };
