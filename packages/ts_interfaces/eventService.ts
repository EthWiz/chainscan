export interface UserEventAlert {
  userId: string;
  chainId: number;
  contractAddress: string;
  eventName?: string;
  signatureHash?: string;
  alertId: string;
}
export interface EventService {
  validateUserInfo(userInfo: UserEventAlert): string | null;
  addEvent(userInfo: UserEventAlert): void;
  listEvents(): UserEventAlert[];
  removeEvent(alertId: string): boolean;
  listEventsByUserId(userId: string): UserEventAlert[] | null;
}
