```
Code status: Starting but does not perform the desired functionality | In Developing
```
<img src="https://img.shields.io/github/languages/top/razenxc/OpenAIAPI-TelegramBot" alt="Top Languages"/> <img src="https://img.shields.io/github/languages/code-size/razenxc/OpenAIAPI-TelegramBot" alt="GitHub code size in bytes"/>

<img width="100px" height="100px" src="https://user-images.githubusercontent.com/84779107/221437804-224e1e37-4015-4d12-aec5-44b685331b49.png" alt="OpenAI"/><img width="100px" height="100px" src="https://user-images.githubusercontent.com/84779107/221437843-96288c8b-f2d4-47c6-b03a-1fd27d35931b.png" alt="Telegram"/><img width="100px" height="100px" src="https://user-images.githubusercontent.com/84779107/221437882-07576059-1dd1-45de-87f6-482b4edba285.png" alt="Telegraf.js"/>


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
