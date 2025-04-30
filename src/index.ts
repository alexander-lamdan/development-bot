import { webhookCallback } from "grammy";
import { createServer } from "http";
import { bot } from "./bot.js";
import "dotenv/config";

const port = 3001;
const path = "/bot/development";

const server = createServer((req, res) => {
	if (req.method === "POST" && req.url === path) {
		webhookCallback(bot, "http")(req, res);
	} else {
		res.writeHead(200);
		res.end("OK");
	}
});

server.listen(port, () => {
	console.log(`🚀 Webhook-сервер слушает на http://localhost:${port}${path}`);
});
