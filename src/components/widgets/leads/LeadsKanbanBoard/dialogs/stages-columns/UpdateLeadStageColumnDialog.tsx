import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import {
  GET_LEADS_STAGE,
  UPDATE_LEAD_STAGE,
} from "@/graphql/business-leads";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  RECENT_LEADS,
  LEADS_SUMMARY,
  GET_LEAD_SOURCES,
} from "@/graphql/queries/admin";
import { LeadKanbanColumn } from "../../state/types";

interface UpdateLeadStageColumnDialogProps {
  column: LeadKanbanColumn;
  onSuccess?: () => void;
}

const columnSchema = z.object({
  name: z.string().min(1, "Stage name is required"),
});

type ColumnFormValues = z.infer<typeof columnSchema>;

export function UpdateLeadStageColumnDialog({
  // open,
  // setOpen,
  column,
  onSuccess,
}: UpdateLeadStageColumnDialogProps) {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ColumnFormValues>({
    resolver: zodResolver(columnSchema),
    defaultValues: {
      name: column?.name || "",
    },
  });

  const [updateStageMutation, { loading }] = useMutation(UPDATE_LEAD_STAGE, {
    onCompleted: (data) => {
      if (data?.updateLeadStage?.status === "Success") {
        toast.success("Stage updated successfully");
        setOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error(data?.updateLeadStage?.message || "Failed to update stage");
      }
    },
    refetchQueries(result) {
      if (result.data?.updateLeadStage?.status === "Success") {
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
        error.message || "An error occurred while updating the stage",
      );
    },
  });

  const onSubmit = (data: ColumnFormValues) => {
    const colId = column?.id;
    if (!colId) {
      toast.error("Stage ID is missing");
    } else {
      updateStageMutation({
        variables: {
          stageId: parseInt(colId),
          name: data.name,
        },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center justify-center p-1 text-white">
        Edit
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription className="sr-only">
            Update the stage name for your lead management.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Stage Name</label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div>
                  <Input
                    {...field}
                    placeholder="Enter stage name"
                    onKeyDown={(e) => {
                      if (e.key === " ") {
                        e.stopPropagation();
                        e.preventDefault();
                        field.onChange(field.value + " ");
                      }
                    }}
                  />
                  {errors.name && (
                    <p className="text-destructive mt-1 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <DialogFooter>
            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Updating..." : "Update Stage"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
