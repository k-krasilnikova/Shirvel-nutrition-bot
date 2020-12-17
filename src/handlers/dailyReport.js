import Scene from "telegraf/scenes/base.js";
import moment from "moment";

import { REPLIES, DAILY_MARKUP, DATE_FORMAT } from "../constants.js";
import { sendNotificationForReviewer, isFalseAnswer } from "../utils.js";
import { createReport } from "../middlewares/reports.js";
import { getUserByChatId } from "../middlewares/users.js";

const dailyReportHandler = async (bot, stage) => {
  bot.command("/daily", async (ctx) => {
    ctx.replyWithHTML(REPLIES.ManualDailyReport.start);
    ctx.scene.enter("getDateForDaily");
  });

  const getDateForDaily = new Scene("getDateForDaily");
  stage.register(getDateForDaily);
  getDateForDaily.on("text", async (ctx) => {
    ctx.session.date = ctx.message.text;
    const date = moment(ctx.message.text, DATE_FORMAT);
    ctx.session.date = date.format(DATE_FORMAT);
    const isDateInPast = date.isBefore();

    if (date && isDateInPast) {
      ctx.reply(DAILY_MARKUP.SD.reply);
      await ctx.scene.leave("getDateForDaily");
      ctx.scene.enter("getBreakfest");
    } else {
      await ctx.reply(REPLIES.ManualDailyReport.wrongDate);
      await ctx.scene.leave("getDateForDaily");
      ctx.replyWithHTML(REPLIES.ManualDailyReport.start);
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
    ctx.session.snacks = isFalseAnswer(ctx.message.text)
      ? ""
      : ctx.message.text;
    ctx.reply(REPLIES.DailyReport.weight);
    await ctx.scene.leave("getShacks");
    ctx.scene.enter("getUpdatedWeight");
  });

  const getUpdatedWeight = new Scene("getUpdatedWeight");
  stage.register(getUpdatedWeight);
  getUpdatedWeight.on("text", async (ctx) => {
    ctx.session.weight = isFalseAnswer(ctx.message.text)
      ? ""
      : ctx.message.text;
    ctx.reply(REPLIES.DailyReport.end);
    const user = await getUserByChatId(ctx.chat.id);
    const today = moment().format(DATE_FORMAT);

    const props = {
      chatId: ctx.chat.id,
      breakfest: ctx.session.breakfest,
      lunch: ctx.session.lunch,
      dinner: ctx.session.dinner,
      snacks: ctx.session.snacks,
      weight: ctx.session.weight,
      date: ctx.session.date || today,
    };

    const message = `🥑 ${user.fullName} заполнил(а) ежедневный отчёт за ${
      props.date
    }.\nЗавтрак: ${props.breakfest}.\nОбед:  ${props.lunch}.\nУжин:  ${
      props.dinner
    }.${props.snacks ? `\nПерекусы: ${props.snacks}.` : ""}${
      props.weight ? `\nВес: ${props.weight}.` : ""
    }`;
    console.log(message);
    sendNotificationForReviewer({ message, ctx });
    const report = await createReport(props);
    await ctx.scene.leave("getUpdatedWeight");
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
