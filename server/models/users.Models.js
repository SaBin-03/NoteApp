import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isLoggedin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { timestamps: true },
);

export const UserModel = mongoose.model("User", userSchema);

const noteSchema = new mongoose.Schema(
  {
    note: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

export const NoteModel = mongoose.model("Note", noteSchema);
