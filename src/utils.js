import { CONFIG } from "../env.js";
import { REPLIES } from "./constants.js";
import { getAllUsers } from "./middlewares/users.js";
import { scheduleDailyReport } from "./scheduler.js";

export const sendNotificationForReviewer = ({ message, ctx }) => {
  ctx.telegram.sendMessage(CONFIG.REVIEWER, message);
};

export const restartApplication = async (bot) => {
  const users = await getAllUsers();
  for (const user of users) {
    scheduleDailyReport(bot, user.chatId);
  }
};

export const sendEngryMessage = (bot, user) => {
  bot.telegram.sendMessage(user, REPLIES.AngryMessage, {
    parse_mode: "MarkdownV2",
    disable_notification: true,
  });
};
