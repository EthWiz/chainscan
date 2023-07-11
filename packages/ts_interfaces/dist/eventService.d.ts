export interface UserInfo {
    chatId?: number;
    contractAddress?: string;
    eventName?: string;
    signatureHash?: string;
    alertId?: string;
}
export interface EventService {
    validateUserInfo(userInfo: UserInfo): string | null;
    addEvent(userInfo: UserInfo): void;
    listEvents(): UserInfo[];
    removeEvent(alertId: string): boolean;
    listEventsByChatId(chatId: number): UserInfo[];
}
