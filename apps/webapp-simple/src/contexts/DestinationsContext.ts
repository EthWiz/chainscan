import { createContext } from "react";
import { UserDestination } from "@chainscan/ts_interfaces";

export const DestinationsContext = createContext<{
  destinations: UserDestination;
  setDestinations: React.Dispatch<React.SetStateAction<UserDestination>>;
}>({
  destinations: {
    telegram: { botName: "", chatId: 0 },
    webhook: { urls: [] },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDestinations: () => {},
});
