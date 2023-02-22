const { Telegraf, Markup } = require('telegraf');
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
        await ctx.reply('This bot for using OpenAI API features in Telegram bot!\nUse /help for detailed info!', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Help', 'helpBtn'), Markup.button.callback('Ping', 'pingBtn')],
                [Markup.button.callback('Generate', 'genImage')]
            ]
        ))
        console.log(ctx.message)
    } catch (error) {
        console.error(error)   
    }
})

bot.command('ping', async (ctx) => {
    try {
        await ctx.reply('Pong!')
    } catch (error) {
        console.error(error)
    }
})

bot.command('help', async (ctx) => {
    try {
        await ctx.reply('Help is currently empty as the bot is being developing!')
    } catch (error) {
        console.error(error)
    }
} )

function createButtonReplyCommand(btnName, command) {
    bot.action(btnName, async (ctx) => {
        try {
            await ctx.answerCbQuery()
            await ctx.reply(command)
        } catch (error) {
            console.error(error)
        }
    })
}


bot.command('generate', async (ctx) => {
    try {
        // code
        await ctx.reply('Choose what to generate', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Image',  'genImageBtn'), Markup.button.callback('Text',  'genTextBtn')]
            ]
        ))
    }  catch(error) {
        console.error(error)
    }
})



bot.action('genImageBtn', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.reply('Enter what do you need to generate')
        bot.on('text', async (ctx) => {
            console.log(ctx.message.text)
            const response = await openai.createImage({
                prompt: ctx.message.text,
                n: 1,
                size: "1024x1024",
              });
              image_url = response.data.data[0].url;
              await ctx.replyWithPhoto(response.data.data[0].url, { caption: 'Generated image: ' + ctx.message.text })
        })
        
    } catch (error) {
        console.error(error)
    }
})


bot.launch();
console.log('The program has successfully completed the function bot.launch()')
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));