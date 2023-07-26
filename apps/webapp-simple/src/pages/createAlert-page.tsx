import { useState, useContext, useEffect } from "react";
import { CreateEventAlert } from "@chainscan/ts_interfaces";
import { createAlert } from "../api/alertApi";
import { UserIDContext } from "../contexts/UserIDContext";
import { AlertsContext } from "../contexts/AlertsContext";
import { getContractEventSignatures } from "@chainscan/utils";
import { ethers } from "ethers";
const etherscan_key: string = import.meta.env.VITE_ETHERSCAN_API_KEY as string;

const CreateAlert: React.FC = () => {
  const { userId } = useContext(UserIDContext);
  const { alerts, setAlerts } = useContext(AlertsContext);
  const [formState, setFormState] = useState<CreateEventAlert>({
    userId: userId,
    eventName: "",
    chainId: 0,
    contractAddress: "",
  });

  const [events, setEvents] = useState<string[]>([]);
  useEffect(() => {
    if (
      formState.contractAddress &&
      ethers.isAddress(formState.contractAddress)
    ) {
      getContractEventSignatures(etherscan_key, formState.contractAddress)
        .then(setEvents)
        .catch(console.error);
    }
  }, [formState.contractAddress]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    createAlert(formState)
      .then((res) => {
        console.log(res);
        setAlerts([...alerts, res]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const isChainId = e.target.name === "chainId";
    const value = isChainId ? parseInt(e.target.value, 10) : e.target.value;

    setFormState((prevState) => ({
      ...prevState,
      [e.target.name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="chainId">
          Chain ID
        </label>
        <select
          id="chainId"
          name="chainId"
          value={formState.chainId || ""}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Chain</option>
          <option value="1">Ethereum</option>
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="contractAddress" className="form-label">
          Contract Address
        </label>
        <input
          name="contractAddress"
          value={formState.contractAddress || ""}
          onChange={handleChange}
          placeholder="Contract Address"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="eventName">
          Event Name
        </label>
        <select
          id="eventName"
          name="eventName"
          value={formState.eventName || ""}
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Select Event</option>
          {events.map((event, index) => (
            <option key={index} value={event}>
              {event}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <input
          name="message"
          value={formState.message || ""}
          onChange={handleChange}
          placeholder="Message"
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <input
          name="description"
          value={formState.description || ""}
          onChange={handleChange}
          placeholder="Description"
          className="form-control"
        />
      </div>
      <button type="submit">Create Alert</button>
    </form>
  );
};

export default CreateAlert;
