import { Dispatch, SetStateAction, useEffect } from "react";
import { UserDestination } from "@chainscan/ts_interfaces";

const useDestinations = (
  userId: string,
  base_url: string,
  setDestinations: Dispatch<SetStateAction<UserDestination>>
) => {
  useEffect(() => {
    const getDestinations = async (): Promise<UserDestination> => {
      const response = await fetch(`${base_url}/destinations/${userId}`);
      if (response.ok) {
        const data = (await response.json()) as UserDestination;
        return data;
      }
      return { telegram: { botName: "", chatId: 0 }, webhook: { urls: [] } };
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
