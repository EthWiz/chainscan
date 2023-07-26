import { useContext } from "react";
import { DestinationsContext } from "../contexts/DestinationsContext";
import { UserIDContext } from "../contexts/UserIDContext";
const Destinations = () => {
  const { destinations, setDestinations } = useContext(DestinationsContext);
  const { userId } = useContext(UserIDContext);
  const botUsername = import.meta.env.VITE_BOT_USERNAME as string;
  const telegramUrl = `https://t.me/${botUsername}?start=${userId}`;

  const onDeleteDestination = () => {
    setDestinations({
      botName: "",
      chatId: 0,
    });
  };

  return (
    <div>
      <div className="container">
        {destinations.chatId == 0 ? (
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-primary">Register Telegram Bot!</button>
          </a>
        ) : (
          <>
            <p>Bot channel: {destinations.botName}</p>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => onDeleteDestination()}
            >
              Delete Telegram Bot!
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Destinations;
