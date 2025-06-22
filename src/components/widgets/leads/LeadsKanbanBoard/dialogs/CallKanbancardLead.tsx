import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { FiPhone } from "react-icons/fi";
import { ClipboardButton } from "@/components/wrappers/ClipboardButton";

interface CallKanbancardLeadProps {
  customerData: {
    firstName: string;
    phone?: string;
  };
}

export function CallKanbancardLead({ customerData }: CallKanbancardLeadProps) {
  return (
    <Dialog >
      <DialogTrigger
        asChild
        onPointerDown={(e) => e.stopPropagation()}
        className="cursor-pointer"
      >
        <FiPhone className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent
        className="max-w-[400px]"
        onPointerDown={(e) => e.stopPropagation()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FiPhone className="text-primary" />
            <span>Call </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 w-full">
          <div className="flex items-center justify-between rounded-lg p-4">
            <div className="w-full">
              <p className="text-foreground text-sm">Phone Number</p>
              <p className="text-4xl max-w-md font-semibold tracking-wide  truncate">
                {customerData?.phone || "Not available"}
              </p>
            </div>
          </div>
        </div>
        <DialogFooter className="max-w-md">
        <div className="sm:justify-between  w-full flex ">
          <Button
            className="bg-success text-success-foreground hover:bg-success-foreground/20"
            onClick={() => {
              if (customerData?.phone) {
                window.open(`tel:${customerData.phone}`);
              }
            }}
            disabled={!customerData?.phone}
          >
            <FiPhone className="mr-2 h-4 w-4" />
            Call Now
          </Button>
          <ClipboardButton className="" text={customerData?.phone || ""} onlyShowCopy />
        </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
