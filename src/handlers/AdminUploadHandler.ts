import { Bot, Context } from 'grammy';
import { config } from '../shared/config/config.js';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

export function AdminUploadHandler(bot: Bot<Context>) {
	bot.on('message:document', async (ctx) => {
		const fileId = ctx.message?.document?.file_id;
		if (!fileId) return;

		const file = await ctx.api.getFile(fileId);
		if (!file.file_path) {
			console.log('❌ Не получен file_path');
			return;
		}

		const cleanedPath = cleanFilePath(file.file_path);
		const url = `http://127.0.0.1:8081/file/bot${config.token}/${cleanedPath}`;

		const res = await fetch(url);
		console.log('📎 [DOCUMENT] cleaned file_path:', cleanedPath);
		console.log('📥 Доступ по ссылке:', url);
		console.log('🌐 CDN status:', res.status);

		if (isFileDownloaded(cleanedPath)) {
			console.log('✅ Файл реально лежит на диске');
		} else {
			console.log('❌ Файл НЕ читается или НЕ скачан (Telegram CDN не успел)');
		}
	});

	bot.on('message:photo', async (ctx) => {
		const photo = ctx.message?.photo?.at(-1);
		if (!photo) return;

		const file = await ctx.api.getFile(photo.file_id);
		if (!file.file_path) {
			console.log('❌ Не получен file_path');
			return;
		}

		const cleanedPath = cleanFilePath(file.file_path);
		const url = `http://127.0.0.1:8081/file/bot${config.token}/${cleanedPath}`;

		const res = await fetch(url);
		console.log('📎 [PHOTO] cleaned file_path:', cleanedPath);
		console.log('📥 Доступ по ссылке:', url);
		console.log('🌐 CDN status:', res.status);

		if (isFileDownloaded(cleanedPath)) {
			console.log('✅ Файл реально лежит на диске');
		} else {
			console.log('❌ Файл НЕ читается или НЕ скачан (Telegram CDN не успел)');
		}
	});
}

function cleanFilePath(filePath: string): string {
	return filePath.replace(
		/^.*?(documents|photos|videos|voice|audio|thumb|animation|sticker|video_note)\//,
													'$1/'
	);
}

function isFileDownloaded(filePath: string): boolean {
	const baseDir = '/opt/telegram-bot-api/storage';
	const fullPath = path.join(baseDir, `bot${config.token}`, filePath);
	try {
		fs.accessSync(fullPath, fs.constants.R_OK);
		return true;
	} catch {
		return false;
	}
}
