import { BotContext } from './BotContext.js';
import { StartHandler } from '../modules/StartHandler.js';
import { HelpHandler } from '../modules/HelpHandler.js';
export class BotKernel {
    context;
    constructor(context) {
        this.context = context;
    }
    registerHandlers() {
        const handlers = [
            new StartHandler(this.context),
            new HelpHandler(this.context)
        ];
        for (const handler of handlers) {
            handler.handle();
        }
    }
}
