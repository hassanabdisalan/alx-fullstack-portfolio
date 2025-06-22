import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomShadcnInput,
  CustomShadcnSelect,
} from "@/components/wrappers/forms/shadcn-inputs";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { Loader, Plus } from "lucide-react";
import { AlertError } from "@/components/wrappers/AlertError";
import { useViewer } from "@/hooks/use-viewr";
import { ADD_BUSINESS_LEAD, GET_BUSINESS_LEADS_BY_STAGE } from "@/graphql/business-leads";
import { ImportLeadsDialog } from "../ImportLeadsDialog";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";
import { invalidateLeadsCache } from "../../utils/cache-stuff";

interface AddBusinassLeadProps {
  stageId?: number;
  onSuccess?: () => void;
}

const leadFormSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  sname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  source: z.string().min(1, "Source is required"),
  revenue: z.coerce.number().min(0, "Revenue must be a positive number"),
  priority: z.enum(["Low", "Medium", "High"]),
});

export type LeadFormData = z.infer<typeof leadFormSchema>;

export function AddBusinassLead({
  stageId = 1,
  onSuccess,
}: AddBusinassLeadProps) {

  const [open, setOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string | null>(null);
const { control, handleSubmit, reset } = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    defaultValues: {
      fname: "",
      sname: "",
      email: "",
      phone: "",
      source: "Manual",
      revenue: 0,
      priority: "Medium",
    },
  });

  const [addLeadMutation, { loading }] = useMutation(ADD_BUSINESS_LEAD, {
    onCompleted: (data) => {
      if (data?.addLead?.status === "Success") {
        toast.success("Lead added successfully");
        reset();
        setOpen(false);
        if (onSuccess) onSuccess();
      } else {
        setErrorMessages(data?.addLead?.message || "Failed to add lead");
      }
    },
    update: (cache, { data }) => {
      if (data?.addLead?.status === "Success" && data.addLead.lead) {
        const newLead = data.addLead.lead;
        const oldLeads = cache.readQuery({
          query: GET_BUSINESS_LEADS_BY_STAGE,
          variables: {
            stageId: stageId,
            first: DEFAULT_LOAD_ITEMS_COUNT,
          },
        });

        if (oldLeads && oldLeads.getBusinessLeadsByStage?.leads) {
          cache.writeQuery({
            query: GET_BUSINESS_LEADS_BY_STAGE,
            variables: {
              stageId: stageId,
              first: DEFAULT_LOAD_ITEMS_COUNT,
            },
            data: {
              getBusinessLeadsByStage: {
                ...oldLeads.getBusinessLeadsByStage,
                leads: [...oldLeads.getBusinessLeadsByStage.leads, newLead],
              },
            },
          });
        }
      }
    },
    refetchQueries(result) {
      if (result.data?.addLead?.status === "Success") {
        return [
          ...invalidateLeadsCache(),
        ];
      }
      return [];
    },

    onError: (error) => {
      setErrorMessages(
        error.message || "An error occurred while adding the lead",
      );
    },
  });

  const onSubmit = async (formData: LeadFormData) => {
    setErrorMessages(null);
    try {
      await addLeadMutation({
        variables: {
          fname: formData.fname,
          sname: formData.sname,
          email: formData.email,
          phone: formData.phone,
          priority: formData.priority,
          revenue: formData.revenue,
          source: formData.source,
          stageId: stageId,
        },
      });
    } catch (error) {
      console.error("Error adding lead:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="mr-4 flex items-center justify-between">
            <DialogTitle className="text-base">Add New Lead</DialogTitle>
            <ImportLeadsDialog />
          </div>
          <DialogDescription className="sr-only">
            Create a new lead with the information below.
          </DialogDescription>
        </DialogHeader>
        {errorMessages && (
          <AlertError description={errorMessages} title="Error adding lead" />
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Controller
              name="fname"
              control={control}
              render={(inputProps) => (
                <CustomShadcnInput
                  label="First Name"
                  name="fname"
                  inputProps={inputProps}
                  placeholder="Enter first name"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      inputProps.field.onChange(inputProps.field.value + " ");
                    }
                  }}
                />
              )}
            />

            <Controller
              name="sname"
              control={control}
              render={(inputProps) => (
                <CustomShadcnInput
                  label="Last Name"
                  name="sname"
                  inputProps={inputProps}
                  placeholder="Enter last name"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      inputProps.field.onChange(inputProps.field.value + " ");
                    }
                  }}
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
                  inputProps={inputProps}
                  placeholder="email@example.com"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      inputProps.field.onChange(inputProps.field.value + " ");
                    }
                  }}
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
                  inputProps={inputProps}
                  placeholder="+1 234 567 8901"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      inputProps.field.onChange(inputProps.field.value + " ");
                    }
                  }}
                />
              )}
            />

            <Controller
              name="source"
              control={control}
              render={(inputProps) => (
                <CustomShadcnSelect
                  label="Source"
                  name="source"
                  inputProps={inputProps}
                  options={[
                    { label: "Website", value: "Website" },
                    { label: "Referral", value: "Referral" },
                    { label: "Social Media", value: "Social Media" },
                    { label: "Event", value: "Event" },
                    { label: "Cold Call", value: "Cold Call" },
                  ]}
                  placeholder="Select source"
                />
              )}
            />

            <Controller
              name="revenue"
              control={control}
              render={(inputProps) => (
                <CustomShadcnInput
                  label="Expected Revenue"
                  name="revenue"
                  // @ts-expect-error
                  inputProps={inputProps}
                  placeholder="0.00"
                  type="number"
                  onKeyDown={(e) => {
                    if (e.key === " ") {
                      e.stopPropagation();
                      e.preventDefault();
                      inputProps.field.onChange(inputProps.field.value + " ");
                    }
                  }}
                />
              )}
            />
          </div>

          <div className="w-full">
            <Controller
              name="priority"
              control={control}
              render={(inputProps) => (
                <CustomShadcnSelect
                  label="Priority"
                  name="priority"
                  inputProps={inputProps}
                  options={[
                    { label: "Low", value: "Low" },
                    { label: "Medium", value: "Medium" },
                    { label: "High", value: "High" },
                  ]}
                  placeholder="Select priority"
                />
              )}
            />
          </div>

          <DialogFooter className="pt-4">
            <div className="flex w-full justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Adding...
                  </>
                ) : (
                  "Add Lead"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
