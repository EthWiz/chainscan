const ethers = require('ethers');
require("dotenv").config();
const fs = require('fs');
const Block = require('./Block');
const axios = require('axios');
const infura_url = process.env.INFURA_URL;
let provider = new ethers.JsonRpcProvider(infura_url);

async function main() {
    provider.on('block', async (blockNumber) => {
        console.log(`New block: ${blockNumber}`);
        const logs = await provider.getLogs({fromBlock: blockNumber, toBlock: blockNumber});
        const block = new Block(logs);
        const matchedEvents = block.checkEvents();
        const config = {
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios
            .post('http://localhost:5001/webhook', matchedEvents, config)
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.error('Request failed:', error.message);
            });
});
}

main()
.catch(console.error);



  

