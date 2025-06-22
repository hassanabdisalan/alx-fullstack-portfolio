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
import { FaTiktok } from "react-icons/fa";
import { CheckCircle, RefreshCcw } from "lucide-react";

interface ConnectTikTokDialogProps {
  tikTokStatus: "Connected" | "Disconnected";
  handleTikTokConnect: () => void;
  isLoading?: boolean;
}

export function ConnectTikTokDialog({
  tikTokStatus,
  handleTikTokConnect,
  isLoading,
}: ConnectTikTokDialogProps) {
  const [open, setOpen] = useState(false);
  
  const isConnected = tikTokStatus === "Connected";

  const handleClick = () => {
    handleTikTokConnect();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isConnected ? "outline" : "default"}
          size="sm"
          className={`bg-foreground text-background hover:bg-muted-foreground border-background gap-2 border-[1px] shadow`}
          disabled={isLoading}
        >
          <FaTiktok className={"text-background"} />
          {isLoading ? "Connecting..." : isConnected ? "Re-connect" : "Connect"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <FaTiktok className="text-foreground text-2xl" />
            {isConnected
              ? "Reconnect TikTok Account"
              : "Connect TikTok Account"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground pt-2">
            {isConnected
              ? "Your TikTok account is already connected. Reconnecting will refresh your authentication token."
              : "Connect your TikTok account to leverage short-form video content and tap into emerging digital marketing trends."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 flex flex-col space-y-4">
          {isConnected && (
            <div className="bg-muted flex items-center rounded-md p-3">
              <CheckCircle className="text-primary mr-2 h-5 w-5" />
              <span className="text-sm">Currently connected to TikTok</span>
            </div>
          )}

          <div
            className={`flex justify-${isConnected ? "between" : "end"} w-full`}
          >
            {isConnected && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
            )}
            <Button
              variant={isConnected ? "outline" : "default"}
              size="sm"
              onClick={handleClick}
              disabled={isLoading}
              className={`bg-foreground text-background hover:bg-muted-foreground border-background gap-2 border-[1px] shadow`}
            >
              {isConnected ? (
                <>
                  <RefreshCcw className="h-4 w-4" />
                  Reconnect
                </>
              ) : (
                <>
                  <FaTiktok className={"text-background"} />
                  Connect to TikTok
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
