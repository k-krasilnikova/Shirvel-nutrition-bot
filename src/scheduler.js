import cron from "node-cron";
import difference from "lodash/difference.js";

import { CONFIG } from "../env.js";
import { REPLIES } from "./constants.js";
import { sendEngryMessage } from "./utils.js"
import { getUsersWithReport } from "./middlewares/reports.js";
import { getAllUsersId } from "./middlewares/users.js";

export const scheduleDailyReport = (bot, chatId) => {
  cron.schedule(CONFIG.SCHEDULE_TIME, () => {
    bot.telegram.sendMessage(chatId, REPLIES.DailyReport.start, {
      reply_markup: {
        inline_keyboard: REPLIES.DailyReport.startMarkup,
      },
    });
  });
};

export const scheduleCheckingReports = async (bot) => {
  cron.schedule(CONFIG.SCHEDULE_TIME_ANGRY, () => {
    const allUsers = await getAllUsersId();
    const usersWithReport = await getUsersWithReport();
    const usersWithoutReport = difference(allUsers, usersWithReport);
    for (const user of usersWithoutReport) {
      sendEngryMessage(bot, user);
    }
  });
};
