import { envVariables } from "@/env";
import { useEffect } from "react";

// Declare google globally to avoid TypeScript errors
declare const google: any;

declare global {
  interface Window {
    fbAsyncInit: () => void;
    FB: any;
    google: any;
  }
}

export function useAuthSDKs(handleGoogleSignup?: (response: any) => void) {
  useEffect(() => {
    // GOOGLE SDK
    if (handleGoogleSignup && window.google && google?.accounts?.id) {
      google.accounts.id.initialize({
        client_id: envVariables.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogleSignup,
      });

      google.accounts.id.disableAutoSelect();

      google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "large",
          text: "signup_with",
          auto_select: false,
        },
      );
    }

    // FACEBOOK SDK
    const fbScript = document.createElement("script");
    fbScript.src = "https://connect.facebook.net/en_US/sdk.js";
    fbScript.async = true;
    fbScript.defer = true;
    fbScript.crossOrigin = "anonymous";
    document.body.appendChild(fbScript);

    window.fbAsyncInit = function () {
      window.FB.init({
        appId: envVariables.VITE_FB_APP_ID,
        cookie: true,
        xfbml: true,
        version: "v22.0",
      });
      console.log("✅ Facebook SDK initialized");
    };

    return () => {
      document.body.removeChild(fbScript);
    };
  }, [handleGoogleSignup]);
}
