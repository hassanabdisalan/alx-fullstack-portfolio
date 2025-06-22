import { useMutation } from "@apollo/client";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomShadcnInput } from "@/components/wrappers/forms/shadcn-inputs";
import { CREATE_BUSINESS } from "@/graphql/mutations/admin";
import { useViewer } from "@/hooks/use-viewr";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const businessSchema = z.object({
  name: z.string().min(1, "Business name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(1, "Phone number is required"),
  location: z.string().min(1, "Business location is required"),
});

type BusinessFormData = z.infer<typeof businessSchema>;

interface CreateBusinessFormProps {}

export function CreateBusinessForm({}: CreateBusinessFormProps) {
  const { refreshUser } = useViewer();
  const { control, handleSubmit, reset } = useForm<BusinessFormData>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
    },
  });

  const [createBusiness, { loading }] = useMutation(CREATE_BUSINESS, {
    onCompleted: (data) => {
      if (data?.createBusiness?.status === "Success") {
        toast.success("Business created successfully");
        refreshUser();
        reset();
      } else {
        toast.error("Failed to create business", {
          duration: 50000,dismissible: true,
        });
      }
    },
    onError: (error) => {
      console.error("Error creating business:", error);
      toast.error("An error occurred while creating the business", {
        duration: 50000,dismissible: true,
      });
    },
  });

  const onSubmit = (data: BusinessFormData) => {
    createBusiness({
      variables: {
        ...data,
      },
    });
  };

  return (
    <div className="bg-background min-w-md p-4">
      <h3 className="mb-6 text-2xl font-medium">Setup Your Business</h3>

      <form
        data-test="business-form"
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3"
      >
        <Controller
          name="name"
          control={control}
          render={(inputProps) => (
            <CustomShadcnInput
              inputProps={inputProps}
              name="name"
              label="Business Name"
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={(inputProps) => (
            <CustomShadcnInput
              inputProps={inputProps}
              name="email"
              label="Business Email"
              type="email"
            />
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={(inputProps) => (
            <CustomShadcnInput
              inputProps={inputProps}
              name="phone"
              label="Business Phone Number"
              type="tel"
            />
          )}
        />

        <Controller
          name="location"
          control={control}
          render={(inputProps) => (
            <CustomShadcnInput
              inputProps={inputProps}
              name="location"
              label="Business Location"
            />
          )}
        />

        <div className="pt-4">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </form>
    </div>
  );
}
