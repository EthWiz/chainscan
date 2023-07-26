import { Alert as AlertType } from "@chainscan/ts_interfaces";
import { Alert } from "../components/Alert";
import { AlertsContext } from "../contexts/AlertsContext";
import { useContext } from "react";
export const Alerts: React.FC = () => {
  const { alerts } = useContext(AlertsContext);

  if (!alerts || (alerts.length > 0 && !alerts[0].event)) {
    // Return some fallback UI or a default message
    return <p>Event details not available</p>;
  }
  return (
    <div className="container">
      <div className="row">
        {alerts.length > 0 ? (
          alerts.map((element) => (
            <div
              className="col-sm-12 col-md-6 col-lg-4 p-3"
              key={element.alertId}
            >
              <Alert alert={element} />
            </div>
          ))
        ) : (
          <p>No Alerts Registered!</p>
        )}
      </div>
    </div>
  );
};
