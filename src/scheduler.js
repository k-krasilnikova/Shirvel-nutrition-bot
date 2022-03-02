import cron from "node-cron";
import difference from "lodash/difference.js";

import { CONFIG } from "../env.js";
import { REPLIES, DATE_FORMAT, CONGRATS_WITH_WOMENS_DAY } from "./constants.js";
import { sendMessage, sendEngryMessage, getDateInString } from "./utils.js";
import { getUsersWithReport } from "./middlewares/reports.js";
import { getAllUsersId, updateUserByChatId } from "./middlewares/users.js";

export const scheduleDailyReport = (bot, chatId) => {
  cron.schedule(CONFIG.SCHEDULE_TIME, () => {
    const date = getDateInString().format(DATE_FORMAT);
    bot.telegram
      .sendMessage(chatId, REPLIES.DailyReport.start.concat(date), {
        reply_markup: {
          inline_keyboard: REPLIES.DailyReport.startMarkup,
        },
      })
      .catch(async (error) => {
        console.log("403 Error", chatId);
        if (error.code === 403) {
          await updateUserByChatId(chatId, { isActive: false });
        }
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

export const scheduleCongratsWithWomesDay = (bot) => {
  cron.schedule(CONFIG.CONGRATS_WOMENS_DAY, async () => {
    const users = await getAllUsersId();
    for (const user of users) {
      sendMessage(bot, user, CONGRATS_WITH_WOMENS_DAY);
    }
  });
};
