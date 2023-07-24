"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventServiceImpl_1 = require("./eventServiceImpl");
const destinationServiceImpl_1 = require("./destinationServiceImpl");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const eventService = new eventServiceImpl_1.EventServiceImpl();
const destinationService = new destinationServiceImpl_1.DestinationServiceImpl();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
// Events registery end points
app.post("/register/event", (req, res) => {
    const alertInfo = req.body;
    const error = eventService.validateUserInfo(alertInfo);
    if (error) {
        res.status(400).send(error);
        return;
    }
    const data = eventService.addEvent(alertInfo);
    res.status(200).send(data);
});
app.get("/event-register/list/all", (req, res) => {
    const data = eventService.listEvents();
    if (data.length === 0) {
        res.status(404).send("No register file");
        return;
    }
    res.status(200).send(data);
});
app.delete("/event-register/remove/:alertId", (req, res) => {
    const alertId = req.params.alertId;
    const success = eventService.removeEvent(alertId);
    if (!success) {
        res.status(404).send("Alert id doesn't exist");
        return;
    }
    res.status(200).send("Success!");
});
app.get("/register/events/:userId", (req, res) => {
    const userId = req.params.userId;
    try {
        const data = eventService.listEventsByUserId(userId);
        if (data) {
            console.log("in server.js - alerts:" + data);
            res.status(200).send(data);
        }
        else {
            res.status(200).send({ message: "No registered events!" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
});
//Destinations end points
app.post("/destinations", (req, res) => {
    const data = destinationService.setTelegramDestination(req.body);
    console.log(data);
    if (data !== "ok") {
        res.status(400).send(data);
        return;
    }
    res.status(200).send(data);
});
app.get("/destinations/:userId", (req, res) => {
    try {
        const data = destinationService.getDestinations(req.params.userId);
        if (data) {
            console.log("in server.js" + data.telegram.chatId);
            res.status(200).send(data);
        }
        else {
            res.status(200).send({ message: "No registered destinations!" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(400).send({ error: error.message });
    }
});
app.listen(3005, () => {
    console.log("Server running on port 3005");
});
