import { FaTiktok } from "react-icons/fa";
import { useConnectTikTok } from "./use-connect-tiktok";
import { ConnectTikTokDialog } from "./ConnectTikTokDialog";
import { AccountData } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

interface ConnectTikTokAccountProps {
  accountName: string;
  loading: boolean;
  accountData: AccountData;
}

export function ConnectTikTokAccountRow({
  accountName,
  loading,
  accountData,
}: ConnectTikTokAccountProps) {
  const { tikTokStatus: localStatus, isLoading, handleTikTokConnect } = useConnectTikTok();
  
  // Use API data if available, otherwise fall back to local state
  const status = accountData?.status || localStatus;
  const connectionStatus = status === "Connected" ? "Connected" : "Disconnected";
  const expiry = loading ? "-" : (accountData?.expiresIn || "-");
  
  return (
    <tr className="border-b">
      <td className="flex items-center gap-2 p-2">
        <FaTiktok className="h-4 w-4" />
        <span>TikTok</span>
      </td>
      <td className="p-2">{accountName}</td>
      <td className="p-2">
        {loading ? <Skeleton className="h-4 w-12" /> : expiry}
      </td>
      <td className="p-2">
        {loading ? (
          <Skeleton className="h-4 w-20" />
        ) : (
          <span
            className={
              connectionStatus === "Connected"
                ? "font-medium text-green-600"
                : "font-medium text-red-500"
            }
          >
            {connectionStatus}
          </span>
        )}
      </td>
      <td className="p-2">
        <ConnectTikTokDialog
          tikTokStatus={connectionStatus as "Connected" | "Disconnected"}
          handleTikTokConnect={handleTikTokConnect}
          isLoading={loading || isLoading}
        />
      </td>
    </tr>
  );
}
