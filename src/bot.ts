import { Bot } from "grammy";
import dotenv from "dotenv";

dotenv.config();

export const bot = new Bot(process.env.BOT_TOKEN!);

bot.command("start", (ctx) => ctx.reply("Express вебхук работает!"));
bot.on("message", (ctx) => ctx.reply("Ты написал: " + ctx.message?.text));
