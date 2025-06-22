import { Users } from "@/__generated__/graphql";
import { createContext } from "react";

export type AppUser = Users;
// s (Admin, Sales, Marketing, and Support teams)
export type TAppContext = {
  user?: AppUser | null;
  setUser: (user?: AppUser) => void;
  isLoading?: boolean;
  setIsLoading: (isLoading: boolean) => void;
  refreshUser: () => Promise<AppUser | null | undefined>;
  // add other context values here
};
export const AppContext = createContext<TAppContext>({
  user: undefined,
  setUser: () => {},
  isLoading: false,
  setIsLoading: () => {},
  refreshUser: async () => null,
});
