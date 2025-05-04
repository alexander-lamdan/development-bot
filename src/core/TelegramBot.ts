import {webhookCallback} from 'grammy';
import {Bot} from 'grammy';
import {BotContext} from './BotContext.js';
import {config} from '../shared/config/config.js';
import {BotKernel} from './BotKernel.js';

export class TelegramBot{

	private readonly context:BotContext;
	private readonly bot:Bot;

	constructor(){

		this.context = new BotContext();
		this.bot = this.context.bot;

		this.registerMiddlewares();

		new BotKernel(this.context).registerHandlers();

	}

	private registerMiddlewares(){



	}

	public startPolling(){

		this.bot.start();
		console.log('Bot is working on the polling');

	}

	public webhookCallback(){

		return webhookCallback(this.bot,'http');

	}

}
