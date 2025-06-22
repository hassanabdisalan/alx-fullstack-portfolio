import { envVariables } from "@/env";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const TWITTER_AUTH_URL = `${envVariables.VITE_BACKEND_URL}/twitter/auth`;

export function useConnectTwitter() {
  const [twitterStatus, setTwitterStatus] = useState<"Connected" | "Disconnected">("Disconnected");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check URL parameters for Twitter connection status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const platform = urlParams.get("platform");

    if (status === "Connected" && platform === "twitter") {
      setTwitterStatus("Connected");
      toast.success("Twitter account connected successfully!");
    }
  }, []);

  const handleTwitterConnect = () => {
    setIsLoading(true);
    try {
      // Redirect to Twitter OAuth flow
      window.location.href = TWITTER_AUTH_URL;
    } catch (error) {
      console.error("Twitter connection error:", error);
      toast.error("Failed to connect Twitter account");
      setIsLoading(false);
    }
  };

  return {
    twitterStatus,
    isLoading,
    handleTwitterConnect
  };
}
