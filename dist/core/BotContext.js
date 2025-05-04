import { Bot } from 'grammy';
import { config } from '../shared/config/config.js';
export class BotContext {
    bot;
    constructor() {
        this.bot = new Bot(config.token, {
            client: { apiRoot: config.apiRoot }
        });
    }
    get AdminId() {
        return config.adminId;
    }
}
