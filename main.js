const { Telegraf } = require('telegraf');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");

// Configuring OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// BOT
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
    try {
        await ctx.reply('This bot for using OpenAI API features in Telegram bot!\nUse /help for detailed info!')
    } catch (error) {
        console.error(error)   
    }
})


bot.launch();
console.log('The program has successfully completed the function bot.launch()')
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));