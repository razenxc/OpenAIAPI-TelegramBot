const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");
const { text } = require('stream/consumers');

// Configuring OpenAI API
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// BOT
const bot = new Telegraf(process.env.BOT_TOKEN);

bot.command('start', async (ctx) => {
    try {
        await ctx.replyWithHTML('<b>This bot for using OpenAI API features in Telegram bot!\nUse /help for detailed info!</b>', Markup.keyboard(
            [
                [Markup.button.text('/help'), ('/ping')],
                [Markup.button.text('/generate')]
            ]
        ))
        console.log(ctx.message)
    } catch (error) {
        console.error(error)   
    }
})

bot.command('test', async (ctx) => {
    try {
        await ctx.reply('Text', Markup.keyboard(
            [
                [Markup.button.text('/help')]
            ]
        ))
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
        await ctx.reply('Help is currently empty as the bot is being developing!', Markup.keyboard(
            [
                [Markup.button.text('/generate'), Markup.button.text('/ping')]
            ]
        ))
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
        await ctx.reply('Enter what to generate', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Image',  'genImageBtn'), Markup.button.callback('Text',  'genTextBtn')]
            ]
        ))
    }  catch(error) {
        console.error(error)
    }
})

// async function generateImage(ctx) {
    // const response = await openai.createImage({
    //             prompt: ctx.telegrm.message,
    //             n: 1,
    //             // size: "1024x1024",
    //             size: "512x512",
    //             });
    //             image_url = response.data.data[0].url;
    //             await ctx.replyWithPhoto(response.data.data[0].url, { caption: 'Generated image: ' + ctx.message.text })
// }

bot.action('genImageBtn', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.reply('Enter what do you need to generate')
        await bot.on('text', async (ctx) => {
            const response = await openai.createImage({
                prompt: ctx.message.text,
                n: 1,
                // size: "1024x1024",
                size: "512x512",
                });
                image_url = response.data.data[0].url;
                await ctx.replyWithPhoto(response.data.data[0].url, { caption: 'Generated image: ' + ctx.message.text })
        })
        
    } catch (error) {
        console.error(error)
    }
})



// bot.hears(/.*/, (ctx) => {
//     // получаем текстовое сообщение от пользователя
//     const message = ctx.message.text;
  
//     // отправляем сообщение в чат
//     ctx.reply(`Вы отправили сообщение: ${message}`);
//   });

bot.launch();
console.log('The program has successfully completed the function bot.launch()')
// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));