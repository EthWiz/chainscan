const fs = require("fs");
const ethers = require("ethers");

const filename = "./apps/registry/data/event-register.json";

function getEventData() {
  if (fs.existsSync(filename)) {
    return JSON.parse(fs.readFileSync(filename, "utf8"));
  } else {
    return [];
  }
}


function validateUserInfo(info) {
    if (!info) {
        return "Bad Request: event information";
      }
      if (!info["chatId"]) {
        return "Bad Request: missing chat id";
      }
      if (!info["contractAddress"]) {
        return "Bad Request: missing contract to monitor";
      }
      if (!info["eventName"]) {
        return "Bad Request: missing event to monitor";
      }
    
      return null;}


function saveEventData(data) {
  fs.writeFileSync(filename, JSON.stringify(data));
}

function generateAlertId() {
  return Math.random().toString(36).substring(2, 15) +
         Math.random().toString(36).substring(2, 15);
}

function generateSignatureHash(eventName) {
  return ethers.keccak256(ethers.toUtf8Bytes(eventName));
}

function addEvent(userInfo) {
  let data = getEventData();

  userInfo["signatureHash"] = generateSignatureHash(userInfo["eventName"]);
  userInfo["alertId"] = generateAlertId();

  data.push(userInfo);
  saveEventData(data);
}

function listEvents() {
  return getEventData();
}

function removeEvent(alertId) {
  let data = getEventData();
  const initialLength = data.length;

  data = data.filter(item => item.alertId !== alertId);

  if (initialLength !== data.length) {
    saveEventData(data);
    return true;
  }

  return false;
}

function listEventsByChatId(chatId) {
  let data = getEventData();
  return data.filter((item) => item.chatId === chatId);
}

module.exports = {
  addEvent,
  listEvents,
  removeEvent,
  listEventsByChatId,
  validateUserInfo
}
