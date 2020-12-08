import Scene from "telegraf/scenes/base";
import moment from "moment";

import { REPLIES, DAILY_MARKUP } from "../constants.js";
import { sendNotificationForReviewer } from "../utils.js";
import { createReport } from "../middlewares/reports.js";
import { getUserByChatId } from "../middlewares/users.js";

const dailyReportHandler = async (bot, stage) => {
  bot.command("/daily", async (ctx) => {
    ctx.replyWithHTML(
      `Введи, пожалуйста, дату, за которую хочешь внести данные, в формате <b> ДЕНЬ/МЕСЯЦ/ГОД </b> (13/01/2020).`
    );
    ctx.scene.enter("getDateForDaily");
  });

  const getDateForDaily = new Scene("getDateForDaily");
  stage.register(getDateForDaily);
  getDateForDaily.on("text", async (ctx) => {
    ctx.session.date = ctx.message.text;
    const date = moment(ctx.message.text, "DD/MM/YYYY");
    ctx.session.date = date.format("DD/MM/YYYY");
    const isDateInPast = date.isBefore();

    if (date && isDateInPast) {
      ctx.reply(DAILY_MARKUP.SD.reply);
      await ctx.scene.leave("getDateForDaily");
      ctx.scene.enter("getBreakfest");
    } else {
      ctx.reply(
        "Дата введена некорректно. Можно заполнить только данные за прошедший период"
      );
      await ctx.scene.leave("getDateForDaily");
      ctx.replyWithHTML(
        `Введи, пожалуйста, дату, за которую хочешь внести данные, в формате <b> ДЕНЬ/МЕСЯЦ/ГОД </b> (13/01/2020).`
      );
      ctx.scene.enter("getDateForDaily");
    }
  });

  const getBreakfest = new Scene("getBreakfest");
  stage.register(getBreakfest);
  getBreakfest.on("text", async (ctx) => {
    ctx.session.breakfest = ctx.message.text;
    ctx.reply(REPLIES.DailyReport.lunch);
    await ctx.scene.leave("getBreakfest");
    ctx.scene.enter("getLunch");
  });

  const getLunch = new Scene("getLunch");
  stage.register(getLunch);
  getLunch.on("text", async (ctx) => {
    ctx.session.lunch = ctx.message.text;
    ctx.reply(REPLIES.DailyReport.dinner);
    await ctx.scene.leave("getLunch");
    ctx.scene.enter("getDinner");
  });

  const getDinner = new Scene("getDinner");
  stage.register(getDinner);
  getDinner.on("text", async (ctx) => {
    ctx.session.dinner = ctx.message.text;
    ctx.reply(REPLIES.DailyReport.snacks);
    await ctx.scene.leave("getDinner");
    ctx.scene.enter("getShacks");
  });

  const getShacks = new Scene("getShacks");
  stage.register(getShacks);
  getShacks.on("text", async (ctx) => {
    ctx.session.snacks = ctx.message.text;
    ctx.reply(REPLIES.DailyReport.end);
    const user = await getUserByChatId(ctx.chat.id);
    const today = moment().format("DD/MM/YYYY");

    const props = {
      chatId: ctx.chat.id,
      breakfest: ctx.session.breakfest,
      lunch: ctx.session.lunch,
      dinner: ctx.session.dinner,
      snacks: ctx.session.snacks,
      date: ctx.session.date || today,
    };

    const message = `🥑 ${user.fullName} заполнил(а) ежедневный отчёт за ${props.date}.\nЗавтрак: ${props.breakfest}.\nОбед:  ${props.lunch}.\nУжин:  ${props.dinner}.\nПерекусы: ${props.snacks}.`;
    sendNotificationForReviewer({ message, ctx });
    await createReport(props);
    await ctx.scene.leave("getShacks");
  });

  bot.action(DAILY_MARKUP.SD.value, async (ctx) => {
    ctx.deleteMessage();
    ctx.reply(DAILY_MARKUP.SD.reply);
    ctx.scene.enter("getBreakfest");
  });
  bot.action(DAILY_MARKUP.LD.value, (ctx) => {
    ctx.reply(DAILY_MARKUP.LD.reply);
  });
  bot.action(DAILY_MARKUP.ND.value, (ctx) => {
    ctx.deleteMessage();
    ctx.reply(DAILY_MARKUP.ND.reply);
  });
};

export default dailyReportHandler;
