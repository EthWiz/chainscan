const ethers = require("ethers");
require("dotenv").config();
const fs = require("fs");
const Block = require("./Block.js");
const axios = require("axios");
const infura_url = process.env.INFURA_URL;
let provider = new ethers.JsonRpcProvider(infura_url);
const base_url_telegram = process.env.BASE_URL_TELEGRAM_SERVICE;
const base_url_registry = process.env.BASE_URL_REGISTRY_SERVICE;

async function main() {
  provider.on("block", async (blockNumber) => {
    console.log(`New block: ${blockNumber}`);
    const logs = await provider.getLogs({
      fromBlock: blockNumber,
      toBlock: blockNumber,
    });
    const block = new Block(logs, base_url_registry);
    const matchedEvents = await block.checkEvents();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(`${base_url_telegram}/webhook`, matchedEvents, config)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Request to telegram failed:", error.message);
      });
  });
}

main().catch(console.error);
