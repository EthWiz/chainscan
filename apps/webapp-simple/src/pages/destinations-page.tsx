import { useAuth0 } from "@auth0/auth0-react";
import { UserDestination } from "@chainscan/ts_interfaces";
import { useContext } from "react";
import { DestinationsContext } from "../contexts/DestinationsContext";

interface User {
  sub: string;
}

interface DestinationProps {
  destinations: UserDestination;
}

const Destinations: React.FC<DestinationProps> = () => {
  const { destinations, setDestinations } = useContext(DestinationsContext);
  const { user } = useAuth0<User>();
  const userId = user.sub.split("|")[1];
  const botUsername = import.meta.env.VITE_BOT_USERNAME as string;
  const telegramUrl = `https://t.me/${botUsername}?start=${userId}`;

  const onDeleteDestination = () => {
    setDestinations({
      telegram: {
        botName: "",
        chatId: 0,
      },
      webhook: {
        urls: [""],
      },
    });
  };

  return (
    <div>
      <div className="container">
        {destinations.telegram.chatId == 0 ? (
          <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
            <button className="btn btn-primary">Register Telegram Bot!</button>
          </a>
        ) : (
          <>
            {destinations.telegram && (
              <p>Bot channel: {destinations.telegram.botName}</p>
            )}
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
