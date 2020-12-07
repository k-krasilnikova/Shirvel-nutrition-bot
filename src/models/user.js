import mongoose from "mongoose";

const Schema = mongoose.Schema;

var UserSchema = new Schema(
  {
    chatId: {
      type: Number,
      required: "Enter a chatId",
      unique: true,
      index: true,
    },
    fullName: {
      type: String,
    },
    weight: {
      type: Number,
    },
    height: {
      type: Number,
    },
    age: {
      type: Number,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
