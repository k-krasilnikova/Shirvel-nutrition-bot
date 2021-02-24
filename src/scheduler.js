import cron from "node-cron";
import difference from "lodash/difference.js";

import { CONFIG } from "../env.js";
import { REPLIES } from "./constants.js";
import { sendEngryMessage, getDateInString } from "./utils.js";
import { getUsersWithReport } from "./middlewares/reports.js";
import { getAllUsersId } from "./middlewares/users.js";

export const scheduleDailyReport = (bot, chatId) => {
  cron.schedule(CONFIG.SCHEDULE_TIME, () => {
    const date = getDateInString().format(DATE_FORMAT);
    bot.telegram.sendMessage(chatId, REPLIES.DailyReport.start.concat(date), {
      reply_markup: {
        inline_keyboard: REPLIES.DailyReport.startMarkup,
      },
    });
  });
};

export const scheduleCheckingReports = (bot) => {
  cron.schedule(CONFIG.SCHEDULE_TIME_ANGRY, async () => {
    const allUsers = await getAllUsersId();
    const usersWithReport = await getUsersWithReport();
    const usersWithoutReport = difference(allUsers, usersWithReport);
    for (const user of usersWithoutReport) {
      sendEngryMessage(bot, user);
    }
  });
};
