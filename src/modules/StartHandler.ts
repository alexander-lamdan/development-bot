import type {IBotHandler} from '../types/IBotHandler.js';
import {BotContext} from '../core/BotContext.js';
import {Context} from 'grammy';

export class StartHandler implements IBotHandler{

	constructor(private readonly context:BotContext){}

	public handle():void{

		this.context.bot.command('start',async (ctx)=>{

			await ctx.reply('Привет, я Development Bot. Всё работает :)');

		});

	}

}
