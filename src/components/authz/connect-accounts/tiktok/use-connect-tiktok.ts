import { envVariables } from "@/env";
import { AUTH_WITH_TIKTOK } from "@/graphql/mutations/auth";
import { generateRandomString } from "@/utils/rand";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// TikTok OAuth configuration
const CLIENT_KEY = "aw2yzqd5ey2bjb55"; // TikTok client key
const SCOPE = "user.info.basic,video.list,video.upload";
const REDIRECT_URI = `${envVariables.VITE_BASE_URL}/admin/settings?tab=connected`;


async function generateCodeChallenge(codeVerifier: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(codeVerifier);
  const hash = await crypto.subtle.digest("SHA-256", data);
  const base64 = btoa(String.fromCharCode(...new Uint8Array(hash)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
  return base64;
}

export function useConnectTikTok() {
  const [tikTokStatus, setTikTokStatus] = useState<"Connected" | "Disconnected">("Disconnected");
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [authWithTikTok] = useMutation(AUTH_WITH_TIKTOK, {
    onCompleted: (data) => {
      if (data?.authTikTok?.status === "success") {
        setTikTokStatus("Connected");
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete("code");
        currentUrl.searchParams.delete("scope");
        currentUrl.searchParams.delete("state");
        navigate(currentUrl.pathname + currentUrl.search, { replace: true });
      } else {
        setTikTokStatus("Disconnected");
        toast.error("Failed to connect TikTok account");
      }
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("TikTok connection error:", error);
      setTikTokStatus("Disconnected");
      toast.error("Failed to connect TikTok account");
      setIsLoading(false);
    }
  });

  useEffect(() => {
    // Check URL parameters for TikTok OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    
    if (code && state) {
      // Get the stored code verifier from localStorage
      const storedCodeVerifier = localStorage.getItem("tikTokCodeVerifier");
      const storedState = localStorage.getItem("tikTokState");
      
      if (storedState === state && storedCodeVerifier) {
        setIsLoading(true);
        authWithTikTok({ 
          variables: { 
            code, 
            codeVerifier: storedCodeVerifier 
          } 
        })
        .then((response) => {
          if (response.data?.authTikTok?.status === "success") {
            setTikTokStatus("Connected");
            toast.success("TikTok account connected successfully!");
          } else {
            setTikTokStatus("Disconnected");
            toast.error("Failed to connect TikTok account");
          }
        })
        .catch((error) => {
          console.error("TikTok connection error:", error);
          setTikTokStatus("Disconnected");
          toast.error("Failed to connect TikTok account");
        })
        .finally(() => {
          // Clean up stored values
          localStorage.removeItem("tikTokCodeVerifier");
          localStorage.removeItem("tikTokState");
          setIsLoading(false);
        });
      } else {
        toast.error("Invalid TikTok OAuth state");
        setIsLoading(false);
      }
    }
  }, [authWithTikTok]);

  const handleTikTokConnect = async () => {
    setIsLoading(true);
    try {
      // Generate PKCE values
      const codeVerifier = generateRandomString(128);
      const codeChallenge = await generateCodeChallenge(codeVerifier);
      const state = generateRandomString(32);
      
      // Store values for later verification
      localStorage.setItem("tikTokCodeVerifier", codeVerifier);
      localStorage.setItem("tikTokState", state);
      
      // Build TikTok OAuth URL
      const authUrl = new URL("https://www.tiktok.com/v2/auth/authorize/");
      authUrl.searchParams.set("client_key", CLIENT_KEY);
      authUrl.searchParams.set("scope", SCOPE);
      authUrl.searchParams.set("response_type", "code");
      authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
      authUrl.searchParams.set("state", state);
      authUrl.searchParams.set("code_challenge", codeChallenge);
      authUrl.searchParams.set("code_challenge_method", "S256");
      
      // Redirect to TikTok OAuth flow
      window.location.href = authUrl.toString();
    } catch (error) {
      console.error("TikTok connection error:", error);
      toast.error("Failed to connect TikTok account");
      setIsLoading(false);
    }
  };

  return {
    tikTokStatus,
    isLoading,
    handleTikTokConnect
  };
}
