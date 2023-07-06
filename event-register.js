const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const ethers = require('ethers');
const app = express();
app.use(bodyParser.json());

app.post('/event-register', (req, res) => {
    const userInfo = req.body;
    console.log(userInfo);
    const error = validateUserInfo(userInfo);
    if (error) {
        res.status(400).send(error);
        return;
    }

    const filename = './event-register.json';

    let data;
    if (fs.existsSync(filename) && fs.statSync(filename).size > 0) {
        data = JSON.parse(fs.readFileSync(filename, 'utf8'));
    } else {
        data = [];
    }

    // Generate the keccak256 hash of the eventName
    const eventNameHash = ethers.keccak256(ethers.toUtf8Bytes(userInfo['eventName']));
    userInfo['signatureHash'] = eventNameHash;

    data.push(userInfo);
    fs.writeFileSync(filename, JSON.stringify(data));

    res.status(200).send("User information saved successfully");
});

app.listen(3005, () => {
    console.log("Server running on port 3005");
});

function validateUserInfo(info) {
    if (!info) {
        return "Bad Request: event information";
    }
    if (!info['chatId']) {
        return "Bad Request: missing chat id";
    }
    if (!info['contractAddress']) {
        return "Bad Request: missing contract to monitor";
    }
    if (!info['eventName']) {
        return "Bad Request: missing event to monitor";
    }

    return null;
}