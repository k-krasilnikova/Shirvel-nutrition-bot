import { CONFIG } from "../env";
import { getAllUsers } from "./middlewares/users";
import { scheduleDailyReport } from "./scheduler";

export const sendNotificationForReviewer = ({ message, ctx }) => {
  ctx.telegram.sendMessage(CONFIG.REVIEWER, message);
};

export const restartApplication = async (bot) => {
  const users = await getAllUsers();
  for (const user of users) {
    scheduleDailyReport(bot, user.chatId);
  }
};
