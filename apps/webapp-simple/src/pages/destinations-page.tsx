import { useAuth0 } from "@auth0/auth0-react";

interface User {
  sub: string;
}

const Destinations = () => {
  const { user } = useAuth0<User>();
  const userId = user.sub.split("|")[1];
  const botUsername = import.meta.env.VITE_BOT_USERNAME as string;
  const telegramUrl = `https://t.me/${botUsername}?start=${userId}`;

  return (
    <div>
      <a href={telegramUrl} target="_blank" rel="noopener noreferrer">
        <button>Register Telegram</button>
      </a>
    </div>
  );
};

export default Destinations;
