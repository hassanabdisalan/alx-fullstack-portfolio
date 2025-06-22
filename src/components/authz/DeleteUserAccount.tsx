import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { useViewer } from "@/hooks/use-viewr";
import { DELETE_USER_ACCOUNT } from "@/graphql/mutations/auth";
import { Button } from "../ui/button";
import { CustomShadcnInput } from "../wrappers/forms/shadcn-inputs";
import { toast } from "sonner";
import { CURRENT_USER_QUERY } from "@/graphql/queries/user";

// Schema for email validation
const deleteAccountSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type DeleteAccountFormData = z.infer<typeof deleteAccountSchema>;

interface DeleteUserAccountProps {}

export function DeleteUserAccount({}: DeleteUserAccountProps) {
  const { user, refreshUser } = useViewer();
  const navigate = useNavigate();
  const userId = Number(user?.id!);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
  } = useForm<DeleteAccountFormData>({
    resolver: zodResolver(deleteAccountSchema),
    defaultValues: {
      email: "",
    },
  });

  const [deleteAccount, { loading }] = useMutation(DELETE_USER_ACCOUNT, {
    onCompleted: (data) => {
      if (data?.deleteUser?.status === "Success") {
        toast.success(
          data.deleteUser.message || "Account deleted successfully",
        );
        // refreshUser?.(); // Refresh user data

        // Clear auth data and redirect after a delay
        setTimeout(() => {
          navigate("/signin");
        }, 1000);
      } else {
        toast.error(data?.deleteUser?.message || "Failed to delete account", {
          duration: 50000,dismissible: true,
        });
      }
    },
    refetchQueries(response) {
      if (response.data?.deleteUser?.status === "Success") {
        return [CURRENT_USER_QUERY];
      }
      return [];
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while deleting your account", {
          duration: 50000,dismissible: true,
        }     
      );
    },
  });

  const onSubmit = (data: DeleteAccountFormData) => {
    if (!user || user.email !== data.email) {
      toast.error("Email doesn't match your account email", {
        duration: 50000,dismissible: true,
      });
      return;
    }

    deleteAccount({
      variables: {
        deleteUserId: userId,
      },
    });
  };

  const emailValue = watch("email");
  const isEmailValid = user && emailValue === user.email && !errors.email;

  return (
    <div className="flex w-full flex-col">
      <div className="mb-6 w-full">
        <h2 className="text-lg font-semibold">Delete Account</h2>
        <p className="text-muted-foreground text-sm">
          Once you delete your account and account data, there is not going back
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl space-y-4">
        <Controller
          name="email"
          control={control}
          render={(inputProps) => (
            <CustomShadcnInput
              name={"email"}
              label="DELETE YOUR ACCOUNT AND ACCOUNT DATA"
              type="email"
              placeholder="Confirm Email"
              inputProps={inputProps}
            />
          )}
        />

        <Button
          type={"submit"}
          variant={"destructive"}
          className="text-background w-[188px]"
          disabled={loading || !isEmailValid}
        >
          {loading ? "DELETING..." : "DELETE"}
        </Button>
      </form>
    </div>
  );
}
