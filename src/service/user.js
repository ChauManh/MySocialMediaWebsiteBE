import User from "../model/user.js";
import { emitToUser } from "../socket/socketService.js";
import { createNotificationService } from "./notification.js";

const getOwnerUserService = async (userId) => {
  const user = await User.findById(userId).select("-password");
  if (user) {
    return {
      EC: 0,
      EM: "Get user information successfully",
      result: user,
    };
  } else {
    return {
      EC: 1,
      EM: "User not found",
    };
  }
};

const getUserService = async (userIdRequest, userIdResponse) => {
  let user;
  if (userIdRequest !== userIdResponse) {
    user = await User.findById(userIdResponse).select(
      "-password -email -role -createdAt -updatedAt"
    );
  } else {
    user = await User.findById(userIdResponse).select("-password");
  }
  if (user) {
    return {
      EC: 0,
      EM: "Get user information successfully",
      result: user,
    };
  } else {
    return {
      EC: 1,
      EM: "User not found",
    };
  }
};

const updateUserService = async (userId, dataUpdate) => {
  const updatedUser = await User.findByIdAndUpdate(userId, dataUpdate, {
    new: true,
    select: "-password", // Dùng select ở đây để không lấy password
  });
  if (updatedUser) {
    return {
      EC: 0,
      EM: "Cập nhật thông tin người dùng thành công",
      result: updatedUser,
    };
  }
};

const sendFriendRequestService = async (userIdRequest, userIdTarget) => {
  if (userIdRequest == userIdTarget) {
    return {
      EC: 3,
      EM: "Không thể gửi kết bạn cho chính mình",
    };
  }
  const sender = await User.findById(userIdRequest);
  const receiver = await User.findById(userIdTarget);
  if (!receiver || !sender) {
    return {
      EC: 1,
      EM: "Không tìm thấy người dùng",
    };
  }
  const isAlreadyFriend = sender.friends.includes(userIdTarget);
  const hasSentRequest = sender.friendRequests.sent.includes(userIdTarget);
  const hasReceivedReq = sender.friendRequests.received.includes(userIdTarget);
  if (isAlreadyFriend) {
    return {
      EC: 2,
      EM: "Đã là bạn bè",
    };
  }
  if (hasSentRequest) {
    return {
      EC: 2,
      EM: "Đã gửi lời mời kết bạn trước đó",
    };
  }
  if (hasReceivedReq) {
    return {
      EC: 2,
      EM: "Người này đã gửi lời mời kết bạn cho bạn. Hãy chấp nhận.",
    };
  }
  sender.friendRequests.sent.push(userIdTarget);
  receiver.friendRequests.received.push(userIdRequest);
  await createNotificationService(
    userIdRequest,
    userIdTarget,
    "friend_request",
    `${sender.fullname} đã gửi lời mời kết bạn cho bạn.`
  );
  // Gửi thông báo qua WebSocket tới người nhận lời mời (receiver)
  emitToUser(userIdTarget, "newFriendRequest", {
    senderId: userIdRequest,
    message: `${sender.fullname} đã gửi lời mời kết bạn cho bạn.`,
  });
  await sender.save();
  await receiver.save();
  return {
    EC: 0,
    EM: "Gửi lời mời kết bạn thành công",
  };
};

const backSentRequestService = async (userIdRequest, userIdTarget) => {
  if (userIdRequest == userIdTarget) {
    return {
      EC: 3,
      EM: "Không thể hủy kết bạn cho chính mình",
    };
  }
  const sender = await User.findById(userIdRequest);
  const receiver = await User.findById(userIdTarget);
  if (!receiver || !sender) {
    return {
      EC: 1,
      EM: "Không tìm thấy người dùng",
    };
  }
  if (!sender.friendRequests.sent.includes(userIdTarget)) {
    return {
      EC: 1,
      EM: "Không tìm thấy lời mời",
    };
  }
  sender.friendRequests.sent = sender.friendRequests.sent.filter(
    (id) => id.toString() !== userIdTarget
  );
  receiver.friendRequests.received = receiver.friendRequests.received.filter(
    (id) => id.toString() !== userIdRequest
  );
  await sender.save();
  await receiver.save();
  return {
    EC: 0,
    EM: "Rút lại lời mời kết bạn thành công",
  };
};

const acceptFriendRequestService = async (userIdRequest, userIdTarget) => {
  if (userIdRequest == userIdTarget) {
    return {
      EC: 3,
      EM: "Không thể đồng ý kết bạn cho chính mình",
    };
  }
  const sender = await User.findById(userIdRequest);
  const receiver = await User.findById(userIdTarget);
  if (!receiver || !sender) {
    return {
      EC: 1,
      EM: "Không tìm thấy người dùng",
    };
  }
  if (!receiver.friendRequests.sent.includes(userIdRequest)) {
    return {
      EC: 1,
      EM: "Không tìm thấy lời mời",
    };
  }
  sender.friends.push(userIdTarget);
  receiver.friends.push(userIdRequest);
  sender.friendRequests.received = sender.friendRequests.received.filter(
    (id) => id.toString() !== userIdTarget
  );
  receiver.friendRequests.sent = receiver.friendRequests.sent.filter(
    (id) => id.toString() !== userIdRequest
  );
  await sender.save();
  await receiver.save();
  await createNotificationService(
    userIdRequest,
    userIdTarget,
    "accept_friend",
    `${sender.fullname} đã chấp nhận lời mời kết bạn của bạn.`
  );
  emitToUser(userIdTarget, "friendRequestAccepted", {
    senderId: userIdRequest,
    senderName: sender.fullname,
    message: `${sender.fullname} đã chấp nhận lời mời kết bạn của bạn.`,
  });
  return {
    EC: 0,
    EM: "Đồng ý lời mời kết bạn thành công",
  };
};

const denyFriendRequestService = async (userIdRequest, userIdTarget) => {
  if (userIdRequest == userIdTarget) {
    return {
      EC: 3,
      EM: "Không thể từ chối lời mời kết bạn cho chính mình",
    };
  }
  const sender = await User.findById(userIdRequest);
  const receiver = await User.findById(userIdTarget);
  if (!receiver || !sender) {
    return {
      EC: 1,
      EM: "Không tìm thấy người dùng",
    };
  }
  if (!receiver.friendRequests.sent.includes(userIdRequest)) {
    return {
      EC: 1,
      EM: "Không tìm thấy lời mời",
    };
  }
  sender.friendRequests.received = sender.friendRequests.received.filter(
    (id) => id.toString() !== userIdTarget
  );
  receiver.friendRequests.sent = receiver.friendRequests.sent.filter(
    (id) => id.toString() !== userIdRequest
  );
  await sender.save();
  await receiver.save();
  return {
    EC: 0,
    EM: "Từ chối lời mời kết bạn thành công",
  };
};

const cancelFriendService = async (userIdRequest, userIdTarget) => {
  if (userIdRequest == userIdTarget) {
    return {
      EC: 3,
      EM: "Không thể hủy kết bạn với chính mình",
    };
  }
  const sender = await User.findById(userIdRequest);
  const receiver = await User.findById(userIdTarget);
  if (!receiver || !sender) {
    return {
      EC: 1,
      EM: "Không tìm thấy người dùng",
    };
  }
  if (!sender.friends.includes(userIdTarget)) {
    return {
      EC: 1,
      EM: "Không thể hủy với người dùng không phải là bạn bè",
    };
  }
  sender.friends = sender.friends.filter(
    (id) => id.toString() !== userIdTarget
  );
  receiver.friends = receiver.friends.filter(
    (id) => id.toString() !== userIdRequest
  );
  await sender.save();
  await receiver.save();
  return {
    EC: 0,
    EM: "Hủy kết bạn thành công",
  };
};

const getFriendListService = async (userId) => {
  const user = await User.findById(userId).populate(
    "friends",
    "userId fullname profilePicture friends"
  );
  if (user) {
    return {
      EC: 0,
      EM: "Get friend list successfully",
      result: user.friends,
    };
  } else {
    return {
      EC: 1,
      EM: "User not found",
    };
  }
};

export {
  getUserService,
  updateUserService,
  getOwnerUserService,
  sendFriendRequestService,
  backSentRequestService,
  acceptFriendRequestService,
  denyFriendRequestService,
  cancelFriendService,
  getFriendListService,
};
