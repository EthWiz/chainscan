import { useEffect, Dispatch, SetStateAction } from "react";
import { Alert } from "@chainscan/ts_interfaces";

const useAlerts = (
  userId: string,
  base_url: string,
  setAlerts: Dispatch<SetStateAction<Alert[] | []>>
) => {
  useEffect(() => {
    const getAlerts = async (): Promise<Alert[]> => {
      const response = await fetch(`${base_url}/alerts/${userId}`);
      if (response.ok) {
        const data = (await response.json()) as Alert[];
        return data;
      }
      return [];
    };
    if (userId != "") {
      getAlerts()
        .then((data) => {
          setAlerts(data);
        })
        .catch((error) => {
          console.error("An error occurred while fetching alerts:", error);
        });
    }
  }, [userId, base_url, setAlerts]);
};

export default useAlerts;
