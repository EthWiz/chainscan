require("dotenv").config();
const express = require("express");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require("body-parser");
const app = express();
const port = 5001;

app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
// const base_url_registry = process.env.BASE_URL_REGISTRY;
const base_url_registry = "http://localhost:3005";
console.log(`Base URL: ${base_url_registry}`);

bot.onText(/\/check/, (msg, match) => {
  console.log("received /check command");
});

bot.onText(/\/start (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  console.log(`received /start command from ${chatId}| pram: ${match[1]}`);
  const response = axios
    .post(`${base_url_registry}/destinations`, {
      chatId: chatId,
      userId: match[1],
    })
    .then((response) => {
      if (response.data && response.data.message) {
        bot.sendMessage(chatId, response.data);
      } else {
        console.log("Unexpected response data:", response.data);
        bot.sendMessage(
          chatId,
          "Registration succeeded, but no message was returned from the server."
        );
      }
    })
    .catch((error) => {
      console.error("Error registering the user:", error.message);
      bot.sendMessage(chatId, "Failed to register. Please try again later.");
    });
});

app.use(express.json());

app.post("/webhook", async (req, res) => {
  console.log("received new block");
  let data = req.body;
  for (let i = 0; i < data.length; i++) {
    const alert = data[i];
    console.log(alert.register.chatId);
    const chatId = alert.register.chatId;
    const message = `Just in! On block ${alert.blockNumber} we identified an ${alert.eventName}, if you want to investigate, tx hash is ${alert.txHash}`;
    if (chatId !== null) {
      await bot.sendMessage(chatId, message).catch((error) => {
        console.error("Error sending message:", error.message);
      });
      await sleep(500);
    }
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.listen(port, () => {
  console.log(`Listening to telegram`);
});
