import { useState, useEffect } from "react";
import axios from "axios";
import { ethers } from "ethers";
import Select from "react-select";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import DashboardLayout from "../layouts/DashboardLayout";
const base_url = import.meta.env.VITE_API_URL;
const etherscanApiKey = import.meta.env.VITE_ETHERSCAN_API_KEY;

const CreateAlert = () => {
  const [contractAddress, setContractAddress] = useState("");
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [chatId, setChatId] = useState("");
  const [status, setStatus] = useState("");

  const fetchEvents = async (address) => {
    try {
      const response = await axios.get(
        `https://api.etherscan.io/api?module=contract&action=getabi&address=${address}&apikey=${etherscanApiKey}`
      );

      if (response.data.status !== "1") {
        setStatus("Error fetching contract ABI from Etherscan.");
        return;
      }

      const abi = JSON.parse(response.data.result);
      const contractInterface = new ethers.Interface(abi);
      const fragments = contractInterface.fragments;

      const eventSignatures = fragments
        .filter((fragment) => fragment.type === "event")
        .map((fragment) => {
          const inputTypes = fragment.inputs.map((input) => input.type);
          const eventSignature = `${fragment.name}(${inputTypes.join(",")})`;
          return { value: eventSignature, label: eventSignature };
        });

      setEvents(eventSignatures);
    } catch (error) {
      console.error(error);
      setStatus("Error fetching data.");
    }
  };

  const handleCreateAlert = async () => {
    try {
      const response = await axios.post(
        `http://${base_url}:3005/event-register/add`,
        {
          chatId,
          eventName: selectedEvent.value,
          contractAddress,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 200) {
        setStatus("Error registering the alert.");
        return;
      }

      setStatus("Success!");
    } catch (error) {
      console.error(error);
      setStatus("Error registering the alert." + error);
    }
  };

  useEffect(() => {
    if (contractAddress) {
      fetchEvents(contractAddress);
    }
  }, [contractAddress]);

  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <Card style={{ width: "400px", padding: "20px" }}>
        <Card.Body>
          <Card.Title>Create Alert</Card.Title>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Contract Address"
              className="form-control"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <Select
              options={events}
              value={selectedEvent}
              onChange={setSelectedEvent}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              placeholder="Chat ID"
              className="form-control"
              value={chatId}
              onChange={(e) => setChatId(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <Button variant="primary" onClick={handleCreateAlert}>
              Create Alert
            </Button>
          </div>
          {status && <p>{status}</p>}
        </Card.Body>
      </Card>
    </div>
  );
};

export default CreateAlert;
