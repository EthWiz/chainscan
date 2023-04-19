require("dotenv").config();
const express = require("express");
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require("body-parser");
const app = express();
const port = 5001;

app.use(bodyParser.json());

app.use((error, req, res, next) => {
    if (error instanceof SyntaxError) {
        console.error("Malformed JSON:", error);
        res.status(400).json({ error: "Invalid JSON format" });
        console.log(typeof (res.body))
    } else {
        next();
    }
});
const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
let chatId = null;

// Message handler to get chat ID
bot.onText(/\/startMonitoring/, (msg) => {
    chatId = msg.chat.id;
    console.log('Chat ID:', chatId);
    // Reply to the user with their chat ID
    bot.sendMessage(chatId, `Your chat ID is: ${chatId}`);
});

app.use(express.json());

app.post("/webhook", async (req, res) => {
    let data = req.body;
    console.log(data)
    if (chatId !== null) {
        bot.sendMessage(chatId, data['data']);
    }
    return res.status(200).json(data);
});

app.listen(port, () => {
    console.log(`Listening for Transfers`);
});