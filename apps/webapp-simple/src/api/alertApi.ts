import { CreateEventAlert, Alert } from "@chainscan/ts_interfaces";
import axios from "axios";

const base_url = import.meta.env.VITE_BASE_URL_REGISTRY as string;

export const createAlert = async (data: CreateEventAlert): Promise<Alert> => {
  if (!base_url) {
    throw new Error("Environment variable VITE_API_URL is not set");
  }

  const response = await axios.post<Alert>(`${base_url}/alerts`, data);

  return response.data;
};

export const deleteAlert = async (
  userId: string,
  alertId: string
): Promise<void> => {
  if (!base_url) {
    throw new Error("Environment variable VITE_API_URL is not set");
  }

  await axios.delete(`${base_url}/alerts/${userId}/${alertId}`);

  return null;
};
