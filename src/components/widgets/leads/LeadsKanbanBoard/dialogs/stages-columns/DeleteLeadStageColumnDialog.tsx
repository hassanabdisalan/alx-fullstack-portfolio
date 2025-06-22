import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { DELETE_LEAD_STAGE, GET_LEADS_STAGE } from "@/graphql/business-leads";
import { LeadKanbanColumn } from "../../state/types";
import { CiWarning } from "react-icons/ci";
import { RECENT_LEADS, LEADS_SUMMARY, GET_LEAD_SOURCES } from "@/graphql/queries/admin";

interface DeleteLeadStageColumnDialogProps {
  // open: boolean;
  // setOpen: (open: boolean) => void;
  column: LeadKanbanColumn;
  onSuccess?: () => void;
}

export function DeleteLeadStageColumnDialog({
  column,
  onSuccess,
  // open,
  // setOpen,
}: DeleteLeadStageColumnDialogProps) {
  const [open, setOpen] = useState(false);

  const [deleteStageMutation, { loading }] = useMutation(DELETE_LEAD_STAGE, {
    onCompleted: (data) => {
      if (data?.deleteLeadStage?.status === "Success") {
        toast.success("Stage deleted successfully");
        setOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error(data?.deleteLeadStage?.message || "Failed to delete stage");
      }
    },
    refetchQueries(result) {
      if (result.data?.deleteLeadStage?.status === "Success") {
        return [
          {
            query: GET_LEADS_STAGE,
          },
          {
            query: RECENT_LEADS,
          },
          {
            query: LEADS_SUMMARY,
          },
          {
            query: GET_LEAD_SOURCES,
          },
        ];
      }
      return [];
    },
    onError: (error) => {
      toast.error(
        error.message || "An error occurred while deleting the stage",
      );
    },
  });

  const handleDelete = () => {
    const stageId = column?.id;

    if (!stageId) {
      toast.error("Stage ID is missing");
      return;
    }

    deleteStageMutation({
      variables: {
        stageId: typeof stageId === "string" ? parseInt(stageId) : stageId,
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center justify-center p-1 text-white">
        Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex gap-2">
            <CiWarning className="text-error" />
            Delete Stage{" "}
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the "{column?.name}" stage? This
            action cannot be undone, and all leads in this stage will be
            affected.
            <br />
            <br />
            All the leads in this stage will be{" "}
            <span className="text-error">PERMANENTLY DELETED</span>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <div className="flex w-full justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleDelete}
              variant="destructive"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete Stage"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
