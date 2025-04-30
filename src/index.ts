import { bot } from "./bot";
import dotenv from "dotenv";

dotenv.config();

const token = process.env.BOT_TOKEN!;
const port = Number(process.env.PORT) || 3001;

bot.start({
	webhook: {
		domain: process.env.WEBHOOK_URL, // например, https://lmdntech.co.il
		port,
		hookPath: `/bot/${token}`,       // именно с /bot/
	},
});

console.log(`🚀 Бот слушает /bot/${token} на порту ${port}`);
