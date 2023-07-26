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
import { Destination } from "@chainscan/ts_interfaces";
import useAlerts from "./hooks/useAlerts";
import useDestinations from "./hooks/useDestinations";
import { AlertsContext } from "./contexts/AlertsContext";
import { DestinationsContext } from "./contexts/DestinationsContext";
import { UserIDContext } from "./contexts/UserIDContext";
const base_url = import.meta.env.VITE_BASE_URL_REGISTRY as string;

function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [alerts, setAlerts] = useState<Alert[] | []>([]);
  const [destinations, setDestinations] = useState<Destination>({
    botName: "",
    chatId: 0,
  });

  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      const userId = user.sub.split("|")[1];
      setUserId(userId);
    }
  }, [isLoading, isAuthenticated, user]);

  useAlerts(userId, base_url, setAlerts);
  useDestinations(userId, base_url, setDestinations);

  return (
    <>
      <UserIDContext.Provider value={{ userId, setUserId }}>
        <AlertsContext.Provider value={{ alerts, setAlerts }}>
          <DestinationsContext.Provider
            value={{ destinations, setDestinations }}
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/app"
                element={<AuthenticationGuard component={DashboardLayout} />}
              >
                <Route index element={<Alerts />} />
                <Route path="create-alert" element={<CreateAlert />} />
                <Route path="destinations" element={<Destinations />} />
              </Route>
              <Route path="/callback" element={<CallbackPage />} />
            </Routes>
          </DestinationsContext.Provider>
        </AlertsContext.Provider>
      </UserIDContext.Provider>
    </>
  );
}

export default App;
