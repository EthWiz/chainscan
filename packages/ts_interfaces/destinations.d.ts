export interface UserDestination {
  telegram: {
    botName: string;
    chatId: number;
  };
  webhook: {
    urls: string[];
  };
}

export interface DestinationRegistry {
  [userId: string]: UserDestination;
}

export interface SetTelegramDestination {
  chatId: number;
  userId: string;
  telegramBotName: string;
}

export interface DestinationService {
  setTelegramDestination(data: SetTelegramDestination): string;
  getDestinations(userId: string): UserDestination | null;
}
