import difference from "lodash/difference.js";

import { CONFIG } from "../env.js";
import { getAllUsers } from "./middlewares/users.js";
import { scheduleDailyReport, scheduleAngryMessage } from "./scheduler.js";
import { getUsersWithReport } from "./middlewares/reports.js";

export const sendNotificationForReviewer = ({ message, ctx }) => {
  ctx.telegram.sendMessage(CONFIG.REVIEWER, message);
};

export const restartApplication = async (bot) => {
  const users = await getAllUsers();
  for (const user of users) {
    scheduleDailyReport(bot, user.chatId);
  }
};

export const sendEngryMessages = async (bot) => {
  const usersWithReport = await getUsersWithReport();
  const allUsers = await getAllUsers();
  const usersWithoutReport = difference(usersWithReport, allUsers);
  for (const user of usersWithoutReport) {
    scheduleAngryMessage(bot, user);
  }
};
