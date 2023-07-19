import { Alert as AlertType } from "@chainscan/ts_interfaces";
import { Alert } from "../components/Alert";

interface AlertsProps {
  alerts: AlertType[];
}

export const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
  return (
    <div>
      {alerts.map((element) => (
        <Alert key={element.alertId} alert={element} />
      ))}
    </div>
  );
};
