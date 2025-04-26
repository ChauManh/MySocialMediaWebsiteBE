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

// Gửi thông báo cho nhiều người cùng lúc
// const emitToUsers = (userIds, eventName, data) => {
//   const io = getIO();
//   userIds.forEach((userId) => {
//     const socketId = global.connectedUsers[userId];
//     if (socketId) {
//       io.to(socketId).emit(eventName, data);
//     } else {
//       console.log(`👻 User ${userId} offline`);
//     }
//   });
// };

export { emitToUser };
