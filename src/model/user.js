import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

const User = new Schema(
  {
    fullname: { type: String, required: true, unique: false },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    backgroundPicture: { type: String },
    about: { type: String },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

export default model('User', User);