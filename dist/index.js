"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const dotenv_1 = tslib_1.__importDefault(require("dotenv"));
const bot_1 = require("./bot");
const grammy_1 = require("grammy");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 3000;
const token = process.env.BOT_TOKEN;
app.use(express_1.default.json());
app.post(`/${token}`, (0, grammy_1.webhookCallback)(bot_1.bot, "express"));
app.listen(port, () => {
    console.log(`✅ Бот слушает на http://localhost:${port}/${token}`);
});
