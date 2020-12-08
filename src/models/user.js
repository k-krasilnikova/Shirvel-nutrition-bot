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
      type: String,
    },
    height: {
      type: String,
    },
    age: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
