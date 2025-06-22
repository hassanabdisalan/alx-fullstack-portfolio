import { ColumnDef, Row } from "@tanstack/react-table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FiMoreHorizontal } from "react-icons/fi";
import { useState } from "react";
// import { DELETE_LEAD } from "@/graphql/mutations/admin";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DELETE_BUSINESS_LEAD,
  GET_BUSINESS_LEADS_BY_STAGE,
} from "@/graphql/business-leads";
import { Loader } from "lucide-react";
import { RECENT_LEADS } from "@/graphql/queries/admin";

interface LeadTable {
  Fname: string;
  Sname: string;
  createdAt: string;
  email: string;
  id: number;
  phone: string;
  revenue: number;
  source: string;
  stage: string;
  status: string;
}

// Helper function to format dates as DD-MM-YYYY format
const formatTableDate = (dateString: string | number | Date): string => {
  const date = new Date(dateString);
  // Format as DD-MM-YYYY
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const ActionsCell = ({ row }: { row: Row<LeadTable> }) => {
  const lead = row.original;
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDeactivate, setOpenDeactivate] = useState(false);

  const [deleteLeadMutation, { loading }] = useMutation(DELETE_BUSINESS_LEAD, {
    onCompleted: (data) => {
      if (data?.deleteLead?.status === "Success") {
        setOpenDeleteDialog(false);
        toast.success("Lead deleted successfully");
      } else {
        toast.error(data?.deleteLead?.message || "Failed to delete lead");
      }
    },
    refetchQueries(result) {
      if (result.data?.deleteLead?.status === "Success") {
        return [{ query: RECENT_LEADS }];
      }
      return [];
    },
  });

  const handleDelete = async () => {
    try {
      await deleteLeadMutation({ variables: { leadId: Number(lead.id) } });
    } catch (error) {
      console.log("Error deleting lead", error);
    } finally {
      setOpenDeleteDialog(false);
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <FiMoreHorizontal className="cursor-pointer" size={16} />
        </PopoverTrigger>
        <PopoverContent className="shadow-0 h-fit w-fit border-none p-0">
          <div className="absolute top-0 left-0">
            <div className="bg-primary text-background z-20 mb-1 w-30 rounded-t-md rounded-br-md shadow-lg">
              <div className="py-1">
                <Button
                  className="block w-full cursor-pointer px-4 py-1 text-left text-sm"
                  onClick={() => setOpenDeleteDialog(true)}
                >
                  Delete
                </Button>
                <div className="border-background border-t"></div>

                <Button
                  disabled
                  className="block w-full cursor-pointer px-4 py-1 text-left text-sm"
                  onClick={() => setOpenDeactivate(true)}
                >
                  Deactivate
                </Button>
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent className="max-w-md rounded-lg">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg font-semibold">
              Delete Lead?
            </AlertDialogTitle>
            <AlertDialogDescription className="">
              Are you sure you want to delete this lead?"
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel className="border-muted-foreground bg-background text-foreground/60 hover:bg-foreground/10 cursor-pointer rounded-md border px-4 py-2 text-sm font-medium shadow-sm">
              Cancel
            </AlertDialogCancel>
            <Button
              onClick={handleDelete}
              disabled={loading}
              variant={"destructive"}
            >
              Delete Lead
              {loading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
            {/* <AlertDialogAction className="" >
            </AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Deactivation Dialog */}
      <Dialog open={openDeactivate} onOpenChange={setOpenDeactivate}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              ⚠️⚠️ API NOT IMPLEMENTED YET! ⚠️⚠️ Are you sure you want to
              deactivate this lead?
            </DialogTitle>
            <DialogDescription>
              This action will deactivate the lead and remove it from the active
              list. You can reactivate it later if needed.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={() => setOpenDeactivate(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="cursor-pointer"
              disabled
              onClick={() => {}}
            >
              Deactivate
              {loading && <Loader className="ml-2 h-4 w-4 animate-spin" />}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export function makeRecentLeadsColumns() {
  const columns: ColumnDef<LeadTable, any>[] = [
    {
      id: "id",
      header: ({ table }) => (
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={table.getIsAllPageRowsSelected()}
          onChange={(e) => table.toggleAllPageRowsSelected(e.target.checked)}
          //   onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          className="size-5 cursor-pointer"
          checked={row.getIsSelected()}
          onChange={(e) => row.toggleSelected(e.target.checked)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "Fname",
      header: "First Name",
    },
    {
      accessorKey: "Sname",
      header: "Last Name",
    },
    {
      accessorKey: "stage",
      header: "Stage",
      cell: ({ row }) => {
        const stage = row.getValue<string>("stage");
        return (
          <div className="text-foreground/80 text-sm">
            {stage?.trim() ? stage : "No stage"}
          </div>
        );
      },
    },
    {
      accessorKey: "source",
      header: "Platform",
      cell: ({ row }) => {
        const source = row.getValue<string>("source");
        return (
          <div className="text-foreground/80 text-sm">
            {source?.trim() ? source : "No source"}
          </div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: "Date Created",
      cell: ({ row }) => {
        const date = row.getValue<string>("createdAt");
        return (
          <div className="text-foreground/80 text-sm">
            {formatTableDate(date)}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <ActionsCell row={row} />
      ),
    },
  ];
  return columns;
}
