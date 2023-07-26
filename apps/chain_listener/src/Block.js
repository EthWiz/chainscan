const axios = require("axios");

class Block {
  constructor(logs, base_url_registry) {
    this.logs = logs;
    this.base_url_registry = base_url_registry;
  }

  chunkLogs(size) {
    const chunks = [];
    for (let i = 0; i < this.logs.length; i += size) {
      chunks.push(this.logs.slice(i, i + size));
    }
    return chunks;
  }

  removeDuplicates(logs) {
    let uniqueLogs = new Map();
    logs.forEach((log) => {
      uniqueLogs.set(log.address.toLowerCase() + log.topics[0], log);
    });
    logs = Array.from(uniqueLogs.values());
    return logs;
  }

  async checkEvents() {
    const matchedEvents = [];
    console.log(`this is logs before length: ${this.logs.length}`);
    this.logs = this.removeDuplicates(this.logs);
    console.log(`this is logs after length: ${this.logs.length}`);

    const chunks = this.chunkLogs(20);

    for (const logs of chunks) {
      const payload = logs.map((log) => ({
        ContractAddress: log.address.toLowerCase(),
        EventHash: log.topics[0],
      }));

      try {
        const response = await axios.post(
          `${this.base_url_registry}/alerts/check-alerts`,
          payload
        );

        const { data } = response;
        if (data && Array.isArray(data)) {
          data.forEach((event) => {
            console.log(JSON.stringify(event));
          });
        }
        if (data && Array.isArray(data)) {
          data.forEach((event) => {
            matchedEvents.push(event);
          });
        }
      } catch (err) {
        console.error(`Request failed with error: ${err.message}`);
        if (err.response) {
          console.error(err.response.data);
          console.error(err.response.status);
          console.error(err.response.headers);
        } else if (err.request) {
          console.error(err.request);
        }
      }
    }

    return matchedEvents;
  }
}

module.exports = Block;
