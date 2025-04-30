import dotenv from 'dotenv';

dotenv.config();

import {Bot} from 'grammy';

const token = process.env.DEVELOPMENT_BOT_TOKEN;

if(!token){

	throw new Error('DEVELOPMENT_BOT_TOKEN is not found in .env');

}

const bot = new Bot(token);

bot.command('start',ctx=>ctx.reply('Йеееее'));
bot.start();
