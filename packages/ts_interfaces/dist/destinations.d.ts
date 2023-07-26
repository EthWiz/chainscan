export interface Destination {
  botName: string;
  chatId: number;
}

export interface Destinations {
  [userId: string]: Destination;
}
export interface SetTelegramDestination {
  chatId: number;
  userId: string;
  telegramBotName: string;
}
export interface DestinationsService {
  setTelegramDestinationDB(data: SetTelegramDestination): Promise<Destination>;
  getDestinationsByUserId(userId: string): Promise<Destination> | null;
}
export {};
