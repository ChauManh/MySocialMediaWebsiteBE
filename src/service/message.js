import Message from "../model/message.js";
import Conversation from "../model/conversation.js";
import { emitToUser } from "../socket/socketService.js";

const sendMessageService = async (userId, conversationId, message) => {
  const conversation = await Conversation.findById(conversationId);
  if (!conversation) {
    return { EC: 1, EM: "Cuộc trò chuyện không tồn tại" };
  }

  const newMessage = await Message.create({
    conversationId,
    senderId: userId,
    message: message,
  });
  await newMessage.populate("senderId", "fullname profilePicture");

  // Cập nhật cuộc trò chuyện
  conversation.lastMessage = message;
  conversation.lastSender = userId;
  await conversation.save();

  // Gửi socket tới các thành viên khác trong cuộc trò chuyện
  conversation.members.forEach((memberId) => {
    if (memberId.toString() !== userId.toString()) {
      emitToUser(memberId.toString(), "newMessage", {
        conversationId,
        message: newMessage,
        sender: {
          fullname: newMessage.senderId.fullname,
          profilePicture: newMessage.senderId.profilePicture,
          _id: newMessage.senderId._id.toString(),
        },
      });
    }
  });
  return { EC: 0, EM: "Gửi tin nhắn thành công", result: newMessage };
};

const getMessagesService = async (conversationId) => {
  const messages = await Message.find({ conversationId })
    .populate("senderId", "fullname profilePicture") // để hiển thị tên và avatar người gửi
    .sort({ createdAt: 1 }); // sắp xếp theo thời gian gửi

  return {
    EC: 0,
    EM: "Lấy danh sách tin nhắn thành công",
    result: messages,
  };
};

export { sendMessageService, getMessagesService };
