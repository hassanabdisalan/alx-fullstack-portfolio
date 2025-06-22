import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { useViewer } from "@/hooks/use-viewr";
import { Button } from "@/components/ui/button";
import { FiAlertCircle } from "react-icons/fi";
import { FaCheckCircle } from "react-icons/fa";
import { CHANGE_PASSWORD } from "@/graphql/mutations/auth";
import { toast } from "sonner";
import { CustomShadcnPasswordInput } from "../wrappers/forms/shadcn-inputs";
import { Separator } from "@/components/ui/separator";
import { Loader } from "lucide-react";
import { valuesCannotBeEmpty } from "@/utils/nullable";

// Password validation schema
const passwordChangeSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .refine((val) => /[0-9]/.test(val), {
        message: "Password must contain at least one number",
      })
      .refine((val) => /[^A-Za-z0-9]/.test(val), {
        message: "Password must contain at least one special character",
      }),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordChangeFormData = z.infer<typeof passwordChangeSchema>;

export function ChangeUserPassword() {
  const { refreshUser } = useViewer();
  const [showPasswords, setShowPasswords] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    reset,
  } = useForm<PasswordChangeFormData>({
    resolver: zodResolver(passwordChangeSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    mode: "onChange",
  });

  const [updatePasswordMutation, { loading }] = useMutation(CHANGE_PASSWORD, {
    onCompleted: (data) => {
      if (data?.updatePassword?.status === "Success") {
        toast.success(
          data.updatePassword.message || "Password changed successfully",
        );
        reset();
        refreshUser();
      } else {
        toast.error(
          data?.updatePassword?.message || "Failed to change password",
          {
            duration: 50000,
            dismissible: true,
          },
        );
      }
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while changing your password",
        {
          duration: 50000,
          dismissible: true,
        },
      );
    },
  });

  const onSubmit = (data: PasswordChangeFormData) => {
    updatePasswordMutation({
      variables: {
        oldPassword: data.currentPassword,
        newPassword: data.newPassword,
      },
    });
  };

  const togglePasswordVisibility = () => {
    setShowPasswords(!showPasswords);
  };

  // Watch form values for validation feedback
  const newPassword = watch("newPassword");
  const confirmPassword = watch("confirmPassword");
  // const hasNumber = /[0-9]/.test(newPassword || "");

  const [hasNumber, setHasNumber] = useState(/[0-9]/.test(newPassword || ""));
  const [hasSpecialChar, setHasSpecialChar] = useState(
    /[^A-Za-z0-9]/.test(newPassword || ""),
  );
  useEffect(() => {
    setHasNumber(/[0-9]/.test(newPassword || ""));
    setHasSpecialChar(/[^A-Za-z0-9]/.test(newPassword || ""));
  }, [newPassword]);

  // Password validation checks
  const hasMinLength = newPassword?.length >= 8;
  // const hasSpecialChar = /[^A-Za-z0-9]/.test(newPassword || "");
  const passwordMatch =
    valuesCannotBeEmpty(newPassword, confirmPassword) &&
    newPassword === confirmPassword;

  return (
    <div className="h-full w-full">
      <div className="my-10 flex items-center justify-between">
        <h1 className="text-[28px]">Change Password</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="flex w-full flex-col justify-evenly gap-8 md:flex-row">
          <div className="flex h-full w-full flex-col gap-4 md:w-3/5">
            <Controller
              name="currentPassword"
              control={control}
              render={({ field, fieldState, formState }) => (
                <CustomShadcnPasswordInput
                  label="Previous Password"
                  name="currentPassword"
                  inputProps={{ field, fieldState, formState }}
                  placeholder="Enter your current password"
                  autoComplete="current-password"
                  // showPassword={showPasswords}
                />
              )}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState, formState }) => (
                <CustomShadcnPasswordInput
                  label="New Password"
                  name="newPassword"
                  inputProps={{ field, fieldState, formState }}
                  placeholder="Enter your new password"
                  autoComplete="new-password"
                  // showPassword={showPasswords}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field, fieldState, formState }) => (
                <CustomShadcnPasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  inputProps={{ field, fieldState, formState }}
                  placeholder="Confirm your new password"
                  autoComplete="new-password"
                  // showPassword={showPasswords}
                />
              )}
            />
          </div>

          <div className="bg-muted/20 flex h-full w-full flex-col rounded-lg p-6 md:w-2/5">
            <h3 className="text-foreground mb-6 text-lg font-semibold">
              Password Requirements
            </h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                {hasMinLength ? (
                  <FaCheckCircle className="text-primary mr-2 size-5" />
                ) : (
                  <FiAlertCircle className="text-muted-foreground mr-2 size-5" />
                )}
                <span
                  className={
                    hasMinLength
                      ? "text-foreground text-sm"
                      : "text-muted-foreground text-sm"
                  }
                >
                  At least 8 characters
                </span>
              </li>

              <li className="flex items-center">
                {hasNumber ? (
                  <FaCheckCircle className="text-primary mr-2 size-5" />
                ) : (
                  <FiAlertCircle className="text-muted-foreground mr-2 size-5" />
                )}
                <span
                  className={
                    hasNumber
                      ? "text-foreground text-sm"
                      : "text-muted-foreground text-sm"
                  }
                >
                  Contains at least one number
                </span>
              </li>

              <li className="flex items-center">
                {hasSpecialChar ? (
                  <FaCheckCircle className="text-primary mr-2 size-5" />
                ) : (
                  <FiAlertCircle className="text-muted-foreground mr-2 size-5" />
                )}
                <span
                  className={
                    hasSpecialChar
                      ? "text-foreground text-sm"
                      : "text-muted-foreground text-sm"
                  }
                >
                  Contains at least one symbol
                </span>
              </li>

              <li className="flex items-center">
                {passwordMatch ? (
                  <FaCheckCircle className="text-primary mr-2 size-5" />
                ) : (
                  <FiAlertCircle className="text-muted-foreground mr-2 size-5" />
                )}
                <span
                  className={
                    passwordMatch
                      ? "text-foreground text-sm"
                      : "text-muted-foreground text-sm"
                  }
                >
                  Passwords match
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="pt-4">
          <Button
            type="submit"
            disabled={loading || !isValid}
            className="flex items-center gap-2"
          >
            Update Password
            {loading && <Loader className="size-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
