import {localConfig} from './localConfig.js';

export const config = {

	token: localConfig.bot_token,
	path: localConfig.url_path || "/bot/development",
	adminId:Number(localConfig.admin_chat_id || 0),
	botName:localConfig.bot_name

};
