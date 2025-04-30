"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const grammy_1 = require("grammy");
const http_1 = require("http");
const bot_js_1 = require("./bot.js");
require("dotenv/config");
const port = 3001;
const path = "/bot/development";
const server = (0, http_1.createServer)((req, res) => {
    if (req.method === "POST" && req.url === path) {
        (0, grammy_1.webhookCallback)(bot_js_1.bot, "http")(req, res);
    }
    else {
        res.writeHead(200);
        res.end("OK");
    }
});
server.listen(port, () => {
    console.log(`🚀 Webhook-сервер слушает на http://localhost:${port}${path}`);
});
