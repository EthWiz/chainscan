import { createContext } from "react";
import { Destination } from "@chainscan/ts_interfaces";

export const DestinationsContext = createContext<{
  destinations: Destination;
  setDestinations: React.Dispatch<React.SetStateAction<Destination>>;
}>({
  destinations: { botName: "", chatId: 0 },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setDestinations: () => {},
});
