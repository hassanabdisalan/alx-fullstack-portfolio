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
import { FaInstagram } from "react-icons/fa";
import { CheckCircle, RefreshCcw } from "lucide-react";

interface ConnectInstagramDialogProps {
  instagramStatus: "Connected" | "Disconnected";
  handleInstagramConnect: () => void;
  isLoading?: boolean;
}

export function ConnectInstagramDialog({
  instagramStatus,
  handleInstagramConnect,
  isLoading,
}: ConnectInstagramDialogProps) {
  const [open, setOpen] = useState(false);
  
  const isConnected = instagramStatus === "Connected";

  const handleClick = () => {
    handleInstagramConnect();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className={`gap-2 ${isConnected ? "text-foreground" : "bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#FFDC80] hover:opacity-90"}`}
          disabled={isLoading}
        >
          <FaInstagram className={isConnected ? "text-[#E1306C]" : "text-white"} />
          {isLoading ? "Connecting..." : isConnected ? "Re-connect" : "Connect"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FaInstagram className="text-[#E1306C] text-2xl" />
            {isConnected ? "Reconnect Instagram Account" : "Connect Instagram Account"}
          </DialogTitle>
          <DialogDescription className="pt-2 text-muted-foreground">
            {isConnected 
              ? "Your Instagram account is already connected. Reconnecting will refresh your authentication token."
              : "Connect your Instagram account to showcase your visual content and integrate your social media presence with our platform."}
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4 flex flex-col space-y-4">
          {isConnected && (
            <div className="flex items-center rounded-md bg-muted p-3">
              <CheckCircle className="mr-2 h-5 w-5 text-primary" />
              <span className="text-sm">Currently connected to Instagram</span>
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
              className={`gap-2 ${
                isConnected 
                  ? "border-[#E1306C] text-[#E1306C] hover:bg-[#E1306C]/10" 
                  : "bg-gradient-to-r from-[#405DE6] via-[#E1306C] to-[#FFDC80] hover:opacity-90"
              }`}
            >
              {isConnected ? (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Reconnect
                </>
              ) : (
                <>
                  <FaInstagram className="text-white" />
                  Connect to Instagram
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
