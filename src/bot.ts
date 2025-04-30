import { Bot } from "grammy";
import "dotenv/config";

const token = process.env.BOT_TOKEN!;
const apiRoot = "http://localhost:8081";

export const bot = new Bot(token, {
	client: {
		apiRoot,
	},
});

bot.command("start", async (ctx) => {
	console.log("📨 /start получен от:", ctx.from?.id);
	await ctx.reply("Привет! Я бот для разработки");
});

bot.on("message:text", async (ctx) => {
	console.log("📨 Текстовое сообщение:", ctx.message.text);
	await ctx.reply(`Ты сказал: ${ctx.message.text}`);
