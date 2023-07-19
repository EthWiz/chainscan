import { Alert as AlertType } from "@chainscan/ts_interfaces";
import "./Alert.css";
interface AlertProps {
  alert: AlertType;
}

export const Alert: React.FC<AlertProps> = ({ alert }) => {
  return (
    <div className="alert-card">
      <h1>{alert.alertId}</h1>
      <h2>{alert.contractAddress}</h2>
      <p>{alert.eventName}</p>
    </div>
  );
};
