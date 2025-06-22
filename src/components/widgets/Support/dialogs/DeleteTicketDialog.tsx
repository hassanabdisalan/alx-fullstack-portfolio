
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
import { Loader } from "lucide-react";
import { invalidateTicketQueries } from "../utils/tickets-cache";
import { toast } from "sonner";
import { useState } from "react";
import { FaTrash } from "react-icons/fa6";
import { DELETE_TICKET } from "@/graphql/tickets";

interface DeleteTicketDialogProps {
    ticketId: number;
    onClose: () => void;
    currentPage?: number;
}

export function DeleteTicketDialog({ ticketId, onClose, currentPage }: DeleteTicketDialogProps) {
  const [open, setOpen] = useState(false);
  const [deleteTicket, { loading, error }] = useMutation(DELETE_TICKET, {
    refetchQueries: invalidateTicketQueries(currentPage),
    onCompleted(data) {
      if (data?.deleteTicket?.status === "Success") {
        toast.success(
          data.deleteTicket.message || "Ticket deleted successfully",
        );
        setOpen(false);
        onClose(); // Call the onClose prop to close the dialog
      } else {
        toast.error(data?.deleteTicket?.message || "Failed to delete ticket", {
          duration: 50000,
          dismissible: true,
        });
      }
    },
    onError(error) {
      console.error("Error deleting ticket:", error);
      toast.error(
        error.message || "An unexpected error occurred. Please try again.",
        {
          duration: 50000,
          dismissible: true,
        },
      );
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex w-full justify-start hover:brightness-75">
          <FaTrash className="h-4 w-4" />
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            ticket and remove all associated data. Please confirm that you want
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
