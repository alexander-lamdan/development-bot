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
        console.log('📎 [DOCUMENT] cleaned file_path:', cleanedPath);
        const url = `http://localhost:8081/file/bot${config.token}/${cleanedPath}`;
        console.log('📥 Доступ по ссылке:', url);
        if (isFileDownloaded(cleanedPath)) {
            console.log('✅ Файл реально лежит на диске');
        }
        else {
            console.log('❌ Файл НЕ скачан — Telegram CDN вернул ошибку или не ответил');
        }
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
        console.log('📎 [PHOTO] cleaned file_path:', cleanedPath);
        const url = `http://localhost:8081/file/bot${config.token}/${cleanedPath}`;
        console.log('📥 Доступ по ссылке:', url);
        if (isFileDownloaded(cleanedPath)) {
            console.log('✅ Файл реально лежит на диске');
        }
        else {
            console.log('❌ Файл НЕ скачан — Telegram CDN вернул ошибку или не ответил');
        }
    });
}
function isFileDownloaded(filePath) {
    const baseDir = '/opt/telegram-bot-api/storage';
    const fullPath = path.join(baseDir, `bot${config.token}`, filePath);
    return fs.existsSync(fullPath);
}
