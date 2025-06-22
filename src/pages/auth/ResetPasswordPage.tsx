import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useMutation } from "@apollo/client";
import { PASSWORD_RESET_CONFIRM } from "@/graphql/mutations/auth";
import { motion } from "framer-motion";
import { FlowbizIcon } from "@/components/branding/FlowbizIcon";
import { CustomShadcnPasswordInput } from "@/components/wrappers/forms/shadcn-inputs";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { toast } from "sonner";

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const [resetPassword, { loading }] = useMutation(PASSWORD_RESET_CONFIRM);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    if (!token) {
      toast.error("Invalid or missing reset token", {
        duration: 50000,dismissible: true,
      });
      return;
    }

    try {
      const response = await resetPassword({
        variables: {
          newPassword: data.newPassword,
          token,
        },
      });

      const status = response.data?.passwordReset?.status;
      //const message = response.data?.passwordReset?.message;

      if (status === "Success") {
        toast.success("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/signin"), 2000);
      } else {
        toast.error("Password reset failed. Please try again.", {
          duration: 50000,dismissible: true,
        });
      }
    } catch (error) {
      toast.error("Password reset failed. Please try again.", {
        duration: 50000,dismissible: true,
      });
      console.error("Reset Error:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex max-h-screen flex-col items-center justify-center  px-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-background space-y-6 rounded-xl p-8 shadow-lg"
        >
          <div className="flex justify-center">
            <FlowbizIcon />
          </div>

          <span className="text-2xl font-bold">Create new Password</span>
          <div className="mb-4 text-center leading-[27px] tracking-[-0.01em] text-muted">
            Please create your new password, don't use your old password
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Controller
                name="newPassword"
                control={control}
                render={(inputProps) => (
                  <CustomShadcnPasswordInput
                    inputProps={inputProps}
                    name="newPassword"
                    label="New Password"
                    placeholder="New Password"
                  />
                )}
              />
            </div>

            <div>
              <Controller
                name="confirmPassword"
                control={control}
                render={(inputProps) => (
                  <CustomShadcnPasswordInput
                    inputProps={inputProps}
                    name="confirmPassword"
                    label="Confirm Password"
                    placeholder="Confirm Password"
                  />
                )}
              />
            </div>

            <Button className="w-full" type="submit">
              {loading ? (
                <Loader size={24} className="animate-spin" />
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          <Link to="/signin" className="">
            <Button className="flex w-full justify-center gap-2">
              <FiArrowLeft /> Back to Login
            </Button>
          </Link>
        </motion.div>
      </div>
      <span className="mt-4 text-sm text-muted">
        Need help? <Link to="/support">Contact support</Link>
      </span>
    </motion.div>
  );
}
