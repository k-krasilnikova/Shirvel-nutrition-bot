import mongoose from "mongoose";

const Schema = mongoose.Schema;

var ReportSchema = new Schema(
  {
    chatId: {
      type: Number,
      index: true,
    },
    breakfest: {
      type: String,
    },
    lunch: {
      type: String,
    },
    dinner: {
      type: String,
    },
    snacks: {
      type: String,
    },
    date: {
      type: Date,
    },
    reaction: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Report = mongoose.model("Report", ReportSchema);

export default Report;
