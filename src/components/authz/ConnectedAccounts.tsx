import { ConnectFacebookAccountRow } from "./connect-accounts/facebook/ConnectFacebookAccount";
import { ConnectTwitterAccountRow } from "./connect-accounts/twitter/ConnectTwitterAccount";
import { ConnectInstagramAccountRow } from "./connect-accounts/instagram/ConnectInstagramAccount";
import { ConnectLinkedInAccountRow } from "./connect-accounts/linkedin/ConnectLinkedInAccount";
import { ConnectTikTokAccountRow } from "./connect-accounts/tiktok/ConnectTikTokAccount";
import { useQuery } from "@apollo/client";
import { GET_CONNECTED_ACCOUNTS_STATUS } from "@/graphql/queries/admin";
import {
  AccountData,
  AccountsData,
  SupportedPlatforms,
} from "./connect-accounts/types";

export function ConnectedAccounts() {
  const companyName = "Goymarey Software Solutions";
  const { data, loading } = useQuery(GET_CONNECTED_ACCOUNTS_STATUS);
  const accountssData = data?.accountConnection?.data?.reduce(
    (acc: AccountsData, account) => {
      const { platform, expiresIn, status } = account;
      if (!platform || !expiresIn || !status) {
        return acc; // Skip if any required field is missing
      }
      const plat = platform.toLowerCase() as SupportedPlatforms;
      acc[plat] = {
        accountName: companyName,
        expiresIn,
        status,
      };
      return acc;
    },
    {
      facebook: null,
      twitter: null,
      instagram: null,
      linkedin: null,
      tiktok: null,
    },
  );

  return (
    <div className="bg-background border-muted/60 w-full rounded-md border p-4">
      <h2 className="mb-4 text-lg font-medium">
        All Connected Social media accounts
      </h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border-b p-2 text-left font-semibold">Platform</th>
              <th className="border-b p-2 text-left font-semibold">
                Account Name
              </th>
              <th className="border-b p-2 text-left font-semibold">Expiry</th>
              <th className="border-b p-2 text-left font-semibold">Status</th>
              <th className="border-b p-2 text-left font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            <ConnectFacebookAccountRow
              loading={loading}
              accountData={accountssData?.facebook}
              accountName={companyName}
            />
            <ConnectTwitterAccountRow
              loading={loading}
              accountData={accountssData?.twitter}
              accountName={companyName}
            />
            <ConnectInstagramAccountRow
              loading={loading}
              accountData={accountssData?.instagram}
              accountName={companyName}
            />
            <ConnectLinkedInAccountRow
              loading={loading}
              accountData={accountssData?.linkedin}
              accountName={companyName}
            />
            <ConnectTikTokAccountRow
              loading={loading}
              accountData={accountssData?.tiktok}
              accountName={companyName}
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
