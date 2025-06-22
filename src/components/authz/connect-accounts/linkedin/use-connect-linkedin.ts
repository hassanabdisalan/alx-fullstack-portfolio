import { envVariables } from "@/env";
import { AUTH_WITH_LINKEDIN } from "@/graphql/mutations/auth";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { toast } from "sonner";


const scope =
  "r_member_postAnalytics r_organization_followers r_organization_social rw_organization_admin r_organization_social_feed w_member_social r_member_profileAnalytics w_organization_social r_basicprofile w_organization_social_feed w_member_social_feed r_1st_connections_size";

  const REDIRECT_URI = `${envVariables.VITE_BASE_URL}/admin/settings?tab=connected`;

  const LINKEDIN_AUTH_URL = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${envVariables.VITE_LINKEDIN_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${scope}` as const;

export function useConnectLinkedIn() {
  const [linkedInStatus, setLinkedInStatus] = useState<"Connected" | "Disconnected">("Disconnected");
  const location = useLocation()
  const navigate = useNavigate();
  const [authwithLinkedIn] = useMutation(AUTH_WITH_LINKEDIN,{
  onCompleted: (data) => {
    if (data?.linkedInAuth?.status === "success") {
      setLinkedInStatus("Connected");
      const currentUrl = new URL(location.pathname)
      currentUrl.searchParams.delete("code");
      navigate(currentUrl.toString(), { replace: true });
    } else {
      setLinkedInStatus("Disconnected");
      toast.error("Failed to connect LinkedIn account");
    }
  }
  });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check URL parameters for LinkedIn connection status
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) {
      authwithLinkedIn({ variables: { code, redirectUri: REDIRECT_URI } })
        .then((response) => {
          if (response.data?.linkedInAuth?.status === "success") {
            setLinkedInStatus("Connected");
            toast.success("LinkedIn account connected successfully!");
          } else {
            setLinkedInStatus("Disconnected");
            toast.error("Failed to connect LinkedIn account");
          }
        })
        .catch((error) => {
          console.error("LinkedIn connection error:", error);
          setLinkedInStatus("Disconnected");
          toast.error("Failed to connect LinkedIn account");
        });
    }
  }, []);

  const handleLinkedInConnect = () => {
    setIsLoading(true);
    try {
      // Redirect to LinkedIn OAuth flow
      window.location.href = LINKEDIN_AUTH_URL;
    } catch (error) {
      console.error("LinkedIn connection error:", error);
      toast.error("Failed to connect LinkedIn account");
      setIsLoading(false);
    }
  };

  return {
    linkedInStatus,
    isLoading,
    handleLinkedInConnect
  };
}
