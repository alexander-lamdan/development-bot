import { config } from './shared/config/config.js';
import { createServer } from 'http';
import { TelegramBot } from './core/TelegramBot.js';
const bot = new TelegramBot();
if (config.mode === 'polling') {
    bot.startPolling();
}
else {
    const server = createServer((req, res) => {
        if (req.method === 'POST' && req.url === config.path) {
            bot.webhookCallback()(req, res);
        }
        else {
            res.writeHead(200);
            res.end('OK');
        }
    });
    server.listen(config.port, () => {
        console.log(`Webhook server is work good without any trouble and listening: http://localhost:${config.port}${config.path}`);
    });
}
