import { Telegraf } from "telegraf";
import Stage from "telegraf/stage";
import session from "telegraf/session";

import mongoose from "mongoose";

import { registrationHandler, dailyReportHandler } from "./handlers";
import { restartApplication } from "./utils";
import { CONFIG } from "../env";

const { enter, leave } = Stage;
const stage = new Stage();

const bot = new Telegraf(CONFIG.TOKEN);
bot.use(session());
bot.use(stage.middleware());

registrationHandler(bot, stage);
dailyReportHandler(bot, stage);

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
      restartApplication(bot);
    }
  }
);
mongoose.set("useCreateIndex", true);
