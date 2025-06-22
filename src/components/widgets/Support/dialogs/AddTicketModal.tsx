import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@apollo/client";
import { Loader2 } from "lucide-react";

import { toast } from "sonner";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { CustomShadcnInput } from "@/components/wrappers/forms/shadcn-inputs";

import { invalidateTicketQueries } from "../utils/tickets-cache";
import { CREATE_TICKET } from "@/graphql/tickets";

interface AddTicketModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  currentPage: number;
}

const ticketSchema = z.object({
  title: z.string().min(1, "Title is required"),
  type: z.string().min(1, "Ticket type is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  description: z.string().min(1, "Description is required"),
  platform: z.string().min(1, "Platform is required"),
});

type TicketFormValues = z.infer<typeof ticketSchema>;

export function AddTicketModal({
  open,
  onClose,
  onSuccess,
  currentPage,
}: AddTicketModalProps) {
  const [createTicket, { loading }] = useMutation(CREATE_TICKET, {
    refetchQueries: invalidateTicketQueries(currentPage),
    onCompleted(data) {
      if (data?.createTicket?.status === "Success") {
        toast.success(
          data.createTicket.message || "Ticket created successfully",
        );
        onClose();
        onSuccess?.();
      } else {
        toast.error(data?.createTicket?.message || "Failed to create ticket", {
          duration: 50000,
          dismissible: true,
        });
      }
    },
    onError(error) {
      console.error("Error creating ticket:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again.",
        {
          duration: 50000,
          dismissible: true,
        },
      );
    },
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TicketFormValues>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      title: "",
      type: "",
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      description: "",
      platform: "Website",
    },
  });

  const onSubmit = async (values: TicketFormValues) => {
    try {
      const { data } = await createTicket({
        variables: {
          description: values.description,
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          platform: values.platform,
          ticketType: values.type,
        },
      });

      if (!data) {
        throw new Error("No response received from server");
      }

      const response = data.createTicket;
      if (response?.status === "Error") {
        throw new Error(
          response.message || "An unexpected error occurred. Please try again.",
        );
      }

      toast.success(response?.message || "Ticket created successfully");
      onClose();
      onSuccess?.();
      reset();
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error(
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.",
        {
          duration: 50000,
          dismissible: true,
        },
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-[650px]">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-xl font-semibold">
            Create New Support Ticket
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full space-y-6 py-2"
        >
          {/* Ticket Title & Type */}
          <div className="grid grid-cols-2 gap-6">
            <Controller
              name="title"
              control={control}
              render={(inputProps) => (
                <CustomShadcnInput
                  label="Ticket Title"
                  name="title"
                  placeholder="Brief summary of the issue"
                  required
                  inputProps={inputProps}
                />
              )}
            />

            <div className="space-y-2">
              <div className="flex items-baseline justify-between">
                <label className="text-sm font-medium">
                  Ticket Type <span className="text-red-500">*</span>
                </label>
              </div>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <div>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="h-10 w-full">
                        <SelectValue placeholder="Select Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technical">Technical</SelectItem>
                        <SelectItem value="Payments">Payments</SelectItem>
                        <SelectItem value="Inquiries">Inquiries</SelectItem>
                        <SelectItem value="Complaints">Complaints</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.type.message}
                      </p>
                    )}
                  </div>
                )}
              />
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Contact Information</h3>
            <div className="grid grid-cols-2 gap-6">
              <Controller
                name="firstName"
                control={control}
                render={(inputProps) => (
                  <CustomShadcnInput
                    label="First Name"
                    name="firstName"
                    required
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
                    required
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
                    required
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
                    type="tel"
                    required
                    inputProps={inputProps}
                  />
                )}
              />
            </div>
          </div>

          {/* Platform */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium">
                Platform <span className="text-red-500">*</span>
              </label>
            </div>
            <Controller
              name="platform"
              control={control}
              render={({ field }) => (
                <div>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="h-10 w-full">
                      <SelectValue placeholder="Select platform" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Website">Website</SelectItem>
                      <SelectItem value="Emails">Emails</SelectItem>
                      <SelectItem value="Social Media">Social Media</SelectItem>
                      <SelectItem value="Events">Events</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.platform && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.platform.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Ticket Description */}
          <div className="space-y-2">
            <div className="flex items-baseline justify-between">
              <label className="text-sm font-medium">
                Description <span className="text-red-500">*</span>
              </label>
            </div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <textarea
                    {...field}
                    rows={5}
                    className="border-input bg-background ring-offset-background focus-visible:ring-ring min-h-[120px] w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:outline-none"
                    placeholder="Please describe your issue in detail..."
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="h-10 px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 h-10 px-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Ticket"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
