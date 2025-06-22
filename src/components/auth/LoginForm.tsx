import { useState } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaFacebook } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import {
  USER_SIGNIN,
  USER_GOOGLE_SIGNUP,
  USER_FACEBOOK_SIGNUP,
  AUTH_TWO_FACTOR,
} from "@/graphql/mutations/auth";
import { useViewer } from "@/hooks/use-viewr";
import { toast } from "sonner";
import {
  CustomShadcnInput,
  CustomShadcnPasswordInput,
} from "../wrappers/forms/shadcn-inputs";
import { useAuthSDKs } from "@/hooks/useAuthSDKs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "lucide-react";
import { facebookScopes } from "@/utils/facebookScopes";
import { TwoFactorVerification } from "./TwoFactorVerification";
import { LoadingProgressBar } from "@/components/ui/loading-progress-bar";

// declare const google: any;

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  rememberMe: z.boolean().optional(),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSubmit?: (data: LoginFormData) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
  const [authStep, setAuthStep] = useState<"login" | "otp">("login");
  const [tokenId, setTokenId] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isResending, setIsResending] = useState(false);
  const { refreshUser } = useViewer();
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [facebookError, setFacebookError] = useState<string | null>(null);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isOtpLoading, setIsOtpLoading] = useState(false);

  // Combined loading state for progress bar
  // const navigate = useNavigate();
  
  const { control, handleSubmit, reset, } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });
  
  const [verifyOtp] = useMutation(AUTH_TWO_FACTOR);
  const [userLogin, { loading }] = useMutation(USER_SIGNIN);
  const [authWithGoogle] = useMutation(USER_GOOGLE_SIGNUP);
  const [authWithFacebook] = useMutation(USER_FACEBOOK_SIGNUP, {
    onCompleted: (data) => {
      setIsFacebookLoading(false);
      if (data.authWithFacebook?.status === "Success") {
        refreshUser?.();
        toast.success(
          data.authWithFacebook.message ||
            "Successfully Logged In with Facebook",
        );
        // Navigation will clear the loading state automatically
      }
    },
    onError: (error) => {
      console.error("Error Logging In with Facebook", error);
      setFacebookError(error.message);
      setIsFacebookLoading(false);
    },
  });
  
  const handleOtpSuccess = async (otpData: { otp: string }) => {
    setIsOtpLoading(true);
    try {
      const { data } = await verifyOtp({
        variables: {
          otp: otpData.otp,
          tokenId,
        },
      });
      
      if (data?.authTwoFA?.status === "Success") {
        toast.success("Two-factor authentication verified");
        refreshUser?.();
        reset();
        // Navigation will clear the loading state automatically
      } else {
        throw new Error(data?.authTwoFA?.message || "Verification failed");
      }
    } catch (error) {
      setIsOtpLoading(false);
      toast.error(
        error instanceof Error ? error.message : "OTP verification failed",
        {
          duration: 50000,
          dismissible: true,
        },
      );
      throw error;
    }
  };
  
  const handleResendOtp = async () => {
    setIsResending(true);
    try {
      const { data } = await userLogin({
        variables: {
          email: userEmail,
          password: "", // Adjust based on your backend
        },
      });

      if (data?.userLogin?.status === "Success") {
        setTokenId(data.userLogin.tokenId ?? "");
        refreshUser?.();
        toast.success("New OTP sent to your email");
      } else {
        throw new Error(data?.userLogin?.message || "Failed to resend OTP");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to resend OTP",
        {
          duration: 50000,
          dismissible: true,
        },
      );
    } finally {
      setIsResending(false);
    }
  };

  const onSubmitForm = (formData: LoginFormData) => {
    onSubmit?.(formData);
    userLogin({
      variables: {
        email: formData.email,
        password: formData.password,
      },
    }).then(({ data }) => {
      console.log("LOGIN RESPONSE::", data);
      if (data?.userLogin?.tokenId) {
        setUserEmail(formData.email);
        setTokenId(data.userLogin.tokenId);
        setAuthStep("otp");
      } else {
        toast.success(data?.userLogin?.message || "Successfully logged in");
        refreshUser?.();
        reset();
      }
    });

    if (formData.rememberMe) {
      localStorage.setItem("userEmail", formData.email);
    } else {
      localStorage.removeItem("userEmail");
    }
  };
  
  const handleGoogleSignup = async (response: any) => {
    setIsGoogleLoading(true);
    try {
      const { data } = await authWithGoogle({
        variables: { idToken: response?.credential },
      });
      
      if (data?.authwithGoogle?.status === "Success") {
        toast.success("Successfully logged in with Google");
        refreshUser?.();
        // Navigation will clear the loading state automatically
      } else {
        setIsGoogleLoading(false);
      }
    } catch (error) {
      console.error("Google login error:", error);
      setIsGoogleLoading(false);
      toast.error("Google login failed", {
        duration: 50000,
        dismissible: true,
      });
    }
  };
  
  const handleFacebookSignup = async (userID: string, accessToken: string) => {
    setIsFacebookLoading(true);
    const res = await authWithFacebook({
      variables: { userID, accessToken },
    });

    console.log("FACEBOOK LOGIN AUTH::", res);
  };
  
  const handleFbLogin = () => {
    setFacebookError(null);

    window.FB.login(
      (response: any) => {
        if (response.authResponse) {
          const { userID, accessToken } = response.authResponse;
          handleFacebookSignup(userID, accessToken);
        } else {
          setIsFacebookLoading(false);
        }
      },
      { scope: facebookScopes.join(","), return_scopes: true },
    );
  };

  useAuthSDKs(handleGoogleSignup);
  
  const isAuthing = loading || isFacebookLoading || isGoogleLoading || isOtpLoading || isResending;
  if (authStep === "otp") {
    return (
      <>
        <LoadingProgressBar isLoading={isAuthing} />
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <TwoFactorVerification
            email={userEmail}
            tokenId={tokenId}
            onSuccess={handleOtpSuccess}
            onBack={() => setAuthStep("login")}
            onResend={handleResendOtp}
            isResending={isResending}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <LoadingProgressBar isLoading={isAuthing} />
      <div className="flex w-full flex-col justify-center p-[4%] md:p-[8%]">
      <div className="w-full">
        <div className="mb-8 w-full text-start">
          <h2 className="mb-1 text-2xl font-bold">Login</h2>
          <p className="text-sm text-slate-500">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Sign up
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          {/* Email Input */}
          <Controller
            name="email"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                inputProps={inputProps}
              />
            )}
          />

          {/* Password Input */}
          <Controller
            name="password"
            control={control}
            render={(inputProps) => (
              <CustomShadcnPasswordInput
                label="Password"
                name="password"
                placeholder="Enter your password"
                inputProps={inputProps}
              />
            )}
          />

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="rememberMe"
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                    <label
                      htmlFor="rememberMe"
                      className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember me
                    </label>
                  </div>
                )}
              />
            </div>
            <Link
              to="/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Signing in</span>
              </div>
            ) : (
              "Sign in"
            )}
          </Button>

          {/* Divider */}
          <div className="flex w-full items-center py-2">
            <span className="bg-foreground/70 h-[1px] w-full" />
            <span className="mx-2 min-w-fit text-xs text-slate-500">Or</span>
            <span className="bg-foreground/70 h-[1px] w-full" />
          </div>

          {/* Social Login */}
          <div className="flex gap-3" id="google">
            <div id="google-signin-button" className="w-full"></div>

            <button
              onClick={handleFbLogin}
              disabled={isFacebookLoading}
              className="flex w-full cursor-pointer items-center justify-evenly gap-5 rounded-sm border-[1px] p-1 text-[16px] font-[500] hover:border-blue-100 hover:bg-blue-50/50"
            >
              {isFacebookLoading ? (
                <Loader className="h-4 w-4 animate-spin" size={16} />
              ) : (
                <FaFacebook color="#1877F2" size={18} />
              )}
              Sign with Facebook
            </button>
          </div>

          {facebookError && (
            <p className="mt-2 text-center text-sm text-red-500">
              {facebookError}
            </p>
          )}
        </form>
      </div>
    </div>
    </>
  );
}
