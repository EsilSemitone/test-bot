"use strict"

const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions, chats} = require('./options.js')
const {message, callback} = require('./handlers.js')
const TOKEN = require('./token.js')

const bot = new TelegramApi(TOKEN, {polling: true});

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

bot.on('message', async msg => await message(msg, bot, game))

bot.on('callback_query', async msg => await callback(msg, bot, game))
