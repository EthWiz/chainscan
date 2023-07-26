import { Alert as AlertType } from "@chainscan/ts_interfaces";
import "./Alert.css";
import { useContext } from "react";
import { AlertsContext } from "../contexts/AlertsContext";
import { deleteAlert } from "../api/alertApi";
import { UserIDContext } from "../contexts/UserIDContext";
interface AlertProps {
  alert: AlertType;
}

export const Alert: React.FC<AlertProps> = ({ alert }) => {
  const { setAlerts } = useContext(AlertsContext);
  const { userId } = useContext(UserIDContext);

  const handleDelete = () => {
    deleteAlert(userId, alert.alertId)
      .then(() => {
        console.log(`Successfuly deleted ${alert.alertId}`);
        setAlerts((prevAlerts) =>
          prevAlerts.filter((element) => element.alertId !== alert.alertId)
        );
      })
      .catch(console.error);
  };

  return (
    <div className="card">
      <div className="card-body">
        <h2>{alert.event.eventName}</h2>
        <p>{alert.event.contractAddress}</p>
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Alert
        </button>
      </div>
    </div>
  );
};
