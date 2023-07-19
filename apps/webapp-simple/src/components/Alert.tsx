import { Alert as AlertType } from "@chainscan/ts_interfaces";
import "./Alert.css";
interface AlertProps {
  alert: AlertType;
}

export const Alert: React.FC<AlertProps> = ({ alert }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h2>{alert.eventName}</h2>
        <p>{alert.contractAddress}</p>
      </div>
    </div>
  );
};
