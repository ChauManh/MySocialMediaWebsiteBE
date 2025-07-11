import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    fullname: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    backgroundPicture: { type: String },
    gender: { type: String, enum: ["Nam", "Nữ"]},
    isShowFriends: { type: Boolean, default: true },
    about: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: {
      sent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      received: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    savedPosts: [
      {
        _id: false,
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
        savedAt: { type: Date, default: Date.now },
      },
    ],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);
