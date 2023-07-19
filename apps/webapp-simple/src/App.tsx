import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home-page";
import { HomeLayout } from "./pages/layouts/home-layout";
import { useEffect, useState } from "react";
import { Alert } from "@chainscan/ts_interfaces";
import { Alerts } from "./pages/alerts";
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
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<HomePage />} />
          <Route path="alerts" element={<Alerts alerts={alerts} />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
