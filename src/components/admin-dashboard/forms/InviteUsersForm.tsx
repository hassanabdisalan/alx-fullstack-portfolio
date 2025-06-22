import { useState } from "react";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { RolesSelect } from "@/components/authz/RolesSelect";
import { INVITE_USER } from "@/graphql/mutations/admin";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CustomShadcnInput } from "@/components/wrappers/forms/shadcn-inputs";

// Define GraphQL mutation for inviting users

// Define schema for email validation
const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type InviteFormData = z.infer<typeof inviteSchema>;

interface InviteUsersFormProps {}

export function InviteUsersForm({}: InviteUsersFormProps) {
  const [role, setRole] = useState("Admin");

  const { control, handleSubmit, reset } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      email: "",
    },
  });

  const [inviteUser, { loading }] = useMutation(INVITE_USER, {
    onCompleted: (data) => {
      if (data?.inviteUser?.status === "Success") {
        toast.success("Invitation sent successfully!");
        reset();
      } else {
        toast.error(data?.inviteUser?.message || "Failed to send invitation", {
          duration: 50000,
          dismissible: true,
        });
      }
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while sending invitation",
        {
          duration: 50000,
          dismissible: true,
        },
      );
    },
  });

  const onSubmit = (data: InviteFormData) => {
    inviteUser({
      variables: {
        email: data.email,
        role: role,
      },
    });
  };

  return (
    <div className="w-full">

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Controller
          name="email"
          control={control}
          render={(inputProps) => (
            <CustomShadcnInput
              inputProps={inputProps}
              name="email"
              label="Email Address"
            />
          )}
        />

        <RolesSelect value={role} setValue={setRole} />

        <div className="pt-4">
          <Button
            className="w-full"
            type="submit"
            color="primary"
            disabled={loading}
          >
            {loading ? "Sending Invite..." : "Invite"}
          </Button>
        </div>
      </form>
    </div>
  );
}
