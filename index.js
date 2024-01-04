"use strict"

const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options.js')

const token = 'TOKEN';

const bot = new TelegramApi(token, {polling: true});

const chats = {}

const commands = {
    "/start": "Добро пожаловать в бот!",
    "/help": `Это тестовый бот`,
    "/game": ''
}

bot.setMyCommands([
    {command: "/start", description: 'Начальное приветствие'},
    {command: "/help", description: 'Помощь '},
    {command: "/game", description: 'Игра '}
])

async function game(chat_id) {
    await bot.sendMessage(chat_id, "Сейчас я загадаю цифру от 0 до 9");
    const randomNumber = Math.floor(Math.random() * 10); 
    chats[chat_id] = randomNumber;
    return await bot.sendMessage(chat_id, `Отгадай`, gameOptions);
}


bot.on('message', async msg => {
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
})

bot.on('callback_query', async msg => {

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
})
