import { Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { USER_PROFILE_UPDATE } from "@/graphql/mutations/auth";
import { useViewer } from "@/hooks/use-viewr";
import { ProfileUpdateFormData, updateProfileFormHopok } from "@/helpers/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CustomShadcnInput } from "@/components/wrappers/forms/shadcn-inputs";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { CURRENT_USER_QUERY } from "@/graphql/queries/user";
import { UpdateuserImage } from "./UpdateuserImage";

interface UpdateUserProfileProps {}

export function UpdateUserProfile({}: UpdateUserProfileProps) {
  const { user } = useViewer();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid,isDirty },
  } = updateProfileFormHopok({
    Fname: user?.Fname || "",
    Sname: user?.Sname || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });


  const [updateUserProfile, { loading }] = useMutation(
    USER_PROFILE_UPDATE,
    {
      onCompleted: (data) => {
        if (data?.updateUserProfile?.status === "Success") {
          // refreshUser();
          toast.success(
            data.updateUserProfile.message || "Profile updated successfully",
          );
        } else {
          toast.error(
            data?.updateUserProfile?.message || "Failed to update profile",
            {
              duration: 50000,
              dismissible: true,
            },
          );
        }
      },
      refetchQueries(response) {
        if (response.data?.updateUserProfile?.status === "Success") {
          return [CURRENT_USER_QUERY];
        }
        return [];
      },
      onError: (error) => {
        toast.error(
          error.message || "An error occurred while updating your profile",
          {
            duration: 50000,
            dismissible: true,
          },
        );
      },
    },
  );
  
  const handleProfileUpdate = (formData: ProfileUpdateFormData) => {
    const updateVariables: Record<string, string> = {};

    if (formData.firstName !== user?.Fname)
      updateVariables.fname = formData.firstName;
    if (formData.lastName !== user?.Sname)
      updateVariables.sname = formData.lastName;
    if (formData.email !== user?.email) updateVariables.email = formData.email;
    if (formData.phone !== user?.phone && formData.phone)
      updateVariables.phone = formData.phone;
    if (formData.password) updateVariables.password = formData.password;
    
    if (Object.keys(updateVariables).length > 0) {
      updateUserProfile({ variables: updateVariables });
    } else {
      toast.info("No changes to update");
    }
  };


  const isFormValid = isValid;
  const avatarPreview = user?.image

  return (
    <div className="mx-auto w-full rounded-lg">
      <h2 className="text-foreground/80 mb-6 text-lg font-semibold">
        Update Your Profile
      </h2>

        <div  className="mb-4 flex items-center gap-4">
          <div className="flex h-full flex-col gap-2">
            <span className="text-muted-foreground text-xs font-medium">
              PROFILE PHOTO
            </span>
            <div className="mb-6 flex items-center justify-center gap-10">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={avatarPreview || undefined}
                    alt={user?.Fname || "Profile"}
                  />
                  <AvatarFallback className="bg-background text-foreground/80">
                    {user?.Fname?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <UpdateuserImage />
            </div>
          </div>
        </div>
      <form
        onSubmit={handleSubmit(handleProfileUpdate)}
        className="w-full space-y-6"

      >

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Controller
            name="firstName"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="First Name"
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
                label="Last Name"
                name="lastName"
                placeholder="Enter your last name"
                inputProps={inputProps}
              />
            )}
          />

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

          <Controller
            name="phone"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="Phone"
                name="phone"
                placeholder="Enter your phone number"
                inputProps={inputProps}
              />
            )}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <Button
            type="submit"
            disabled={loading || !isFormValid || !isDirty}
            className="px-8"
          >
            Update
            {loading && <Loader className="h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
