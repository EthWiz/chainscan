import { Dispatch, SetStateAction, useEffect } from "react";
import { Destination } from "@chainscan/ts_interfaces";

interface DestinationAPIResponse {
  destination: Destination;
  userId: string;
}

const useDestinations = (
  userId: string,
  base_url: string,
  setDestinations: Dispatch<SetStateAction<Destination>>
) => {
  useEffect(() => {
    const getDestinations = async (): Promise<Destination> => {
      const response = await fetch(`${base_url}/destinations/${userId}`);
      if (response.ok) {
        const data = (await response.json()) as DestinationAPIResponse;
        const userData = data.destination;
        return userData;
      }
      return { botName: "", chatId: 0 };
    };

    if (userId) {
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
  }, [userId, base_url, setDestinations]);
};

export default useDestinations;
