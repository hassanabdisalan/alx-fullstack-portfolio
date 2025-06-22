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
import { FaFacebook } from "react-icons/fa";
import { CheckCircle, RefreshCcw } from "lucide-react";

interface ConnectFacebookDialogProps {
  facebookStatus: "Connected" | "Disconnected";
  handleFbBtnClick: () => void;
  isLoading?: boolean;  // Standardized property name
}

export function ConnectFacebookDialog({
  facebookStatus,
  handleFbBtnClick,
  isLoading,  // Standardized parameter name
}: ConnectFacebookDialogProps) {
  const [open, setOpen] = useState(false);
  
  const isConnected = facebookStatus === "Connected";
  const handleClick = () => {
    handleFbBtnClick();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>      <DialogTrigger asChild>
        <Button 
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className={`gap-2 ${isConnected ? "text-foreground" : "bg-[#1877F2] hover:bg-[#0b5ed7]"}`}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <span className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-[#1877F2]"></span>
              <span>Checking...</span>
            </>
          ) : (
            <>
              <FaFacebook className={isConnected ? "text-[#1877F2]" : "text-white"} />
              {isConnected ? "Re-connect" : "Connect"}
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FaFacebook className="text-[#1877F2] text-2xl" />
            {isConnected ? "Reconnect Facebook Account" : "Connect Facebook Account"}
          </DialogTitle>
          <DialogDescription className="pt-2 text-muted-foreground">
            {isConnected 
              ? "Your Facebook account is already connected. Reconnecting will refresh your authentication token."
              : "Connect your Facebook account to integrate your social media presence with our platform and access enhanced marketing features."}
          </DialogDescription>
        </DialogHeader>
          <div className="mt-4 flex flex-col space-y-4">
          {isLoading && (
            <div className="flex items-center justify-center rounded-md bg-blue-50 p-3 text-[#1877F2]">
              <span className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
              <span className="text-sm font-medium">Checking connection status...</span>
            </div>
          )}
          
          {isConnected && !isLoading && (
            <div className="flex items-center rounded-md bg-muted p-3">
              <CheckCircle className="mr-2 h-5 w-5 text-primary" />
              <span className="text-sm">Currently connected to Facebook</span>
            </div>
          )}
          
          <div className={`flex justify-${isConnected ? "between" : "end"} w-full`}>
            {isConnected && (
              <Button variant="outline" size="sm" onClick={() => setOpen(false)}>
                Cancel
              </Button>
            )}<Button
              variant={isConnected ? "outline" : "default"}
              size="sm"
              onClick={handleClick}
              disabled={isLoading}
              className={`gap-2 ${isConnected ? "border-[#1877F2] text-[#1877F2] hover:bg-[#1877F2]/10" : "bg-[#1877F2] hover:bg-[#0b5ed7]"}`}
            >
              {isLoading ? (
                <>
                  <span className="mr-1 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"></span>
                  Checking...
                </>
              ) : isConnected ? (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Reconnect
                </>
              ) : (
                <>
                  <FaFacebook className="text-white" />
                  Connect to Facebook
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
