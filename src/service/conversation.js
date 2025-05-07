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
    .populate("lastMessage", "-conversationId")
    .populate("members", "fullname profilePicture");

  const filtered = conversations.map((conv) => {
    const withUser = conv.members.find(
      (m) => m._id.toString() !== userId.toString()
    );

    return {
      ...conv.toObject(),
      with: withUser || null,
    };
  });

  return {
    EC: 0,
    EM: "Lấy danh sách cuộc trò chuyện thành công",
    result: filtered,
  };
};

const getConversationWithService = async (userId, withUserId) => {
  const conversation = await Conversation.findOne({
    isGroup: false,
    members: { $all: [userId, withUserId], $size: 2 },
  });
  return {
    EC: 0,
    EM: "Lấy cuộc trò chuyện thành công",
    result: conversation,
  };
};

export {
  createConversationService,
  getUserConversationsService,
  getConversationWithService,
};
