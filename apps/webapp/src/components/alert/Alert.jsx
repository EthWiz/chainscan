import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import axios from "axios";
const base_url = import.meta.env.VITE_API_URL;

const Alert = ({ alert, handleDelete }) => {
  const deleteAlert = async () => {
    try {
      await axios.delete(
        `http://${base_url}:3005/event-register/remove/${alert.alertId}`
      );
      console.log(`deleting ${alert.alertId}`);
      handleDelete(alert.alertId);
    } catch (error) {
      console.error("Error deleting alert: ", error);
    }
  };

  return (
    <Card className="mb-4">
      <Card.Body>
        <Card.Title>Alert ID: {alert.alertId}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Event Name: {alert.eventName}
        </Card.Subtitle>
        <Card.Text>Address: {alert.contractAddress}</Card.Text>
        <Button variant="danger" onClick={deleteAlert}>
          Delete
        </Button>
      </Card.Body>
    </Card>
  );
};

export default Alert;
