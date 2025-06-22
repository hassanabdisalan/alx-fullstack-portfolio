import { FaLinkedin } from "react-icons/fa";
import { useConnectLinkedIn } from "./use-connect-linkedin";
import { ConnectLinkedInDialog } from "./ConnectLinkedInDialog";
import { AccountData } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

interface ConnectLinkedInAccountProps {
  accountName: string;
  loading: boolean;
  accountData: AccountData;
}

export function ConnectLinkedInAccountRow({
  accountName,
  loading,
  accountData,
}: ConnectLinkedInAccountProps) {
  const { linkedInStatus: localStatus, isLoading, handleLinkedInConnect } = useConnectLinkedIn();
  
  // Use API data if available, otherwise fall back to local state
  const status = accountData?.status || localStatus;
  const connectionStatus = status === "Connected" ? "Connected" : "Disconnected";
  const expiry = loading ? "-" : (accountData?.expiresIn || "-");
  
  return (
    <tr className="border-b">
      <td className="flex items-center gap-2 p-2">
        <FaLinkedin className="h-4 w-4 text-[#0077B5]" />
        <span>LinkedIn</span>
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
        <ConnectLinkedInDialog
          linkedInStatus={connectionStatus as "Connected" | "Disconnected"}
          handleLinkedInConnect={handleLinkedInConnect}
          isLoading={loading || isLoading}
        />
      </td>
    </tr>
  );
}
