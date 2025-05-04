import { BotContext } from '../core/BotContext.js';
import { Context } from 'grammy';
export class StartHandler {
    context;
    constructor(context) {
        this.context = context;
    }
    handle() {
        this.context.bot.command('start', async (ctx) => {
            await ctx.reply('Привет, я Development Bot. Всё работает :)');
        });
    }
}
