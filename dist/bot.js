"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const grammy_1 = require("grammy");
require("dotenv/config");
const token = process.env.BOT_TOKEN;
const apiRoot = "http://localhost:8081";
exports.bot = new grammy_1.Bot(token, {
    client: {
        apiRoot,
    },
});
exports.bot.command("start", async (ctx) => {
    console.log("📨 /start получен от:", ctx.from?.id);
    await ctx.reply("Привет! Я бот для разработки");
});
exports.bot.on("message:text", async (ctx) => {
    console.log("📨 Текстовое сообщение:", ctx.message.text);
    await ctx.reply(`Ты сказал: ${ctx.message.text}`);
});
