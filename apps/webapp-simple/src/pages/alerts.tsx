import { Alert as AlertType } from "@chainscan/ts_interfaces";
import { Alert } from "../components/Alert";

interface AlertsProps {
  alerts: AlertType[];
}

export const Alerts: React.FC<AlertsProps> = ({ alerts }) => {
  return (
    <div className="container">
      <div className="row">
        {alerts.map((element) => (
          <div
            className="col-sm-12 col-md-6 col-lg-4 p-3"
            key={element.alertId}
          >
            <Alert alert={element} />
          </div>
        ))}
      </div>
    </div>
  );
};
