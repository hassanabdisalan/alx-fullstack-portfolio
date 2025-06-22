import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CustomShadcnInput } from "@/components/wrappers/forms/shadcn-inputs";
import { CustomShadcnDatePicker } from "@/components/wrappers/forms/shadcn-date-range";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { CalendarEvent } from "@/components/dashboard/calender/BetterUserCalender";

// Define schema for form validation
const eventSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string(),
    start: z.date({ required_error: "Start date is required" }),
    end: z
      .date({ required_error: "End date is required" })
      .refine(
        (date) => date instanceof Date && !isNaN(date.getTime()),
        "Invalid date",
      ),
  })
  .refine((data) => data.end >= data.start, {
    message: "End date must be after start date",
    path: ["end"],
  });

type EventFormData = z.infer<typeof eventSchema>;

interface AdminCalenderEventFormProps {
  open?: boolean;
  onClose?: () => void;
  selectedDate?: Date;
  event?: CalendarEvent;
  isSaving?: boolean;
  onSave: (event: EventFormData) => any;
  isDeleting?: boolean;
  onDelete?: (eventId: string) => any;
  error?: string | null;
}

export function AdminCalenderEventForm({
  onClose,
  event,
  isSaving = false,
  onSave,
  error,
  isDeleting,
  onDelete,
}: AdminCalenderEventFormProps) {

  const defaultStart = event?.start || new Date();
  const defaultEnd = event?.end || new Date(new Date().setHours(defaultStart.getHours() + 1));

  const { control, handleSubmit, reset, watch } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: event?.title || "",
      description: event?.description || "",
      start: defaultStart,
      end: defaultEnd,
    },
  });

const onSubmit = (data: EventFormData) => {
    onSave({
      title: data.title,
      description: data.description,
      start: data.start,
      end: data.end,
    });
    reset();
  };
  const startDate = watch("start");
  const fromDataString = startDate?.toISOString();

  return (
    <div className="w-full rounded-lg">
      {error && (
        <Alert variant={"destructive"} className="mb-4">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
        <Controller
          name="title"
          control={control}
          render={(inputProps) => (
            <CustomShadcnInput
              label="Event Title"
              name="title"
              inputProps={inputProps}
              placeholder="Enter event title"
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={(inputProps) => (
            <CustomShadcnInput
              label="Event Description"
              name="description"
              inputProps={inputProps}
              placeholder="Enter event description"
              className="mt-4"
            />
          )}
        />

        <div className="mt-4 flex flex-col gap-4 sm:flex-row">
          <div className="w-full">
            <Controller
              name="start"
              control={control}
              render={(inputProps) => (
                <CustomShadcnDatePicker
                  label="Start Date"
                  name="start"
                  inputProps={inputProps}
                  placeholder="Select start date"
                  fromDate={new Date()} // Allow selecting from last month
                  toDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 1),
                    )
                  } // Allow selecting up to next year
                />
              )}
            />
          </div>
          <div className="w-full">
            <Controller
              name="end"
              control={control}
              render={(inputProps) => (
                <CustomShadcnDatePicker
                  key={fromDataString}
                  label="End Date"
                  name="end"
                  inputProps={inputProps}
                  placeholder="Select end date"
                  fromDate={startDate}
                  toDate={
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() + 2),
                    )
                  }
                />
              )}
            />
          </div>
        </div>

        <div className="mt-6 flex justify-between gap-2 items-center">
          {(event && onDelete) && (
            <Button
              variant="destructive"
              type="button"
              onClick={() => onDelete(event.id)}
              disabled={isSaving || isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete Event"}
              {isDeleting && <Loader size={24} className="ml-4 animate-spin" />}
            </Button>
          )}
        <div className="flex justify-end gap-2">
          <Button
            onClick={onClose}
            variant="outline"
            color="error"
            disabled={isSaving || isDeleting}
            type="button"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSaving || isDeleting}>
            {isSaving
              ? "Saving..."
              : event
                ? "Update Event"
                : "Add Event"}
            {isSaving && <Loader size={24} className="ml-4 animate-spin" />}
          </Button>
        </div>
        </div>
      </form>
    </div>
  );
}
