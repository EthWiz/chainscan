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
const base_url_registry = process.env.BASE_URL_REGISTRY_SERVICE;
console.log(`Base URL: ${base_url_registry}`);

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
  data.forEach((alerts) => {
    alerts = JSON.parse(alerts.alerts);
    alerts.forEach(async (alert) => {
      console.log(alert);
      const destinations = await axios.get(
        `${base_url_registry}/destinations/${alert.userId}`
      );
      console.log(`destinations: ${JSON.stringify(destinations.data)}`);
      if (!destinations.data && destinations.data.chatId == "") {
        return;
      }
      let message = "";
      if (alert.message) {
        message = alert.message;
      } else {
        message = `Just in! On block ${alert.blockNumber} we identified an ${alert.eventName}, if you want to investigate, tx hash is ${alert.txHash}`;
      }
      try {
        await bot.sendMessage(destinations.data.chatId, message);
        await sleep(500);
      } catch (error) {
        console.error("Error sending message:", error.message);
      }
    });
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.listen(port, () => {
  console.log(`Listening to telegram`);
});
