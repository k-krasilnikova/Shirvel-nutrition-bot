import cron from "node-cron";

import { CONFIG } from "../env.js";
import { REPLIES } from "./constants.js";

export const scheduleDailyReport = (bot, chatId) => {
  // cron.schedule("0 21 * * *", () => {
  // cron.schedule("33 15 * * *", () => {
  console.log(chatId);
  cron.schedule(CONFIG.SCHEDULE_TIME, () => {
    bot.telegram.sendMessage(chatId, REPLIES.DailyReport.start, {
      reply_markup: {
        inline_keyboard: REPLIES.DailyReport.startMarkup,
      },
    });
  });
};
