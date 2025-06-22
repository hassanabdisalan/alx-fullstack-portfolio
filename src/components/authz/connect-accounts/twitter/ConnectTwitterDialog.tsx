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
import { BsTwitterX } from "react-icons/bs";
import { CheckCircle, RefreshCcw } from "lucide-react";

interface ConnectTwitterDialogProps {
  twitterStatus: "Connected" | "Disconnected";
  handleTwitterConnect: () => void;
  isLoading?: boolean;
}

export function ConnectTwitterDialog({
  twitterStatus,
  handleTwitterConnect,
  isLoading,
}: ConnectTwitterDialogProps) {
  const [open, setOpen] = useState(false);
  
  const isConnected = twitterStatus === "Connected";

  const handleClick = () => {
    handleTwitterConnect();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className={`gap-2 ${isConnected ? "text-foreground" : "bg-[#1DA1F2] hover:bg-[#0c85d0]"}`}
          disabled={isLoading}
        >
          <BsTwitterX className={isConnected ? "text-[#1DA1F2]" : "text-white"} />
          {isLoading ? "Connecting..." : isConnected ? "Re-connect" : "Connect"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <BsTwitterX className="text-[#1DA1F2] text-2xl" />
            {isConnected ? "Reconnect Twitter Account" : "Connect Twitter Account"}
          </DialogTitle>
          <DialogDescription className="pt-2 text-muted-foreground">
            {isConnected 
              ? "Your Twitter account is already connected. Reconnecting will refresh your authentication token."
              : "Connect your Twitter account to integrate your social media presence with our platform and access enhanced marketing features."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 flex flex-col space-y-4">
          {isConnected && (
            <div className="flex items-center rounded-md bg-muted p-3">
              <CheckCircle className="mr-2 h-5 w-5 text-primary" />
              <span className="text-sm">Currently connected to Twitter</span>
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
              className={`gap-2 ${isConnected ? "border-[#1DA1F2] text-[#1DA1F2] hover:bg-[#1DA1F2]/10" : "bg-[#1DA1F2] hover:bg-[#0c85d0]"}`}
            >
              {isConnected ? (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Reconnect
                </>
              ) : (
                <>
                  <BsTwitterX className="text-white" />
                  Connect to Twitter
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
