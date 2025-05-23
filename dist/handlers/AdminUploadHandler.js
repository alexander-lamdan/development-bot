import { Bot, Context } from 'grammy';
import { config } from '../shared/config/config.js';
import fs from 'fs';
import path from 'path';
export function AdminUploadHandler(bot) {
    bot.on('message:document', async (ctx) => {
        const fileId = ctx.message?.document?.file_id;
        if (!fileId)
            return;
        const file = await ctx.api.getFile(fileId);
        const cleanedPath = file.file_path?.replace(/^.*?(documents|photos|videos|voice|audio|thumb|animation|sticker|video_note)\//, '$1/');
        if (!cleanedPath) {
            console.log('❌ Не удалось очистить file_path:', file.file_path);
            return;
        }
        const fullPath = path.join('/opt/telegram-bot-api/storage', `bot${config.token}`, cleanedPath);
        const url = `http://localhost:8081/file/bot${config.token}/${cleanedPath}`;
        console.log('📎 [DOCUMENT] cleaned file_path:', cleanedPath);
        console.log('📥 Доступ по ссылке:', url);
        setTimeout(() => {
            try {
                fs.accessSync(fullPath, fs.constants.R_OK);
                console.log('✅ Файл реально лежит на диске и читается');
            }
            catch (err) {
                console.log('❌ Файл НЕ читается или НЕ скачан (Telegram CDN не успел)');
            }
        }, 3000);
    });
    bot.on('message:photo', async (ctx) => {
        const photo = ctx.message?.photo?.at(-1);
        if (!photo)
            return;
        const file = await ctx.api.getFile(photo.file_id);
        const cleanedPath = file.file_path?.replace(/^.*?(documents|photos|videos|voice|audio|thumb|animation|sticker|video_note)\//, '$1/');
        if (!cleanedPath) {
            console.log('❌ Не удалось очистить file_path:', file.file_path);
            return;
        }
        const fullPath = path.join('/opt/telegram-bot-api/storage', `bot${config.token}`, cleanedPath);
        const url = `http://localhost:8081/file/bot${config.token}/${cleanedPath}`;
        console.log('📎 [PHOTO] cleaned file_path:', cleanedPath);
        console.log('📥 Доступ по ссылке:', url);
        setTimeout(() => {
            try {
                fs.accessSync(fullPath, fs.constants.R_OK);
                console.log('✅ Файл реально лежит на диске и читается');
            }
            catch (err) {
                console.log('❌ Файл НЕ читается или НЕ скачан (Telegram CDN не успел)');
            }
        }, 3000);
    });
}
