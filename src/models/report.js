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
    weight: {
      type: String,
      default: null,
    },
    date: {
      type: String,
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
