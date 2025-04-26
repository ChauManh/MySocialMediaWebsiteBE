import mongoose from "mongoose";

// Schema cho chi tiết thông báo
const NotificationDetailSchema = new mongoose.Schema({
  senderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  type: {
    type: String,
    enum: ["friend_request", "accept_friend", "like_post", "comment"],
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Schema cho thông báo của người dùng
const NotificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    notifications: [NotificationDetailSchema], // Mảng chứa các thông báo
  },
  { timestamps: true }
);

export default mongoose.model("Notification", NotificationSchema);
