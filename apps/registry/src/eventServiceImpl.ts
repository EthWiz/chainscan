import { UserInfo, EventService } from "@chainscan/ts_interfaces";
import * as fs from "fs";
import { ethers } from "ethers";

const filename = "./apps/registry/data/event-register.json";

export class EventServiceImpl implements EventService {
  private getEventData(): UserInfo[] {
    if (fs.existsSync(filename)) {
      return JSON.parse(fs.readFileSync(filename, "utf8"));
    } else {
      return [];
    }
  }

  public validateUserInfo(info: UserInfo): string | null {
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

  private saveEventData(data: UserInfo[]): void {
    fs.writeFileSync(filename, JSON.stringify(data));
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

  public addEvent(userInfo: UserInfo): void {
    let data = this.getEventData();

    userInfo["signatureHash"] = this.generateSignatureHash(
      userInfo["eventName"] || ""
    );
    userInfo["alertId"] = this.generateAlertId();

    data.push(userInfo);
    this.saveEventData(data);
  }

  public listEvents(): UserInfo[] {
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

  public listEventsByChatId(chatId: number): UserInfo[] {
    let data = this.getEventData();
    return data.filter((item) => item.chatId === chatId);
  }
}
