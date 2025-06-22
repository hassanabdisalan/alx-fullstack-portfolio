import { useState } from "react";
import { Controller } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { useViewer } from "@/hooks/use-viewr";
import { CustomShadcnInput } from "@/components/wrappers/forms/shadcn-inputs";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Loader } from "lucide-react";
import { BUSINESS_PROFILE_UPDATE } from "@/graphql/mutations/admin";

// Define schema for business profile update
const businessUpdateSchema = z.object({
  businessName: z.string().min(1, "Business name is required"),
  businessEmail: z
    .string()
    .email("Please enter a valid email")
    .min(1, "Business email is required"),
  businessPhone: z.string().optional(),
  businessLocation: z.string().optional(),
});

type BusinessUpdateFormData = z.infer<typeof businessUpdateSchema>;

export function UpdateBusiness() {
  const { user, refreshUser } = useViewer();
  const business = user?.business || {};

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm<BusinessUpdateFormData>({
    resolver: zodResolver(businessUpdateSchema),
    defaultValues: {
      businessName: business.name || "",
      businessEmail: business.email || "",
      businessPhone: business.phone || "",
      businessLocation: business.location || "",
    },
  });

  const [updateBusiness, { loading }] = useMutation(BUSINESS_PROFILE_UPDATE, {
    onCompleted: (data) => {
      if (data?.updateBusiness?.status === "Success") {
        refreshUser();
        toast.success(
          data.updateBusiness.message ||
            "Business profile updated successfully",
        );
      } else {
        toast.error(
          data?.updateBusiness?.message || "Failed to update business profile",
        );
      }
    },
    onError: (error) => {
      toast.error(
        error.message ||
          "An error occurred while updating your business profile",
      );
    },
  });

  const onSubmit = (data: BusinessUpdateFormData) => {
    const updateVariables: Record<string, string> = {};

    if (data.businessName !== business.name)
      updateVariables.name = data.businessName;
    if (data.businessEmail !== business.email)
      updateVariables.email = data.businessEmail;
    if (data.businessPhone !== business.phone)
      updateVariables.phone = data.businessPhone || "";
    if (data.businessLocation !== business.location)
      updateVariables.location = data.businessLocation || "";

    if (Object.keys(updateVariables).length > 0) {
      updateBusiness({ variables: updateVariables });
    } else {
      toast.info("No changes to update");
    }
  };

  return (
    <div className="flex w-full flex-col gap-8">
      <h2 className="text-foreground/90 mb-6 pl-10 text-lg font-semibold">
        Update your business profile
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Controller
            name="businessName"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="Business Name"
                name="businessName"
                placeholder="Enter your business name"
                inputProps={inputProps}
              />
            )}
          />

          <Controller
            name="businessEmail"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="Business Email"
                name="businessEmail"
                type="email"
                placeholder="Enter your business email"
                inputProps={inputProps}
              />
            )}
          />

          <Controller
            name="businessPhone"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="Business Phone"
                name="businessPhone"
                placeholder="Enter your business phone"
                inputProps={inputProps}
              />
            )}
          />

          <Controller
            name="businessLocation"
            control={control}
            render={(inputProps) => (
              <CustomShadcnInput
                label="Business Location"
                name="businessLocation"
                placeholder="Enter your business location"
                inputProps={inputProps}
              />
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={loading} className="px-8">
            Update
            {loading && <Loader className="h-4 w-4 animate-spin" />}
          </Button>
        </div>
      </form>
    </div>
  );
}
