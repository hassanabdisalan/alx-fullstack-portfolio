import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { PASSWORD_RESET_REQUEST } from "@/graphql/mutations/auth";
import { FlowbizIcon } from "@/components/branding/FlowbizIcon";
import { PasswordResetSuccess } from "@/components/auth/PasswordResetSuccess";
import { CustomShadcnInput } from "@/components/wrappers/forms/shadcn-inputs";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader } from "lucide-react";

const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordPage() {
  const [requestSent, setRequestSent] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordResetRequest, { loading }] = useMutation(
    PASSWORD_RESET_REQUEST,
  );

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      setErrorMessage("");
      const response = await passwordResetRequest({
        variables: { email: data.email },
      });
      if (response.data?.passwordResetRequest?.status === "Success") {
        setRequestSent(true);
      } else {
        setErrorMessage(
          response.data?.passwordResetRequest?.message ||
            "Failed to send reset instructions",
        );
      }
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred while processing your request");
      }
    }
  };

  if (requestSent) {
    return <PasswordResetSuccess email={getValues("email")} />;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gradient-to-br from-slate-50 to-slate-200 px-4">
      <div className="flex justify-center">
        <FlowbizIcon />
      </div>
      <div className="w-full max-w-md">
        <div className="bg-background space-y-6 rounded-xl p-8 shadow-lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800">
              Forgot Password?
            </h2>
            <p className="mt-2 text-slate-600">
              Enter your email and we'll send you a link to reset your password
            </p>
          </div>

          {errorMessage && (
            <Alert variant="destructive">
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="email"
              control={control}
              render={(inputProps) => (
                <CustomShadcnInput
                  label="Email address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  inputProps={inputProps}
                />
              )}
            />

            <Button
              type="submit"
              className="h-11 w-full font-medium"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader className="h-4 w-4 animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </Button>
          </form>

          <div className="flex justify-center">
            <Button
              asChild
              variant="ghost"
              className="flex items-center gap-2 text-blue-600 hover:bg-blue-50/50 hover:text-blue-800"
            >
              <Link to="/signin">
                <FiArrowLeft className="h-4 w-4" />
                Back to login
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
