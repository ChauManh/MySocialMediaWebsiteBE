import Conversation from "../model/conversation.js";

const createConversationService = async (userId, memberIds) => {
  if (!Array.isArray(memberIds) || memberIds.length < 1) {
    return { EC: 1, EM: "Không thể tự tạo cuộc trò chuyện" };
  }
  const allMembers = [...new Set([...memberIds, userId])];
  let existing = await Conversation.findOne({
    members: { $all: allMembers },
    $expr: { $eq: [{ $size: "$members" }, allMembers.length] },
  });
  if (existing) {
    return { EC: 0, EM: "Đã tồn tại cuộc trò chuyện", result: existing };
  }

  const newConv = await Conversation.create({ members: allMembers });
  return { EC: 0, EM: "Tạo cuộc trò chuyện thành công", result: newConv };
};

const getUserConversationsService = async (userId) => {
  const conversations = await Conversation.find({ members: userId })
    .sort({ updatedAt: -1 })
    .populate("members", "fullname profilePicture")
    .populate("lastSender", "fullname profilePicture");

  return {
    EC: 0,
    EM: "Lấy danh sách cuộc trò chuyện thành công",
    result: conversations,
  };
};

export { createConversationService, getUserConversationsService };
