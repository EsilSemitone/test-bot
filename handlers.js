const {chats, againOptions, gameOptions} = require('./options.js')

module.exports = {
    async message(msg, bot, game) {
        const {text, chat, from} = msg;
        if (text == "/start") {
            await bot.sendMessage(chat.id, "Добро пожаловать в бот");
            return await bot.sendSticker(chat.id, "https://tlgrm.eu/_/stickers/be1/98c/be198cd5-121f-4f41-9cc0-e246df7c210d/192/1.webp")
        }

        if (text === '/game') {
            game(chat.id)
        }
        else {
            try {
                await bot.sendMessage(chat.id, commands[text])
            }
            catch {
                await bot.sendMessage(chat.id, 'Не могу распознать сообщение');
            }
            
        } 
    },
    async callback(msg, bot, game) {
        const {data, message} = msg;
        const chat_id = message.chat.id;

        if (data == '/game') {
            return game(chat_id)
        }

        await bot.sendMessage(chat_id, `Ты выбрал ${data}`)

        if (data == chats[chat_id]) {
            return await bot.sendMessage(chat_id, `Ты угадал`, againOptions)
        }
        
        await bot.sendMessage(chat_id, `Ты не отгадал`, againOptions)
        }
}