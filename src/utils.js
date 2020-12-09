import { CONFIG } from "../env.js";
import { getAllUsers } from "./middlewares/users.js";
import { scheduleDailyReport } from "./scheduler.js";

export const sendNotificationForReviewer = ({ message, ctx }) => {
  ctx.telegram.sendMessage(CONFIG.REVIEWER, message);
};

export const restartApplication = async (bot) => {
  const users = await getAllUsers();
  console.log(users);
  for (const user of users) {
    console.log(user);
    scheduleDailyReport(bot, user.chatId);
  }
};
