import { AdminCalenderEventForm } from "@/components/admin-dashboard/forms/AdminCalenderEventForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ADD_NEW_EVENT_MUTATION } from "@/graphql/mutations/calendar";
import { GET_USER_EVENTS_QUERY } from "@/graphql/queries/calendarQuery";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { LuCalendarPlus } from "react-icons/lu";
import { toast } from "sonner";

interface AddEventDialogProps {}

export function AddEventDialog({}: AddEventDialogProps) {
  const [open,setOpen]= useState(false);
  const [addNewEvent, { loading: isMutating }] = useMutation(
    ADD_NEW_EVENT_MUTATION,
    {
      onCompleted: (data) => {
        if(data.addEvent?.status === "Success") {
          toast.success("Event added successfully");
          setOpen(false);
        }
        else {
          toast.error("Failed to add event", {
            duration: 50000,
            dismissible: true,
  
          });
        }
      },
      refetchQueries: [GET_USER_EVENTS_QUERY],
      onError: (error) => {
        toast.error(`Failed to add event: ${error.message}`, {
          duration: 50000,
          dismissible: true,

        });
      },
    },
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          // disabled={loading || eventsLoading}
          // onClick={onNewEventClick}
          className="border-muted-foreground text-foreground hover:bg-background/90 border-2"
        >
          <LuCalendarPlus  />
          New Event
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-4 text-lg font-semibold">
            New Event
          </DialogTitle>
          <DialogDescription className="sr-only">
            Create a new event for the selected date.
          </DialogDescription>
        </DialogHeader>
        <AdminCalenderEventForm
        isSaving={isMutating}
          onSave={(data) =>
            addNewEvent({
              variables: {
                description: data.description ?? "new evnt added ",
                end: data.end,
                start: data.start,
                title: data.title,
              },
            })
          }
        /> 
      </DialogContent>
    </Dialog>
  );
}
