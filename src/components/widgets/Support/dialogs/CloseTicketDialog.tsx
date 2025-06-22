import { useMutation } from "@apollo/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader, X } from "lucide-react";
import { invalidateTicketQueries } from "../utils/tickets-cache";
import { toast } from "sonner";
import { useState } from "react";
import { CLOSE_TICKET_MUTATION } from "@/graphql/tickets";

interface CloseTicketDialogProps {
    ticketId: number;
    onClose: () => void;
    currentPage?: number;
}

export function CloseTicketDialog({ ticketId, onClose, currentPage }: CloseTicketDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleteTicket, { loading }] = useMutation(
    CLOSE_TICKET_MUTATION,
    {
      refetchQueries: invalidateTicketQueries(currentPage),
      onCompleted(data) {
        if (data?.closeTicket?.status === "Success") {
          toast.success(
            data.closeTicket.message || "Ticket closed successfully",
          );
          setOpen(false);
          onClose(); // Call the onClose prop to close the dialog
        } else {
          toast.error(
            data?.closeTicket?.message || "Failed to close  ticket",
            {
              duration: 50000,
              dismissible: true,
            },
          );
        }
      },
      onError(error) {
        console.error("Error closing ticket:", error);
        toast.error(
          error.message || "An unexpected error occurred. Please try again.",
          {
            duration: 50000,
            dismissible: true,
          },
        );
      },
    },
  );
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex w-full justify-start hover:brightness-75">
          <X className="h-4 w-4" />
          Close Ticket
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will close the ticket and
            remove it from the list. Please confirm if you want to proceed.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button
            className=""
            variant={"destructive"}
            onClick={() => {
              deleteTicket({
                variables: { ticketId },
              });
            }}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete Ticket"}
            {loading && <Loader className="ml-2 animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
