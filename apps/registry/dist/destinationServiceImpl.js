"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DestinationServiceImpl = void 0;
const fs = __importStar(require("fs"));
const path = require("path");
const jsonPath = path.join(__dirname, "../data/destinationRegister.json");
class DestinationServiceImpl {
    setTelegramDestination(data) {
        console.log(data);
        let destinations;
        try {
            destinations = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
            if (destinations[data.userId]) {
                destinations[data.userId].telegram.chatId = data.chatId;
                destinations[data.userId].telegram.botName = data.telegramBotName;
                fs.writeFileSync(jsonPath, JSON.stringify(destinations));
            }
            else {
                destinations[data.userId] = {
                    telegram: {
                        chatId: data.chatId,
                        botName: data.telegramBotName,
                    },
                    webhook: { urls: [] },
                };
                fs.writeFileSync(jsonPath, JSON.stringify(destinations));
            }
            return "ok";
        }
        catch (err) {
            console.log(err);
            return err instanceof Error ? err.message : "An error occurred";
        }
    }
    getDestinations(userId) {
        try {
            const destinations = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
            console.log("looking for" + userId);
            if (destinations[userId]) {
                console.log(destinations[userId]);
                return destinations[userId];
            }
            else {
                console.log("user not found");
                return null;
            }
        }
        catch (err) {
            console.error(err);
            throw err instanceof Error ? err : new Error("An error occurred");
        }
    }
}
exports.DestinationServiceImpl = DestinationServiceImpl;
