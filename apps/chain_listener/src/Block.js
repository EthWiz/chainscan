const axios = require('axios');


class Block {
    constructor(logs) {
        this.logs = logs;
        this.registers = [];
    }

    async init() {
        try {
            this.registers = await this.getRegistryData();
            if (!Array.isArray(this.registers)) {
                throw new Error('Registry data is not an array');
            }
        } catch (error) {
            console.error('Error getting registry data:', error);
        }
    }

    getRegistryData() {
        return axios.get('http://registry:3005/event-register/list/all')
            .then(response => {
                if (response.data === 'No register file') {
                    throw new Error('No register file');
                }
                return response.data;
            })
            .catch(err => { throw err; });
    }

    checkEvents() {
        if (!this.registers) {
            console.error('No registers available');
            return;
        }

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
