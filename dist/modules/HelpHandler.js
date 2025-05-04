import { BotContext } from '../core/BotContext.js';
import { Context } from 'grammy';
export class HelpHandler {
    context;
    constructor(context) {
        this.context = context;
    }
    handle() {
        this.context.bot.command('help', async (ctx) => {
            const text = [
                '<b>Справка:</b>',
                '',
                '/start - Запустить бота',
                '/help - показать это сообщение'
            ].join("\n");
            await ctx.reply(text, { parse_mode: 'HTML' });
        });
    }
}
