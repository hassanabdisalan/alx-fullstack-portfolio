import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { usePromiseMutation } from "@/hooks/use-promise-mutation";
import { Loader } from "lucide-react";

interface UpdateLeadToCustomerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  updateLead: () => Promise<any>;
}

export function UpdateLeadToCustomer({
  open,
  onOpenChange,
  updateLead,
}: UpdateLeadToCustomerProps) {
  const { mutate, isPending } = usePromiseMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      onOpenChange(false);
    },
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convert this lead to a Customer</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently convert the lead
            to a customer and remove it from the leads list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-between p-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            variant="default"
            disabled={isPending}
            type="button"
            onClick={() => mutate()}
          >
            Convert{" "}
            {isPending && <Loader className="ml-4 size-4 animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
interface UpdateLeadToLostCustomerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  updateLead: () => Promise<any>;
}

export function UpdateLeadToLostCustomer({
  open,
  onOpenChange,
  updateLead,
}: UpdateLeadToLostCustomerProps) {
  const { mutate, isPending } = usePromiseMutation({
    mutationFn: updateLead,
    onSuccess: () => {
      onOpenChange(false);
    },
  });
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Convert to lost lead</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently convert the lead
            to a lost lead and remove it from the leads list.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-between p-2">
          <Button
            variant="outline"
            type="button"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button variant="default" type="button" onClick={() => mutate()}>
            Convert{" "}
            {isPending && <Loader className="ml-4 size-4 animate-spin" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
