import express from "express";
import dotenv from "dotenv";
import { bot } from "./bot";
import { webhookCallback } from "grammy";

dotenv.config();

const app = express();
const port = Number(process.env.PORT) || 3000;
const token = process.env.BOT_TOKEN!;

app.use(express.json());
app.post(`/${token}`, webhookCallback(bot, "express"));

app.listen(port, () => {
	console.log(`✅ Бот слушает на http://localhost:${port}/${token}`);
});
