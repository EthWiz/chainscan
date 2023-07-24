import {
  DestinationService,
  DestinationRegistry,
  SetTelegramDestination,
  UserDestination,
} from "@chainscan/ts_interfaces";
import * as fs from "fs";
const path = require("path");
const jsonPath = path.join(__dirname, "../data/destinationRegister.json");

export class DestinationServiceImpl implements DestinationService {
  setTelegramDestination(data: SetTelegramDestination): string {
    console.log(data);
    let destinations: DestinationRegistry;
    try {
      destinations = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
      if (destinations[data.userId]) {
        destinations[data.userId].telegram.chatId = data.chatId;
        destinations[data.userId].telegram.botName = data.telegramBotName;
        fs.writeFileSync(jsonPath, JSON.stringify(destinations));
      } else {
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
    } catch (err) {
      console.log(err);
      return err instanceof Error ? err.message : "An error occurred";
    }
  }

  getDestinations(userId: string): UserDestination | null {
    try {
      const destinations: DestinationRegistry = JSON.parse(
        fs.readFileSync(jsonPath, "utf8")
      );
      console.log("looking for" + userId);
      if (destinations[userId]) {
        console.log(destinations[userId]);
        return destinations[userId];
      } else {
        console.log("user not found");
        return null;
      }
    } catch (err) {
      console.error(err);
      throw err instanceof Error ? err : new Error("An error occurred");
    }
  }
}
