import {
  DestinationService,
  DestinationRegistry,
  SetTelegramDestination,
  UserDestination,
} from "@chainscan/ts_interfaces";
import * as fs from "fs";
const destinationsRegister = "./apps/registry/data/destinationRegister.json";

export class DestinationServiceImpl implements DestinationService {
  setTelegramDestination(data: SetTelegramDestination): string {
    console.log(data);
    let destinations: DestinationRegistry;
    try {
      destinations = JSON.parse(fs.readFileSync(destinationsRegister, "utf8"));
      if (destinations[data.userId]) {
        destinations[data.userId].telegram.chatId = data.chatId;
        destinations[data.userId].telegram.botName = data.telegramBotName;
        fs.writeFileSync(destinationsRegister, JSON.stringify(destinations));
      } else {
        destinations[data.userId] = {
          telegram: {
            chatId: data.chatId,
            botName: data.telegramBotName,
          },
          webhook: { urls: [] },
        };
        fs.writeFileSync(destinationsRegister, JSON.stringify(destinations));
      }
      return "ok";
    } catch (err) {
      console.log(err);
      return err instanceof Error ? err.message : "An error occurred";
    }
  }

  getDestinations(userId: string): UserDestination {
    try {
      const destinations: DestinationRegistry = JSON.parse(
        fs.readFileSync(destinationsRegister, "utf8")
      );

      if (destinations[userId]) {
        return destinations[userId];
      } else {
        throw new Error("user not found");
      }
    } catch (err) {
      console.error(err);
      throw err instanceof Error ? err : new Error("An error occurred");
    }
  }
}
