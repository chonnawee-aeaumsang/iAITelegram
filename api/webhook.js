const TelegramBot = require("node-telegram-bot-api");

const TOKEN = "7516525828:AAHf5q3wENV2V9iu-6cmTpYtiM4nPXZGM20"; // Replace with your bot token
const gameName = "iAIRobotSwipe"; // Replace with your game's short name
const gameUrl = "https://iai-game-update.vercel.app/"; // Replace with your game URL

const bot = new TelegramBot(TOKEN);

module.exports = async (req, res) => {
    if (req.method === 'POST') {
        const update = req.body;

        // Process the update
        if (update.message && (update.message.text === '/start' || update.message.text === '/game')) {
            await bot.sendGame(update.message.from.id, gameName);
        }

        if (update.callback_query) {
            if (update.callback_query.game_short_name !== gameName) {
                await bot.answerCallbackQuery(update.callback_query.id, `Sorry, '${update.callback_query.game_short_name}' is not available.`);
            } else {
                await bot.answerCallbackQuery({
                    callback_query_id: update.callback_query.id,
                    url: gameUrl,
                });
            }
        }

        res.status(200).send('OK');
    } else {
        res.status(405).send('Method Not Allowed');
    }
};
