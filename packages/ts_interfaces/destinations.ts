interface Destination {
  botName: string;
  chatId: number;
}

interface Destinations {
  [userId: string]: Destination;
}

export interface SetTelegramDestination {
  chatId: number;
  userId: string;
  telegramBotName: string;
}

export interface DestinationsService {
  setTelegramDestination(data: SetTelegramDestination): Destination | string;
  getDestinations(userId: string): Destination | null;
}
