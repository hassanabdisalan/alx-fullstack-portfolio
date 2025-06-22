import { AdminCalenderEventForm } from "@/components/admin-dashboard/forms/AdminCalenderEventForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DELETE_EVENT_MUTATION, UPDATE_EVENT_MUTATION } from "@/graphql/mutations/calendar";
import { GET_USER_EVENTS_QUERY } from "@/graphql/queries/calendarQuery";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { toast } from "sonner";
import { CalendarEvent } from "../BetterUserCalender";

interface UpdateEventDialogProps {
  event: CalendarEvent;
  trigger: React.ReactNode;
}

export function UpdateEventDialog({ event, trigger }: UpdateEventDialogProps) {
  const [open, setOpen] = useState(false);
  const [updateEvent, { loading: isSaving }] = useMutation(
    UPDATE_EVENT_MUTATION,
    {
      onCompleted: (data) => {
        if (data.updateEvent?.status === "Success") {
          toast.success("Event updated successfully");
          setOpen(false);
        } else {
          toast.error("Failed to update event", {
            duration: 50000,
            dismissible: true,
          });
        }
      },
      refetchQueries: [GET_USER_EVENTS_QUERY],
      onError: (error) => {
        toast.error(`Failed to update event: ${error.message}`, {
          duration: 50000,
          dismissible: true,
        });
      },
    },
  );
  const [deleteEvent,{ loading: isDeleting }] = useMutation(DELETE_EVENT_MUTATION,{
    onCompleted: (data) => {
      if (data.deleteEvent?.status === "Success") {
        toast.success("Event deleted successfully");
        setOpen(false);
      } else {
        toast.error("Failed to delete event", {
          duration: 50000,
          dismissible: true,
        });
      }
    },
    refetchQueries: [GET_USER_EVENTS_QUERY],
    onError: (error) => {
      toast.error(`Failed to delete event: ${error.message}`, {
        duration: 50000,
        dismissible: true,
      });
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="size-full">{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-lg font-semibold">
            Update Event
          </DialogTitle>
          <DialogDescription className="sr-only">
            Update the details of your event.
          </DialogDescription>
        </DialogHeader>
        <AdminCalenderEventForm
          key={event.id}
          event={event}
          isDeleting={isDeleting}
          onDelete={() =>
            deleteEvent({
              variables: {
                eventId: parseInt(event.id),
              },
            })
          }
          isSaving={isSaving}
          onSave={(data) =>
            updateEvent({
              variables: {
                eventId: parseInt(event.id),
                description: data.description ?? "update event",
                end: data.end,
                start: data.start,
                title: data.title,
              },
            })
          }
          onClose={() => setOpen(false)}

        />
      </DialogContent>
    </Dialog>
  );
}
