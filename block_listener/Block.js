const axios = require('axios');


class Block {
    constructor(logs) {
        this.logs = logs;
        this.registers = null;
    }

    async init() {
        this.registers = await this.getRegistryData();
    }

    getRegistryData() {
        return axios.get('http://registry:3005/event-register/list/all')
            .then(response => response.data)
            .catch(err => console.error(err));
    }

    checkEvents() {
        const matchedEvents = [];
        this.logs.forEach(log => {
            this.registers.forEach(register => {
                if (log.address.toLowerCase() === register.contractAddress.toLowerCase()) {
                    // check if there is an overlap in log topics and registered topics
                    const commonTopics = log.topics.filter(topic => topic === register.signatureHash);
                    if (commonTopics.length > 0) {
                        const info = {
                            blockNumber: log.blockNumber,
                            txHash: log.transactionHash,
                            eventData: log.data,
                            topics: log.topics,
                            register: register
                        };
                        matchedEvents.push(info);
                        console.log(info);
                    }
                }
            });
        });
        return matchedEvents;
    }
}

module.exports = Block;
