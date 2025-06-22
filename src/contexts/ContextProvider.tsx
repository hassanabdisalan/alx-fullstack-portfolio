import PropTypes from "prop-types";
import { useEffect, useState, useCallback } from "react";
import { AppContext } from "./AppContext";
import { useQuery } from "@apollo/client";
import { CURRENT_USER_QUERY } from "@/graphql/queries/user";
import { Users } from "@/__generated__/graphql";
import client from "@/lib/apollo/client";

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Users | undefined | null>(undefined);

  // Use Apollo's refetch function which will be used in our refreshUser callback
  const { data, loading, refetch } = useQuery(CURRENT_USER_QUERY, {
    fetchPolicy: "network-only", // This ensures we always fetch from network when refetching
  });
  // console.log("Current user data == :", data);
  const [isLoading, setIsLoading] = useState(loading);

  // Update user state whenever data changes
  useEffect(() => {
    setUser(data?.user);
    setIsLoading(loading);
  }, [data, loading]);

  // Create a refreshUser callback that can be used throughout the app
  const refreshUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data: refreshedData } = await refetch();
      setUser(refreshedData?.user);
      await client.clearStore(); // Clear Apollo cache to ensure fresh data
      return refreshedData?.user;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [refetch]);

  return (
    <AppContext.Provider
      value={{
        user,
        setUser,
        isLoading,
        setIsLoading,
        refreshUser, // Exposing the refresh callback
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
