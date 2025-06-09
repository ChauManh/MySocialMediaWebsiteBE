// models/UserHistory.js
import mongoose from "mongoose";

const searchSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["user", "keyword"],
      required: true,
    },
    keyword: String, 
    user: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      fullname: String,
      profilePicture: String,
    }, 
  },
  {
    timestamps: true,
  }
);

// const viewSchema = new mongoose.Schema({
//   targetId: mongoose.Schema.Types.ObjectId,
//   targetType: { type: String, enum: ["product", "post", "story"] },
//   timestamp: { type: Date, default: Date.now },
// });

const UserHistory = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  searchHistory: [searchSchema],
  // viewHistory: [viewSchema],
  // Có thể thêm: likedHistory, clickedAds, etc...
});

export default mongoose.model("UserHistory", UserHistory);
