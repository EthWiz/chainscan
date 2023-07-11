"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const eventServiceImpl_1 = require("./eventServiceImpl");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const eventService = new eventServiceImpl_1.EventServiceImpl();
app.use(express_1.default.json());
app.use((0, cors_1.default)({ origin: "http://localhost:5173" }));
app.post("/event-register/add", (req, res) => {
    const userInfo = req.body;
    const error = eventService.validateUserInfo(userInfo);
    if (error) {
        res.status(400).send(error);
        return;
    }
    eventService.addEvent(userInfo);
    res.status(200).send("User information saved successfully");
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
app.get("/event-register/list/:chatId?", (req, res) => {
    if (req.params.chatId !== undefined) {
        const chatId = parseInt(req.params.chatId);
        const data = eventService.listEventsByChatId(chatId);
        if (data.length === 0) {
            res.status(404).send("No register file");
            return;
        }
        res.status(200).send(data);
    }
    else {
        console.log("chatId is undefined");
    }
});
app.listen(3005, () => {
    console.log("Server running on port 3005");
});
