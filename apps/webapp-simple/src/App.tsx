import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import { useEffect, useState } from "react";
import { Alert } from "@chainscan/ts_interfaces";
import { Alerts } from "./pages/alerts";
import { useAuth0 } from "@auth0/auth0-react";
import DashboardLayout from "./pages/layouts/dashboard-layout";
import CreateAlert from "./pages/createAlert-page";
import Destinations from "./pages/destinations-page";
import CallbackPage from "./pages/callback-page";
import AuthenticationGuard from "./components/auth0/AuthenticationGuard";
import { UserDestination } from "@chainscan/ts_interfaces";
const base_url = import.meta.env.VITE_API_URL as string;

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [alerts, setAlerts] = useState<Alert[] | []>([]);
  const [destinations, setDestinations] = useState<UserDestination>({
    telegram: { botName: "", chatId: 0 },
    webhook: { urls: [] },
  });
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    const getAlerts = async (): Promise<Alert[]> => {
      const response = await fetch(
        `https://${base_url}/event-register/list/all`
      );
      const data = (await response.json()) as Alert[];
      return data;
    };

    getAlerts()
      .then((data) => {
        setAlerts(data);
      })
      .catch((error) => {
        console.error("An error occurred while fetching alerts:", error);
      });

    if (!isLoading && isAuthenticated) {
      const userId = user.sub.split("|")[1];
      setUserId(userId);

      const getDestinations = async (): Promise<UserDestination> => {
        const response = await fetch(`${base_url}/destinations/${userId}`);
        const data = await response.json();
        return data;
      };

      getDestinations()
        .then((data) => {
          setDestinations(data);
        })
        .catch((error) => {
          console.error(
            "An error occurred while fetching destinations:",
            error
          );
        });
    }
  }, [isLoading, isAuthenticated, user]);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/app"
          element={<AuthenticationGuard component={DashboardLayout} />}
        >
          <Route index element={<Alerts alerts={alerts} />} />
          <Route path="create-alert" element={<CreateAlert />} />
          <Route path="destinations" element={<Destinations />} />
        </Route>
        <Route path="/callback" element={<CallbackPage />} />
      </Routes>
    </>
  );
}

export default App;
