import cron from "node-cron";

import { CONFIG } from "../env";
import { REPLIES } from "./constants";

export const scheduleDailyReport = (bot, ctx) => {
  // cron.schedule("0 21 * * *", () => {
  // cron.schedule("33 15 * * *", () => {
  cron.schedule(CONFIG.SCHEDULE_TIME, () => {
    bot.telegram.sendMessage(ctx.chat.id, REPLIES.DailyReport.start, {
      reply_markup: {
        inline_keyboard: [REPLIES.DailyReport.startMarkup],
      },
    });
  });
};
