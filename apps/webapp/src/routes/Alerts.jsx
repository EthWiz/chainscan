// Alerts.js
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "../components/alert/Alert";
import { getAlerts } from "../../util/api";
import { useLoaderData } from "react-router-dom";

const Alerts = () => {
  const [data, setData] = useState([]);
  const loaderData = useLoaderData();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.alertId !== id));
  };

  return (
    <Container fluid>
      <Row>
        {loaderData.map((item, index) => (
          <Col md={4} key={index}>
            <Alert alerts={item} handleDelete={handleDelete} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Alerts;

export async function loader({ request, params }) {
  return getAlerts();
}
