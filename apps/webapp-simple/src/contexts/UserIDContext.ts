import { createContext } from "react";

export const UserIDContext = createContext<{
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
}>({
  userId: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUserId: () => {},
});
