import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LeadKanbanCard } from "../../state/types";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  GET_BUSINESS_LEADS_BY_STAGE,
  UPDATE_BUSINESS_LEAD_STAGE,
} from "@/graphql/business-leads";
import { toast } from "sonner";
import { FiEdit } from "react-icons/fi";
import { Loader } from "lucide-react";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CustomShadcnInput,
  CustomShadcnSelect,
} from "@/components/wrappers/forms/shadcn-inputs";
import { AlertError } from "@/components/wrappers/AlertError";
import { invalidateLeadsCache } from "../../utils/cache-stuff";


const editLeadSchema = z.object({
  fname: z.string().min(1, "First name is required"),
  sname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  revenue: z.coerce.number().min(0, "Revenue must be a positive number"),
  source: z.string().min(1, "Source is required")
});

type EditLeadFormData = z.infer<typeof editLeadSchema>;

interface EditBusinessLeadDialogProps {
  card: LeadKanbanCard;
  currentStageId: number;
}

export function EditBusinessLeadDialog({
  card,
  currentStageId,
}: EditBusinessLeadDialogProps) {
  const [open, setOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<string | null>(null);

  const { control, handleSubmit, formState:{isDirty,isValid,errors} } = useForm<EditLeadFormData>({
    resolver: zodResolver(editLeadSchema),
    defaultValues: {
      fname: card.Fname || "",
      sname: card.Sname || "",
      email: card.email || "",
      phone: card.phone || "",
      revenue: card.revenue || 0,
      source: card.source || "",
    },
  });

  const [updateLeadMutation, { loading }] = useMutation(
    UPDATE_BUSINESS_LEAD_STAGE,
    {
      onCompleted: (data) => {
        if (data?.updateLead?.status === "Success") {
          toast.success("Lead updated successfully");
          setOpen(false);
        } else {
          setErrorMessages(
            data?.updateLead?.message || "Failed to update lead",
          );
        }
      },
      refetchQueries(result) {
        if (result.data?.updateLead?.status === "Success") {
          return [
            {
              query: GET_BUSINESS_LEADS_BY_STAGE,
              variables: {
                stageId: card.stageId,
                first: DEFAULT_LOAD_ITEMS_COUNT,
              },
            },
            ...invalidateLeadsCache(),
          ];
        }
        return [];
      },
      onError: (error) => {
        setErrorMessages(
          error.message || "An error occurred while updating the lead",
        );
      },
    },
  );

  const onSubmit = async (formData: EditLeadFormData) => {
    setErrorMessages(null);

    if (!card.id) {
      toast.error("Lead ID is missing");
      return;
    }

    await updateLeadMutation({
      variables: {
        leadId: card.id,
        fname: formData.fname,
        sname: formData.sname,
        email: formData.email,
        phone: formData.phone,
        revenue: formData.revenue,
        source: formData.source,
        stageId: currentStageId,

      },
    });
  };



  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onPointerDown={(e) => e.stopPropagation()}
        className="flex items-center justify-center p-1"
      >
        <FiEdit />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Lead</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Update the lead information
          </DialogDescription>
        </DialogHeader>

        {errorMessages && (
          <AlertError description={errorMessages} title="Error updating lead" />
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
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
                    { label: "Manual", value: "Manual" },
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
                    }
                  }}
                />
              )}
            />
          </div>

          {/* <Controller
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
          /> */}

          <DialogFooter className="pt-4">
            <div className="flex w-full justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
                type="button"
              >
                Cancel
              </Button>
              <Button disabled={loading} type="submit">
                {loading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Lead"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
