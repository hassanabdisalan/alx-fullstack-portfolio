import { BsTwitterX } from "react-icons/bs";
import { useConnectTwitter } from "./use-connect-twitter";
import { ConnectTwitterDialog } from "./ConnectTwitterDialog";
import { AccountData } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

interface ConnectTwitterAccountProps {
  loading: boolean;
  accountData: AccountData;
  accountName: string;
}

export function ConnectTwitterAccountRow({
  accountName,
  accountData,
  loading,
}: ConnectTwitterAccountProps) {
  const { twitterStatus: localStatus, isLoading, handleTwitterConnect } = useConnectTwitter();
    // Use API data if available, otherwise fall back to local state
  const status = accountData?.status || localStatus;
  const connectionStatus = status === "Connected" ? "Connected" : "Disconnected";
  const expiry = loading ? "-" : (accountData?.expiresIn || "-");
  const isLoadingState = loading || isLoading;
  
  return (
    <tr className="border-b">
      <td className="flex items-center gap-2 p-2">
        <BsTwitterX className="h-4 w-4 text-[#1DA1F2]" />
        <span>Twitter</span>
      </td>
      <td className="p-2">{accountName}</td>
      <td className="p-2">
        {loading ? <Skeleton className="h-4 w-12" /> : expiry}
      </td>
      <td className="p-2">
        {isLoadingState ? (
          <span className="font-medium text-amber-500">Checking...</span>
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
        <ConnectTwitterDialog
          twitterStatus={connectionStatus as "Connected" | "Disconnected"}
          handleTwitterConnect={handleTwitterConnect}
          isLoading={loading || isLoading}
        />
      </td>
    </tr>
  );
}
