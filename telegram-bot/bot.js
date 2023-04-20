require("dotenv").config();
const express = require("express");
const axios = require("axios");
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

const userStates = {};

bot.onText(/\/eventRegister/, (msg) => {
    const chatId = msg.chat.id;
    userStates[chatId] = {
        step: 1,
    };
    bot.sendMessage(chatId, 'What contract address do you want to monitor?');
});

bot.on('message', (msg) => {
    const chatId = msg.chat.id;

    if (userStates[chatId]) {
        switch (userStates[chatId].step) {
            case 1:
                userStates[chatId].contractAddress = msg.text;
                userStates[chatId].step = 2;
                bot.sendMessage(chatId, 'What event do you want to monitor?');
                break;

            case 2:
                userStates[chatId].eventName = msg.text;
                // Send the POST request with the user's inputs
                const data = {
                    chatId: chatId,
                    contractAddress: userStates[chatId].contractAddress,
                    eventName: userStates[chatId].eventName,
                };

                const config = {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                };

                axios
                    .post('http://localhost:3005/event-register', data, config)
                    .then((response) => {
                        bot.sendMessage(chatId, 'Event registered successfully!');
                    })
                    .catch((error) => {
                        bot.sendMessage(chatId, 'Error registering event.');
                        console.error('Request failed:', error.message);
                    });

                // Reset the user state
                delete userStates[chatId];

                break;

            default:
                bot.sendMessage(chatId, 'Invalid input. Please start again with /eventRegister.');
        }
    }
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
    console.log(`Listening to telegram`);
});