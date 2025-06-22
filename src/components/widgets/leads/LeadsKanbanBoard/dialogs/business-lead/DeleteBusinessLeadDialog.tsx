import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { FaRegTrashAlt } from "react-icons/fa";
import { LeadKanbanCard } from "../../state/types";
import { Button } from "@/components/ui/button";
import { useState } from "react";import {
  DELETE_BUSINESS_LEAD,
  GET_BUSINESS_LEADS_BY_STAGE,
} from "@/graphql/business-leads";
import { toast } from "sonner";
import { DEFAULT_LOAD_ITEMS_COUNT } from "@/utils/connstants";
import { invalidateLeadsCache } from "../../utils/cache-stuff";


interface DeleteBusinessLeadDialogProps {
  card: LeadKanbanCard; 
  currentStageId: number; // The ID of the stage to fetch leads for
}

export function DeleteBusinessLeadDialog({ card, currentStageId }: DeleteBusinessLeadDialogProps) {
  // console.log("DeleteBusinessLeadDialog", {card, stageId  });
  // const { deleteLead } = useLeadsKanbanContext();
  const [open, setOpen] = useState(false);
  const [deleteLeadMutation, { loading }] = useMutation(DELETE_BUSINESS_LEAD, {
    onCompleted: (data) => {
      if (data?.deleteLead?.status === "Success") {
        setOpen(false);
        toast.success("Lead deleted successfully");
      } else {
        toast.error(data?.deleteLead?.message || "Failed to delete lead");
      }
    },
    refetchQueries(result) {
      if (result.data?.deleteLead?.status === "Success") {
        return [
          {
            query: GET_BUSINESS_LEADS_BY_STAGE,
            variables: { stageId: currentStageId, first: DEFAULT_LOAD_ITEMS_COUNT },
          },
                ...invalidateLeadsCache(),
        ];
      }
      return [];
    },
    // update: (cache, { data }) => {
    //   if (data?.deleteLead?.status === "Success") {
    //     const oldLeads = cache.readQuery({
    //       query: GET_BUSINESS_LEADS_BY_STAGE,
    //     });
    //     if (oldLeads && oldLeads.getBusinessLeadsByStage?.leads) {
    //       cache.writeQuery({
    //         query: GET_BUSINESS_LEADS_BY_STAGE,
    //         data: {
    //           getBusinessLeadsByStage: {
    //             leads: oldLeads.getBusinessLeadsByStage.leads.filter(
    //               (lead) => lead.id !== card.id,
    //             ),
    //           },
    //         },
    //       });
    //     }
    //   }
    // },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="">
        <FaRegTrashAlt />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-end gap-4 p-2">
          <Button
            variant="destructive"
            onClick={() => {
              if (!card.id) {
                throw new Error("Card ID is missing");
              }
              if (!currentStageId) {
                throw new Error("Stage ID is missing");
              }
              deleteLeadMutation({
                variables: {
                  leadId: card.id,
                },
              }).then((res) => {
                if (res.data?.deleteLead && currentStageId) {
                  // deleteLead(card.id, currentStageId);
                  setOpen(false);
                }
              });
            }}
            className=""
          >
            {loading ? "Deleting..." : "Delete"}
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            variant={"outline"}
            className=""
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
