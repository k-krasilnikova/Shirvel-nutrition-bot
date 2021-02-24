import Scene from "telegraf/scenes/base.js";

import { REPLIES, DAILY_MARKUP, DAILY_MARKUP_REACTIONS, DATE_FORMAT } from "../constants.js";
import { sendNotificationForReviewer, isFalseAnswer, getDateInString } from "../utils.js";
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
    const date = getDateInString(ctx.message.text);
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
    const today = getDateInString().format(DATE_FORMAT);

    const props = {
      chatId: ctx.chat.id,
      breakfest: ctx.session.breakfest,
      lunch: ctx.session.lunch,
      dinner: ctx.session.dinner,
      snacks: ctx.session.snacks,
      weight: ctx.session.weight,
      date: ctx.session.date || today,
    };

    const message = `🥑 ${
      user.fullName
    } заполнил(а) ежедневный отчёт.\nЗавтрак: ${props.breakfest}.\nОбед:  ${
      props.lunch
    }.\nУжин:  ${props.dinner}.${
      props.snacks ? `\nПерекусы: ${props.snacks}.` : ""
    }${props.weight ? `\nВес: ${props.weight}.` : ""}\nДата: ${
      ctx.session.date || today
    }\n Чат: ${user.chatId}`;
    console.log(message);
    const additionalProps = {
      reply_markup: {
        inline_keyboard: REPLIES.DailyReport.reactionsMarkup,
        remove_keyboard: true,
      },
    };
    sendNotificationForReviewer({ message, ctx, additionalProps });
    const report = await createReport(props);
    await ctx.scene.leave("getUpdatedWeight");
  });

  bot.action(DAILY_MARKUP.SD.value, async (ctx) => {
    const date = ctx.update.callback_query.message.text.split(" ").pop();
    ctx.session.date = date;
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
    const user = await getUserByChatId(ctx.chat.id);
    const message = `🚫 Пользователь ${user.fullName} отказался заполнять отчёт.`;
    sendNotificationForReviewer({ message, ctx });
  });


const processReaction = (ctx, reaction) => {
  const previousMessage = ctx.update.callback_query.message.text.split(" ");
  const user = Number(previousMessage.pop());
  const date = previousMessage[previousMessage.length - 2];
  const message =
    "🥑 Тренер отреагировал на твоё питание за " + date + "\n" + reaction;
  ctx.telegram.sendMessage(user, message);
  ctx.telegram.editMessageReplyMarkup(
    ctx.chat.id,
    ctx.update.callback_query.message.message_id,
    "",
    {}
  );
};

bot.action(DAILY_MARKUP_REACTIONS.VG.value, (ctx) => {
  processReaction(ctx, DAILY_MARKUP_REACTIONS.VG.reply);
});
bot.action(DAILY_MARKUP_REACTIONS.N.value, (ctx) => {
  processReaction(ctx, DAILY_MARKUP_REACTIONS.N.reply);
});
bot.action(DAILY_MARKUP_REACTIONS.NG.value, (ctx) => {
  processReaction(ctx, DAILY_MARKUP_REACTIONS.NG.reply);
});
};

export default dailyReportHandler;
