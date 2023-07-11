require("dotenv").config();
const express = require("express");
const axios = require("axios");
const TelegramBot = require("node-telegram-bot-api");
const bodyParser = require("body-parser");
const ethers = require("ethers");
const app = express();
const port = 5001;

app.use(bodyParser.json());

const TELEGRAM_BOT_TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TELEGRAM_BOT_TOKEN, { polling: true });
const etherscanApiKey = process.env.ETHERSCAN_API_KEY;
let chatId = null;
const base_url = process.env.API_BASE_URL


const userStates = {};

bot.onText(/\/eventRegister/, (msg) => {
  const chatId = msg.chat.id;
  userStates[chatId] = {
    step: 1,
  };
  bot.sendMessage(chatId, "What contract address do you want to monitor?");
});

bot.onText(/\/eventDelete/, (msg) => {
    const chatId = msg.chat.id;
    userStates[chatId].step = -1;
    userEvents = axios
    .get(`http://${base_url}:3005/event-register/list/${chatId}`)
    .then((res) => {
        userStates[chatId].userEvents = res.data;        
      let eventsString = res.data.map((event, index) => `Number ${index}\nContract: ${event.contractAddress}, Event: ${event.eventName}`).join("\n");
      bot.sendMessage(chatId, "Your events: \n\n" + eventsString + "\n\nWhich one (by number) would you like to cancel?");
    });
  });

bot.onText(/\/eventList/, (msg) => {
  const chatId = msg.chat.id;
  userEvents = axios
    .get(`http://${base_url}:3005/event-register/list/${chatId}`)
    .then((res) => {
      let eventsString = res.data.map((event) => `Alert ID: ${event.alertId}\nContract address: ${event.contractAddress}, Event name: ${event.eventName}`).join("\n");
      bot.sendMessage(chatId, "Your events: \n\n" + eventsString);
    });
});

bot.onText(/\/new/,()=>{
    console.log(`user state before: ${userStates[chatId]}`);
    delete userStates[chatId]
    console.log(`user state after: ${userStates[chatId]}`);
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  if (userStates[chatId]) {
    switch (userStates[chatId].step) {
      case 1:
        userStates[chatId].contractAddress = msg.text;
        userStates[chatId].step = 2;
        bot.sendMessage(chatId, "Fetching contract events from Etherscan...");

        // Fetch the contract ABI from Etherscan
        axios
          .get(
            `https://api.etherscan.io/api?module=contract&action=getabi&address=${msg.text}&apikey=${etherscanApiKey}`
          )
          .then((response) => {
            if (response.data.status !== "1") {
              bot.sendMessage(
                chatId,
                "Error fetching contract ABI from Etherscan."
              );
              return;
            }

            const abi = JSON.parse(response.data.result);
            const contractInterface = new ethers.Interface(abi);
            const fragments = contractInterface.fragments;

            const eventSignatures = fragments
              .filter((fragment) => fragment.type === "event")
              .map((fragment) => {
                const inputTypes = fragment.inputs.map((input) => input.type);
                const eventSignature = `${fragment.name}(${inputTypes.join(
                  ","
                )})`;
                return eventSignature;
              });

            console.log(eventSignatures);

            userStates[chatId].eventNames = eventSignatures;

            // Ask the user which event they want to monitor
            bot.sendMessage(
              chatId,
              "Here are the events you can monitor:\n\n" +
                eventSignatures.join("\n") +
                "\n\nWhich event do you want to monitor?"
            );
          })
          .catch((error) => {
            console.error(
              "Error fetching contract ABI from Etherscan:",
              error.message
            );
            bot.sendMessage(
              chatId,
              "Error fetching contract ABI from Etherscan."
            );
          });

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
            "Content-Type": "application/json",
          },
        };

        axios
          .post(`http://${base_url}:3005/event-register/add`, data, config)
          .then((response) => {
            bot.sendMessage(chatId, "Event registered successfully!");
          })
          .catch((error) => {
            bot.sendMessage(chatId, "Error registering event.");
            console.error("Request failed:", error.message);
          });

        // Reset the user state
        delete userStates[chatId];


        break;
      case -1:
        const eventToDelete = userStates[chatId].userEvents[msg.text];
        console.log(eventToDelete);
        const alertId = eventToDelete.alertId;

          axios
            .get(`http://${base_url}:3005/event-register/delete/${alertId}`, data, config)
            .then((response) => {
              bot.sendMessage(chatId, "Event deleted successfully!");
            })
            .catch((error) => {
              bot.sendMessage(chatId, "Error deleting event.");
              console.error("Request failed:", error.message);
            });
        delete userStates[chatId];

      default:
        delete userStates[chatId];
        bot.sendMessage(
          chatId,
          "Invalid input. Please start again with /eventRegister."
        );
    }
  }
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
      await sleep(500); // sleep for 1 second
    }
  }
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

app.listen(port, () => {
  console.log(`Listening to telegram`);
});
