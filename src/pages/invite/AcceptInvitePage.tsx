import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import {
  COMPLETE_INVITE,
  VALIDATE_INVITE_TOKEN,
} from "@/graphql/mutations/admin";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FlowbizIcon } from "@/components/branding/FlowbizIcon";
import {
  CustomShadcnInput,
  CustomShadcnPasswordInput,
} from "@/components/wrappers/forms/shadcn-inputs";
import { Button } from "@/components/ui/button";

const acceptInviteSchema = z
  .object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    phone: z.string().min(1, "Phone number is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type AcceptInviteFormData = z.infer<typeof acceptInviteSchema>;

export function AcceptInvitePage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [tokenStatus, setTokenStatus] = useState<
    "loading" | "valid" | "invalid"
  >("loading");
  const navigate = useNavigate();
  const [validateinviteToken] = useMutation(VALIDATE_INVITE_TOKEN, {
    onCompleted: (data) => {
      if (data?.validateInvite?.valid) {
        setTokenStatus("valid");
      } else {
        setTokenStatus("invalid");
      }
    },
    onError: () => {
      setTokenStatus("invalid");
    },
  });

  useEffect(() => {
    if (token) {
      validateinviteToken({
        variables: {
          token,
        },
      });
    } else {
      setTokenStatus("invalid");
    }
  }, [token]);

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<AcceptInviteFormData>({
    resolver: zodResolver(acceptInviteSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [acceptInvite, { loading, error }] = useMutation(COMPLETE_INVITE, {
    onCompleted: () => {
      navigate("/login");
    },
  });

  const onSubmit = async (data: AcceptInviteFormData) => {
    if (!token) return;
    await acceptInvite({
      variables: {
        token,
        fname: data.firstName,
        sname: data.lastName,
        phone: data.phone,
        password: data.password,
      },
    });
  };
  if (tokenStatus === "invalid") {
    return (
      <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
        <div className="p-4">
          <FlowbizIcon />
        </div>
        <div className="bg-background w-full max-w-md rounded-lg p-6 shadow-sm dark:bg-foreground/80">
          <h2 className="mb-2 text-center text-xl font-bold">Accept Invite</h2>
          <div>
            <p className="mb-6 text-center text-sm text-muted-foreground/70 dark:text-muted-foreground/90">
              Invalid or expired token. Please check your email for the correct
              link.
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (tokenStatus === "loading") {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background px-4 py-12 ">
        <div className="p-4">
          <FlowbizIcon />
        </div>
        <div className="bg-background w-full max-w-md rounded-lg p-6 shadow-sm ">
          <h2 className="mb-2 text-center text-xl font-bold">Accept Invite</h2>
          <div>
            <p className="mb-6 text-center text-sm bg-muted">
              Loading...
            </p>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="bg-background flex min-h-screen w-full flex-col items-center justify-center px-4 py-12">
      <div className="p-4">
        <FlowbizIcon />
      </div>
      <div className="bg-background w-full max-w-md rounded-lg border border-muted-foreground p-6 shadow-sm dark:border-foreground/10 dark:bg-foreground/90">
        <h2 className="mb-2 text-center text-xl font-bold">Accept Invite</h2>

        <p className="mb-6 text-center text-sm text-muted-foreground">
          Please add your personal details
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Controller
                name="firstName"
                control={control}
                render={(inputProps) => (
                  <CustomShadcnInput
                    label="First Name"
                    name="firstName"
                    inputProps={inputProps}
                    placeholder="First name"
                  />
                )}
              />
            </div>
            <div>
              <Controller
                name="lastName"
                control={control}
                render={(inputProps) => (
                  <CustomShadcnInput
                    label="Last Name"
                    name="lastName"
                    inputProps={inputProps}
                    placeholder="Last name"
                  />
                )}
              />
            </div>
          </div>

          <Controller
            name="phone"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="Phone"
                name="phone"
                inputProps={inputProps}
                placeholder="Phone number (optional)"
                type="tel"
              />
            )}
          />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Controller
              name="password"
              control={control}
              render={(inputProps) => (
                <CustomShadcnPasswordInput
                  label="Password"
                  name="password"
                  inputProps={inputProps}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={(inputProps) => (
                <CustomShadcnPasswordInput
                  label="Confirm Password"
                  name="confirmPassword"
                  inputProps={inputProps}
                />
              )}
            />
          </div>

          {error && (
            <span className="text-center text-sm text-error-content">
              {error.message}
            </span>
          )}

          <Button
            type="submit"
            disabled={isSubmitting || loading}
            className="mt-6 w-full py-2"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
