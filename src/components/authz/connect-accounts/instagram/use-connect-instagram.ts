import { envVariables } from "@/env";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const INSTAGRAM_AUTH_URL = `${envVariables.VITE_BACKEND_URL}/instagram/auth`;

export function useConnectInstagram() {
  const [instagramStatus, setInstagramStatus] = useState<"Connected" | "Disconnected">("Disconnected");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check URL parameters for Instagram connection status
    const urlParams = new URLSearchParams(window.location.search);
    const status = urlParams.get("status");
    const platform = urlParams.get("platform");

    if (status === "Connected" && platform === "instagram") {
      setInstagramStatus("Connected");
      toast.success("Instagram account connected successfully!");
    }
  }, []);

  const handleInstagramConnect = () => {
    setIsLoading(true);
    try {
      // Redirect to Instagram OAuth flow
      window.location.href = INSTAGRAM_AUTH_URL;
    } catch (error) {
      console.error("Instagram connection error:", error);
      toast.error("Failed to connect Instagram account");
      setIsLoading(false);
    }
  };

  return {
    instagramStatus,
    isLoading,
    handleInstagramConnect
  };
}
