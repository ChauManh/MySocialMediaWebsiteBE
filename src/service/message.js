import Message from "../model/message.js";
import Conversation from "../model/conversation.js";
import { emitToUser } from "../socket/socketService.js";
import { createConversationService } from "./conversation.js";

const sendMessageService = async (
  userId,
  conversationId,
  message,
  receiveUserId
) => {
  let conversation;
  if (!conversationId && receiveUserId) {
    const res = await createConversationService(userId, [receiveUserId]);
    if (res.EC === 0) {
      conversation = res.result;
    } else return res;
  } else conversation = await Conversation.findById(conversationId);

  const newMessage = await Message.create({
    conversationId: conversation._id,
    senderId: userId,
    message: message,
    readBy: [userId],
  });
  await newMessage.populate("senderId", "fullname profilePicture");

  // Cập nhật cuộc trò chuyện
  conversation.lastMessage = newMessage._id;
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

const readMessageService = async (userId, conversationId) => {
  await Message.updateMany(
    {
      conversationId,
      readBy: { $ne: userId },
    },
    {
      $addToSet: { readBy: userId },
    }
  );
  return {
    EC: 0,
    EM: "Đã đánh dấu tin nhắn là đã đọc",
  };
};

export { sendMessageService, getMessagesService, readMessageService };
