import Notification from "../model/notification.js";
import mongoose from "mongoose";

const createNotificationService = async (
  senderId,
  receiverId,
  type,
  message
) => {
  let notification = await Notification.findOne({ userId: receiverId });
  if (!notification) {
    notification = new Notification({
      userId: receiverId,
      notifications: [],
    });
  }
  notification.notifications.push({
    senderId,
    type,
    message,
  });
  await notification.save();
  return {
    EC: 0,
    EM: "Tạo thông báo thành công",
    result: null,
  };
};

const getNotificationsService = async (userId) => {
  const notification = await Notification.findOne({ userId }).populate(
    "notifications.senderId",
    "username profilePicture"
  );
  const sortedNotifications = notification.notifications.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  return {
    EC: 0,
    EM: notification ? "Lấy thông báo thành công" : "Không có thông báo",
    result: notification ? sortedNotifications : [],
  };
};

const readNotificationService = async (userId, notificationId) => {
  const notification = await Notification.findOne({ userId });
  if (notification.userId.toString() !== userId) {
    return {
      EC: 2,
      EM: "Bạn không có quyền cập nhật thông báo này",
    };
  }
  const targetNotification = notification.notifications.id(notificationId);
  if (targetNotification.isRead) {
    return {
      EC: 0,
      EM: "Thông báo đã được đánh dấu là đã đọc",
    };
  }
  targetNotification.isRead = true;
  await notification.save();
  return {
    EC: 0,
    EM: "Cập nhật thông báo thành công",
  };
};

export {
  createNotificationService,
  getNotificationsService,
  readNotificationService,
};
