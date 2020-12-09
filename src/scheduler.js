import cron from "node-cron";
import Extra from "telegraf/extra.js";

import { CONFIG } from "../env.js";
import { REPLIES } from "./constants.js";

export const scheduleDailyReport = (bot, chatId) => {
  // cron.schedule("0 21 * * *", () => {
  // cron.schedule("33 15 * * *", () => {
  cron.schedule(CONFIG.SCHEDULE_TIME, () => {
    bot.telegram.sendMessage(chatId, REPLIES.DailyReport.start, {
      reply_markup: {
        inline_keyboard: REPLIES.DailyReport.startMarkup,
      },
    });
  });
};

export const scheduleAngryMessage = (bot, chatId) => {
  cron.schedule(CONFIG.SCHEDULE_TIME_ANGRY, () => {
    bot.telegram.sendMessage(
      chatId,
      REPLIES.AngryMessage,
      (parse_mode = "HTML")
    );
  });
};
