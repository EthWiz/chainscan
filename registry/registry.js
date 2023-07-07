const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const ethers = require("ethers");
const app = express();
app.use(bodyParser.json());
const filename = "./event-register.json";

app.post("/event-register/add", (req, res) => {
  const userInfo = req.body;
  console.log(userInfo);
  const error = validateUserInfo(userInfo);
  if (error) {
    res.status(400).send(error);
    return;
  }

  let data;
  if (fs.existsSync(filename) && fs.statSync(filename).size > 0) {
    data = JSON.parse(fs.readFileSync(filename, "utf8"));
  } else {
    data = [];
  }

  // Generate the keccak256 hash of the eventName
  const eventNameHash = ethers.keccak256(
    ethers.toUtf8Bytes(userInfo["eventName"])
  );
  userInfo["signatureHash"] = eventNameHash;
  let alertId =
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);

  userInfo["alertId"] = alertId;

  data.push(userInfo);
  fs.writeFileSync(filename, JSON.stringify(data));

  res.status(200).send("User information saved successfully");
});

app.get("/event-register/list/all", (req, res) => {
  if (fs.existsSync(filename) && fs.statSync(filename).size > 0) {
    data = JSON.parse(fs.readFileSync(filename, "utf8"));
  } else {
    res.status(404).send("No register file");
    return;
  }
  res.status(200).send(data);
});
app.get("/event-register/list/:chatId?", (req, res) => {
  const requestedChatId = parseInt(req.params.chatId);
  console.log(`new request! ${requestedChatId}`);
  let data = [];
  if (fs.existsSync(filename) && fs.statSync(filename).size > 0) {
    data = JSON.parse(fs.readFileSync(filename, "utf8"));

    if (requestedChatId) {
      data = data.filter((item) => item.chatId === requestedChatId);
    }
  } else {
    res.status(404).send("No register file");
    return;
  }
  res.status(200).send(data);
});

app.listen(3005, () => {
  console.log("Server running on port 3005");
});

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

  return null;
}
