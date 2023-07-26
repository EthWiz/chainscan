declare enum AlertType {
  Event = "event",
}

export interface EventDetail {
  chainId: number;
  contractAddress: string;
  eventName: string;
  eventHash: string;
  description?: string;
  message?: string;
}

export interface Alert {
  alertId: string;
  type: AlertType;
  event: EventDetail;
}

export interface Alerts {
  [userId: string]: Alert[];
}

export interface CreateEventAlert {
  userId: string;
  eventName: string;
  chainId: number;
  contractAddress: string;
  message?: string;
  description?: string;
}

export interface AlertsServiceInterface {
  getAlertsByUserId(userId: string): Alert[];
  createAlert(data: CreateEventAlert): Alert;
}
