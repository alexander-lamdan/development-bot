import {Bot} from 'grammy';
import {config} from '../shared/config/config.js';

export class BotContext{

	public readonly bot:Bot;

	constructor(){

		this.bot = new Bot(config.token,{

			client:{apiRoot:config.apiRoot}

		});

	}

	public get AdminId():number{

		return config.adminId;

	}

}
