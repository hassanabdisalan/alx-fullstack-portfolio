import { useState, useEffect } from "react";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Controller } from "react-hook-form";
import { FaFacebook } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { useMutation } from "@apollo/client";
import {
  USER_SIGNUP,
  USER_FACEBOOK_SIGNUP,
  USER_GOOGLE_SIGNUP,
} from "@/graphql/mutations/auth";
import { signupFormHook, signupSchema } from "@/helpers/auth";
import {
  CustomShadcnInput,
  CustomShadcnPasswordInput,
} from "../wrappers/forms/shadcn-inputs";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader } from "lucide-react";
import { toast } from "sonner";
import { useAuthSDKs } from "@/hooks/useAuthSDKs";
import { facebookScopes } from "@/utils/facebookScopes";
import { useViewer } from "@/hooks/use-viewr";

// Define the schema for form validation

declare const googel: any;

interface SignupFormProps {}

export function SignupForm({}: SignupFormProps) {
  // State for password visibility
  const { refreshUser } = useViewer();
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const [isFacebookLoading, setIsFacebookLoading] = useState(false);
  const [facebookError, setFacebookError] = useState<string | null>(null);
  const navigate = useNavigate();

  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = signupFormHook();

  const [authWithFacebook, { loading: facebookAuthLoading }] = useMutation(
    USER_FACEBOOK_SIGNUP,
    {
      onCompleted: (facebookAuthData) => {
        if (facebookAuthData?.authWithFacebook?.status === "Success") {
          toast.success(
            facebookAuthData?.authWithFacebook?.message ||
              "Successfully logged in with Google",
          );
          refreshUser();
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        }
      },
      onError: (error) => {
        console.error("Error Login in with google:", error);
        setFacebookError(error.message);
      },
    },
  );

  const [authWithGoogle, { loading: googleAuthLoading }] = useMutation(
    USER_GOOGLE_SIGNUP,
    {
      onCompleted: (data) => {
        if (data.authwithGoogle?.status === "Success") {
          toast.success(
            data.authwithGoogle.message || "Successfully logged in with Google",
          );
          refreshUser();
          setTimeout(() => {
            navigate("/signin");
          }, 2000);
        }
      },
      onError: (error) => {
        console.log("ERROR LOGING WITH GOOGLE", error.message);
      },
    },
  );

  const [createUser, { loading, data }] = useMutation(USER_SIGNUP, {
    onCompleted: (data) => {
      if (data?.createUser?.status === "Success") {
        toast.success(
          data.createUser.message || "Account created successfully",
        );
        reset();
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        toast.error(data?.createUser?.message || "Failed to create account", {
          duration: 50000,dismissible: true,
        });
      }
    },
    onError: (error) => {
      toast.error(error.message || "An error occurred during signup", {
        duration: 50000,dismissible: true,
      });
    },
  });

  // console.log(data?.createUser?.message,toastopen);

  const onSubmitForm = (data: z.infer<typeof signupSchema>) => {
    const { agreeToTerms, ...formData } = data;
    createUser({
      variables: {
        email: formData.email,
        password: formData.password,
        fname: formData.firstName,
        sname: formData.lastName,
        role: "Admin",
      },
    });
  };

  const handleGoogleSignup = async (response: any) => {
    console.log("GOOGLE RESPONSE:::", response.credential);
    const res = await authWithGoogle({
      variables: { idToken: response?.credential },
    });
    console.log("GOOGLE LOGIN AUTH RESPONSE::", res);
  };

  useAuthSDKs(handleGoogleSignup);

  const handleFacebookSignup = async (userID: string, accessToken: string) => {
    const res = await authWithFacebook({
      variables: { userID, accessToken },
    });
    console.log("FACEBOOK SIGNUP AUTH:::", res);
  };

  const hancleFbBtnClick = () => {
    setIsFacebookLoading(true);
    setFacebookError(null);
    try {
      window.FB.login(
        (response: any) => {
          setIsFacebookLoading(false);
          if (response.authResponse) {
            console.log("Facebook Login Success:", response);
            const { userID, accessToken } = response.authResponse;
            console.log("FACEBOOK LOGIN DETAILS:::", userID, accessToken);
            handleFacebookSignup(userID, accessToken);
          }
        },
        { scope: facebookScopes.join(",") },
      );
    } catch (error: any) {
      console.error("Facebook redirect failed:", error.message);
      setFacebookError("Failed to initiate Facebook signup");
      setIsFacebookLoading(false);
      toast.error("Facebook signup initialization failed", {
        duration: 50000,dismissible: true,
      });
    }
  };

  return (
    <div className="flex w-full flex-col justify-center p-[4%] md:p-[8%]">
      <div className="mx-auto w-full max-w-2xl">
        <div className="mb-8 w-full text-start">
          <h2 className="mb-1 text-2xl font-bold">Sign up</h2>
          <p className="text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/signin"
              className="font-medium text-blue-600 hover:text-blue-800"
            >
              Sign in
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="firstName"
              control={control}
              render={(inputProps) => (
                <CustomShadcnInput
                  label="First name"
                  name="firstName"
                  placeholder="Enter your first name"
                  inputProps={inputProps}
                />
              )}
            />
            <Controller
              name="lastName"
              control={control}
              render={(inputProps) => (
                <CustomShadcnInput
                  label="Last name"
                  name="lastName"
                  placeholder="Enter your last name"
                  inputProps={inputProps}
                />
              )}
            />
          </div>

          <Controller
            name="email"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="Email"
                name="email"
                type="email"
                placeholder="example@company.com"
                inputProps={inputProps}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={(inputProps) => (
              <CustomShadcnPasswordInput
                label="Password"
                name="password"
                placeholder="Enter secure password"
                inputProps={inputProps}
              />
            )}
          />

          <Controller
            name="confirmPassword"
            control={control}
            render={(inputProps) => (
              <CustomShadcnPasswordInput
                label="Confirm password"
                name="confirmPassword"
                placeholder="Confirm your password"
                inputProps={inputProps}
              />
            )}
          />

          <div className="flex items-start space-x-2">
            <Controller
              name="agreeToTerms"
              control={control}
              render={({ field }) => (
                <Checkbox
                  id="agreeToTerms"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mt-1"
                />
              )}
            />
            <div className="grid gap-1.5 leading-none">
              <label
                htmlFor="agreeToTerms"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                I agree to the{" "}
                <Link
                  to="/terms"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link
                  to="/privacy"
                  className="text-blue-600 underline hover:text-blue-800"
                >
                  Privacy Policy
                </Link>
              </label>
              {errors.agreeToTerms && (
                <p className="text-xs text-red-500">
                  {errors.agreeToTerms.message}
                </p>
              )}
            </div>
          </div>

          <Button className="w-full" type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader className="h-4 w-4 animate-spin" />
                <span>Creating account</span>
              </div>
            ) : (
              "Create account"
            )}
          </Button>

          <div className="flex w-full items-center py-2">
            <span className="bg-foreground/70 h-[1px] w-full" />
            <span className="mx-2 min-w-fit text-xs text-slate-500">Or</span>
            <span className="bg-foreground/70 h-[1px] w-full" />
          </div>

          {/* Social Login */}
          <div className="flex gap-3" id="google">
            <div id="google-signin-button" className="w-full"></div>

            <button
              onClick={hancleFbBtnClick}
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
  );
}
