```
Code status: Starting but does not perform the desired functionality | In Developing
```
<img src="https://img.shields.io/github/languages/top/razenxc/OpenAIAPI-TelegramBot" alt="Top Languages"/> <img src="https://img.shields.io/github/languages/code-size/razenxc/OpenAIAPI-TelegramBot" alt="GitHub code size in bytes"/>

# OpenAIAPI-TelegramBot
Telegram bot that allows users to query OpenAI API via Node.js library Telegraf.js<br>
# How to run bot?
## Install node.js and npm(or other Nodejs Package Manager)
https://nodejs.org/en/
## Open terminal and check whether installed npm and node.js
```
npm -v               node -v
(Output: 9.5.0) and (Output: v19.3.0)
The version does not have to match the one written here, but the main thing is that the new version of npm and node.js be installed
```
## Install Dependencies
```
npm install
```
## Starting Bot
### Add .env file in root with content like below
```
BOT_TOKEN=telegramBotToken
OPENAI_API_KEY=openAiApiToken
```
### Start Bot in Dev mode
```
npm run dev
```
<b>If dev mode not starting install nodemon</b>
```
npm install nodemon -D
```
### Start Bot in Normal mode
```
npm run start
```
