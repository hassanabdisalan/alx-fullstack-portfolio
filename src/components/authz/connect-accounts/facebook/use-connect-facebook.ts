import { USER_FACEBOOK_SIGNUP } from "@/graphql/mutations/auth";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "sonner";
import { facebookScopes } from "@/utils/facebookScopes";
import { useAuthSDKs } from "@/hooks/useAuthSDKs";

export function useConnectFacebook() {
    useAuthSDKs();
    const [isFacebookLoading, setIsFacebookLoading] = useState(false);
    const [facebookError, setFacebookError] = useState<string | null>(null);
    const [facebookStatus, setFacebookStatus] = useState<
      "Connected" | "Disconnected"
    >("Disconnected");
    const [authWithFacebook, { loading: facebookAuthLoading }] = useMutation(
      USER_FACEBOOK_SIGNUP,
      {
        onCompleted: (facebookAuthData) => {
          if (facebookAuthData?.authWithFacebook?.status === "Success") {
            toast.success(
              facebookAuthData?.authWithFacebook?.message ||
                "Successfully logged in with Facebook",
            );
          }
        },
        onError: (error) => {
          console.error("Error Login in with FACEBOOK:", error);
        },
      },
    );

    const handleFacebookSignup = async (
      userID: string,
      accessToken: string,
    ) => {
      try {
        // console.log("Signing in with Facebook:", userID, accessToken);
        const res = await authWithFacebook({
          variables: { userID, accessToken },
        });
        // console.log("Auth result:", res);
        setFacebookStatus("Connected");
        toast.success("Facebook account connected!");
      } catch (err) {
        // console.error("Facebook auth failed", err);
        setFacebookStatus("Disconnected");
        toast.error("Failed to connect Facebook.", {
          duration: 50000,
          dismissible: true,
        });
      }
    };

    const handleFbBtnClick = () => {
      setIsFacebookLoading(true);
      setFacebookError(null);

      try {
        window.FB.login(
          (response: any) => {
            setIsFacebookLoading(false);
            if (response.authResponse) {
              // console.log("Facebook Login Success:", response);
              const { userID, accessToken } = response.authResponse;
              // console.log("FACEBOOK LOGIN DETAILS:::", userID, accessToken);
              handleFacebookSignup(userID, accessToken);
            } else {
              toast.error("User cancelled Facebook login.", {
                duration: 50000,
                dismissible: true,
              });
            }
          },
          {
            scope: facebookScopes.join(","),
            return_scopes: true,
          },
        );
      } catch (error) {
        setFacebookError("Failed to initiate Facebook signup");
        setIsFacebookLoading(false);
        console.log(error);
        toast.error("Facebook login initialization failed", {
          duration: 50000,
          dismissible: true,
        });
      }
    };
    return {
      isFacebookLoading,
      facebookError,
      facebookStatus,
      handleFbBtnClick,
      facebookAuthLoading,
    };
}
