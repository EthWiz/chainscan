import {
  UserEventAlert,
  EventService,
  SetTelegramDestination,
  DestinationRegistry,
} from "@chainscan/ts_interfaces";
import * as fs from "fs";
import { ethers } from "ethers";
const path = require("path");
const jsonPath = path.join(__dirname, "../data/event-register.json");

const filename = "./apps/registry/data/event-register.json";
const destinationsRegister = "./apps/registry/data/destinationsRegister.json";

export class EventServiceImpl implements EventService {
  private getEventData(): UserEventAlert[] {
    if (fs.existsSync(jsonPath)) {
      return JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    } else {
      return [];
    }
  }

  public validateUserInfo(info: UserEventAlert): string | null {
    if (!info) {
      return "Bad Request: event information";
    }
    if (!info["chainId"]) {
      return "Bad Request: missing chain id";
    }
    if (!info["userId"]) {
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

  private saveEventData(data: UserEventAlert[]): void {
    fs.writeFileSync(jsonPath, JSON.stringify(data));
  }

  private generateAlertId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  private generateSignatureHash(eventName: string): string {
    return ethers.keccak256(ethers.toUtf8Bytes(eventName));
  }

  public addEvent(userInfo: UserEventAlert): string {
    let data = this.getEventData();

    userInfo["signatureHash"] = this.generateSignatureHash(
      userInfo["eventName"] || ""
    );
    userInfo["alertId"] = this.generateAlertId();

    data.push(userInfo);
    this.saveEventData(data);
    return "Successfully registered event! Alert Id:" + userInfo["alertId"];
  }

  public listEvents(): UserEventAlert[] {
    return this.getEventData();
  }

  public removeEvent(alertId: string): boolean {
    let data = this.getEventData();
    const initialLength = data.length;

    data = data.filter((item) => item.alertId !== alertId);

    if (initialLength !== data.length) {
      this.saveEventData(data);
      return true;
    }

    return false;
  }

  public listEventsByUserId(userId: string): UserEventAlert[] | null {
    let data = this.getEventData();
    console.log("in eventServiceImpl.ts - alerts:" + data);
    let filteredData = data.filter((alert) => alert.userId === userId);
    console.log("this is filtered:" + filteredData);
    if (filteredData.length > 0) {
      return filteredData;
    } else {
      return null;
    }
  }
}
