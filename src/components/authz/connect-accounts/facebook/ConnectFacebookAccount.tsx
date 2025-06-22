import { useConnectFacebook } from "./use-connect-facebook";
import { FaFacebook } from "react-icons/fa6";
import { ConnectFacebookDialog } from "./ConnectFacebookDialog";
import { AccountData } from "../types";
import { Skeleton } from "@/components/ui/skeleton";

interface ConnectFacebookAccountProps {
  loading: boolean;
  accountData: AccountData;
  accountName: string;
}

export function ConnectFacebookAccountRow({
  accountName,
  accountData,
  loading,
}: ConnectFacebookAccountProps) {
  const { facebookAuthLoading, facebookStatus: localStatus, handleFbBtnClick } =
    useConnectFacebook();
    
  // Use API data if available, otherwise fall back to local state
  const status = accountData?.status || localStatus;
  const connectionStatus = status === "Connected" ? "Connected" : "Disconnected";
  const expiry = loading ? "-" : (accountData?.expiresIn || "-");
  
  return (
    <tr className="border-b">
      <td className="flex items-center gap-2 p-2">
        <FaFacebook className="h-4 w-4 text-[#1877F2]" />
        <span>Facebook</span>
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
        <ConnectFacebookDialog
          facebookStatus={connectionStatus as "Connected" | "Disconnected"}
          handleFbBtnClick={handleFbBtnClick}
          isLoading={loading || facebookAuthLoading}
        />
      </td>
    </tr>
  );
}
