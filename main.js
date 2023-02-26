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
        await ctx.replyWithHTML('<b>This bot for using OpenAI API features in Telegram bot!\nUse /help for detailed info!</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Help', 'helpBtn'), Markup.button.callback('Ping', 'pingBtn')],
                [Markup.button.callback('Generate', 'genBtn')]
            ]
        ))
        console.log(ctx.message)
    } catch (error) {
        console.error(error)   
    }
})

bot.action('helpBtn', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.reply('Help is currently empty as the bot is being developing!', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Back', 'backToStartBtn')]
            ]
        ))
    } catch (error) {
        console.error(error)
    }
} )

bot.action('backToStartBtn', async (ctx) => { 
    try {
        await ctx.answerCbQuery()
        await ctx.reply('dev is unskill and cannot add back to start button, use /start')
    } catch (error) {
        console.error(error)
    }
    
})


bot.action('pingBtn', async (ctx) => {
    try {
        await ctx.answerCbQuery()
        await ctx.reply('Pong!')
    } catch (error) {
        console.error(error)
    }
})

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


bot.action('genBtn', async (ctx) => {
    try {
        // code
        await ctx.reply('Select what to generate', Markup.inlineKeyboard(
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
        bot.hears(/.+/i, async (ctx) => {
            const response = await openai.createImage({
                prompt: ctx.message.text,
                n: 1,
                // size: "1024x1024",
                size: "256x256",
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