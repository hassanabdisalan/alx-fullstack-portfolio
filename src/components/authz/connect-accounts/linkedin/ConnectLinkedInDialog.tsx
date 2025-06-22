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
import { FaLinkedin } from "react-icons/fa";
import { CheckCircle, RefreshCcw } from "lucide-react";

interface ConnectLinkedInDialogProps {
  linkedInStatus: "Connected" | "Disconnected";
  handleLinkedInConnect: () => void;
  isLoading?: boolean;
}

export function ConnectLinkedInDialog({
  linkedInStatus,
  handleLinkedInConnect,
  isLoading,
}: ConnectLinkedInDialogProps) {
  const [open, setOpen] = useState(false);
  
  const isConnected = linkedInStatus === "Connected";

  const handleClick = () => {
    handleLinkedInConnect();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className={`gap-2 ${isConnected ? "text-foreground" : "bg-[#0077B5] hover:bg-[#005e8a]"}`}
          disabled={isLoading}
        >
          <FaLinkedin className={isConnected ? "text-[#0077B5]" : "text-white"} />
          {isLoading ? "Connecting..." : isConnected ? "Re-connect" : "Connect"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FaLinkedin className="text-[#0077B5] text-2xl" />
            {isConnected ? "Reconnect LinkedIn Account" : "Connect LinkedIn Account"}
          </DialogTitle>
          <DialogDescription className="pt-2 text-muted-foreground">
            {isConnected 
              ? "Your LinkedIn account is already connected. Reconnecting will refresh your authentication token."
              : "Connect your LinkedIn account to improve your professional network outreach and enhance your business presence on our platform."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 flex flex-col space-y-4">
          {isConnected && (
            <div className="flex items-center rounded-md bg-muted p-3">
              <CheckCircle className="mr-2 h-5 w-5 text-primary" />
              <span className="text-sm">Currently connected to LinkedIn</span>
            </div>
          )}
          
          <div className={`flex justify-${isConnected ? "between" : "end"} w-full`}>
            {isConnected && (
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            )}
            <Button
              variant={isConnected ? "outline" : "default"}
              size="sm"
              onClick={handleClick}
              disabled={isLoading}
              className={`gap-2 ${isConnected ? "border-[#0077B5] text-[#0077B5] hover:bg-[#0077B5]/10" : "bg-[#0077B5] hover:bg-[#005e8a]"}`}
            >
              {isConnected ? (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Reconnect
                </>
              ) : (
                <>
                  <FaLinkedin className="text-white" />
                  Connect to LinkedIn
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
