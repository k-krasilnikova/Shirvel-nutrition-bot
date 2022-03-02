import lowerCase from "lodash/lowerCase.js";
import moment from "moment";

import { CONFIG } from "../env.js";
import { REPLIES, FALSE_ANSWER, DATE_FORMAT } from "./constants.js";
import { getAllUsers } from "./middlewares/users.js";
import { scheduleDailyReport, scheduleCongratsWithWomesDay } from "./scheduler.js";

export const sendNotificationForReviewer = ({
  message,
  ctx,
  additionalProps,
}) => {
  ctx.telegram.sendMessage(CONFIG.REVIEWER, message, { ...additionalProps });
};

export const restartApplication = async (bot) => {
  const users = await getAllUsers();
  for (const user of users) {
    scheduleDailyReport(bot, user.chatId);
    scheduleCongratsWithWomesDay(bot, user.chatId);
  }
};

export const sendEngryMessage = (bot, user) => {
  console.log("Send angry message to:", user);
  bot.telegram.sendMessage(user, REPLIES.AngryMessage, {
    parse_mode: "MarkdownV2",
    disable_notification: true,
  });
};

export const sendMessage = (bot, user, text) => {
  console.log("Send Message to:", user);
  bot.telegram.sendMessage(user, text, {
    parse_mode: "MarkdownV2",
  });
};

export const isFalseAnswer = (answer) =>
  lowerCase(answer) === lowerCase(FALSE_ANSWER);

export const getDateInString = (date = "") =>
  moment(date || new Date(), DATE_FORMAT);
