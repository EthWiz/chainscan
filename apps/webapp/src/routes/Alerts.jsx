// Alerts.js
import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from '../components/alert/Alert';
const Alerts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3005/event-register/list/all');
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data: ', error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = (id) => {
        setData(data.filter(item => item.alertId !== id));
    }

    return (
        <Container fluid>
            <Row>
                {data.map((item, index) => (
                    <Col md={4} key={index}>
                        <Alert alert={item} handleDelete={handleDelete} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default Alerts;
