import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import { useEffect, useState } from "react";
import { Alert } from "@chainscan/ts_interfaces";
import { Alerts } from "./pages/alerts";
import DashboardLayout from "./pages/layouts/dashboard-layout";
import CreateAlert from "./pages/createAlert-page";
import Destinations from "./pages/destinations-page";
import CallbackPage from "./pages/callback-page";
import AuthenticationGuard from "./components/auth0/AuthenticationGuard";
const base_url = import.meta.env.VITE_API_URL as string;

function App() {
  const [alerts, setAlerts] = useState<Alert[] | []>([]);

  useEffect(() => {
    const getAlerts = async (): Promise<Alert[]> => {
      const response = await fetch(
        `http://${base_url}/event-register/list/all`
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
  }, []);

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
