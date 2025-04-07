import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    fullname: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    backgroundPicture: { type: String },
    about: { type: String },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    friendRequests: {
      sent: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      received: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", User);
