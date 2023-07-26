import { createContext } from "react";
import { Alert as AlertType } from "@chainscan/ts_interfaces";

export const AlertsContext = createContext<{
  alerts: AlertType[];
  setAlerts: React.Dispatch<React.SetStateAction<AlertType[]>>;
}>({
  alerts: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAlerts: () => {},
});
