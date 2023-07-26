export type AlertType = "event";

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
  userId: string;
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
  getAlertsForUser(userId: string): Promise<Alert[]>;
  createAlert(data: CreateEventAlert): Promise<Alert>;
}

export interface DynamoAlertByUserResponse {
  ContractAddress: string;
  EventHash: string;
  alert: Alert;
}
