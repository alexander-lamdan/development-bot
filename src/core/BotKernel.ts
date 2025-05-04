import {BotContext} from './BotContext.js';
import type {IBotHandler} from '../types/IBotHandler.js';

import {StartHandler} from '../modules/StartHandler.js';
import {HelpHandler} from '../modules/HelpHandler.js';

export class BotKernel{

	private readonly context:BotContext;

	constructor(context:BotContext){

		this.context = context;

	}

	public registerHandlers():void{

		const handlers: IBotHandler[] = [

			new StartHandler(this.context),
			new HelpHandler(this.context)

		];

		for (const handler of handlers){

			handler.handle();

		}

	}

}
