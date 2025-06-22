import { FaInstagram } from "react-icons/fa";
import { useConnectInstagram } from "./use-connect-instagram";
import { ConnectInstagramDialog } from "./ConnectInstagramDialog";
import { AccountData } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

interface ConnectInstagramAccountProps {
  accountName: string;
  loading: boolean;
  accountData: AccountData;
}

export function ConnectInstagramAccountRow({
  accountName,
  accountData,
  loading,
}: ConnectInstagramAccountProps) {
  const { instagramStatus: localStatus, isLoading, handleInstagramConnect } =
    useConnectInstagram();
  
  // Use API data if available, otherwise fall back to local state
  const status = accountData?.status || localStatus;
  const connectionStatus = status === "Connected" ? "Connected" : "Disconnected";
  const expiry = loading ? "-" : (accountData?.expiresIn || "-");

  return (
    <tr className="border-b">
      <td className="flex items-center gap-2 p-2">
        <FaInstagram className="h-4 w-4 text-[#E1306C]" />
        <span>Instagram</span>
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
        <ConnectInstagramDialog
          instagramStatus={connectionStatus as "Connected" | "Disconnected"}
          handleInstagramConnect={handleInstagramConnect}
          isLoading={loading || isLoading}
        />
      </td>
    </tr>
  );
}
