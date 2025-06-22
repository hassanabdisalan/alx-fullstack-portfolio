import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { useMutation } from "@apollo/client";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { ADD_LEAD_STAGE, GET_LEADS_STAGE } from "@/graphql/business-leads";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CiCirclePlus } from "react-icons/ci";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GET_LEAD_SOURCES, LEADS_SUMMARY, RECENT_LEADS } from "@/graphql/queries/admin";

interface AddLeadStageColumnDialogProps {
  onSuccess?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  columnIdx: number;
}

const stageSchema = z.object({
  name: z.string().min(1, "Stage name is required"),
  position: z.number().min(0, "Position must be a non-negative number"),
});

type StageFormValues = z.infer<typeof stageSchema>;

export function AddLeadStageColumnDialog({ onSuccess,open,setOpen,columnIdx }: AddLeadStageColumnDialogProps) {
  // const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StageFormValues>({
    resolver: zodResolver(stageSchema),
    defaultValues: {
      name: "",
       position: 0, // Default position, can be adjusted later
    },
  });

  const [addStageMutation, { loading }] = useMutation(ADD_LEAD_STAGE, {
    onCompleted: (data) => {
      if (data?.addLeadStage?.status === "Success") {
        toast.success("Stage added successfully");
        reset();
        setOpen(false);
        if (onSuccess) onSuccess();
      } else {
        toast.error(data?.addLeadStage?.message || "Failed to add stage");
      }
    },
    refetchQueries(result) {
      if (result.data?.addLeadStage?.status === "Success") {
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
      toast.error(error.message || "An error occurred while adding the stage");
    },
  });

  const onSubmit = (data: StageFormValues) => {
    addStageMutation({
      variables: {
        name: data.name,
        position: columnIdx + 1, // Default position, can be adjusted later
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger>
            <CiCirclePlus className="size-10" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Add new stage after this one</p>
          </TooltipContent>
        </Tooltip>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Stage</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            <div className="p-2">column position {columnIdx + 1}</div>
          </div>
          <DialogFooter>
            <div className="flex w-full justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={loading}>
                {loading ? "Adding..." : "Add Stage"}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
