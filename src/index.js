import { Telegraf } from "telegraf";
import Stage from "telegraf/stage";
// import Scene from "telegraf/scenes/base";
import session from "telegraf/session";
// import cron from "node-cron";
import mongoose from "mongoose";

// import User from "./models/user";
import { registrationHandler, dailyReportHandler } from "./handlers";

import { CONFIG } from "../env";

const { enter, leave } = Stage;
const stage = new Stage();

const bot = new Telegraf(CONFIG.TOKEN);
bot.use(session());
bot.use(stage.middleware());

registrationHandler(bot, stage);
dailyReportHandler(bot, stage);

// const getBreakfest = new Scene("getBreakfest");
// stage.register(getBreakfest);
// getBreakfest.on("text", async (ctx) => {
//   ctx.session.braekfest = ctx.message.text;
//   ctx.reply("А на обед?");
//   await ctx.scene.leave("getBreakfest");
//   ctx.scene.enter("getLunch");
// });

// const getLunch = new Scene("getLunch");
// stage.register(getLunch);
// getLunch.on("text", async (ctx) => {
//   ctx.session.lunch = ctx.message.text;
//   ctx.reply("А на ужин?");
//   await ctx.scene.leave("getLunch");
//   ctx.scene.enter("getDinner");
// });

// const getDinner = new Scene("getDinner");
// stage.register(getDinner);
// getDinner.on("text", async (ctx) => {
//   ctx.session.dinner = ctx.message.text;
//   ctx.reply("Перекусы?");
//   await ctx.scene.leave("getDinner");
//   ctx.scene.enter("getShacks");
// });

// const getShacks = new Scene("getShacks");
// stage.register(getShacks);
// getShacks.on("text", async (ctx) => {
//   ctx.session.snacks = ctx.message.text;
//   ctx.reply("Спасибо, малышка. Спишемся завтра.");
//   ctx.telegram.sendMessage(
//     ctx.chat.id,
//     `${ctx.session.fullName} заполнил(а) ежедневный отчёт за ${
//       new Date().toLocaleDateString
//     }.
// Завтрак: ${ctx.session.braekfest},
// Обед: ${ctx.session.lunch},
// Ужин: ${ctx.session.dinner},
// Перекусы: ${ctx.session.snacks}`
//   );
//   await ctx.scene.leave("getShacks");
// });

// bot.action("yes", async (ctx) => {
//   ctx.deleteMessage();
//   ctx.reply("Расскажи мне про свой завтрак");
//   ctx.scene.enter("getBreakfest");
// });
// bot.action("later", (ctx) => {
//   ctx.reply(
//     "Конечно, дай знать как будешь готова. Можешь воспользоваться кнопками выбора, которые расположены выше."
//   );
// });
// bot.action("no", (ctx) => {
//   ctx.deleteMessage();
//   ctx.reply("Ок, плюс подход");
// });

bot.launch();

mongoose.connect(
  CONFIG.DB,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (error) => {
    if (error) {
      console.error(err.message);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);
mongoose.set("useCreateIndex", true);
