import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    members: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    lastMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    isGroup: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Conversation", ConversationSchema);
