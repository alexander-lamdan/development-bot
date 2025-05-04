import type {IBotHandler} from '../types/IBotHandler.js';
import {BotContext} from '../core/BotContext.js';
import {Context} from 'grammy';

export class HelpHandler implements IBotHandler{

	constructor(private readonly context:BotContext){}

	public handle():void{

		this.context.bot.command('help',async(ctx:Context)=>{

			const text = [

				'<b>Справка:</b>',
				'',
				'/start - Запустить бота',
				'/help - показать это сообщение'

			].join("\n");

			await ctx.reply(text,{parse_mode:'HTML'});

		});

	}

}
