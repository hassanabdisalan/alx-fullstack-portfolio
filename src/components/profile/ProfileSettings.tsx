import { DeleteUserAccount } from "@/components/authz/DeleteUserAccount";
import { UpdateUserProfile } from "@/components/authz/UppdateUserProfile";
import { IoSettingsOutline } from "react-icons/io5";
import { ChangeUserPassword } from "@/components/auth/ChangeUserPassword";
import { ConnectedAccounts } from "@/components/authz/ConnectedAccounts";
import { TwoFactorSettings } from "@/components/authz/TwoFactorSettings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UpdateBusiness } from "../authz/UpdateBusiness";
import { useQueryState } from "nuqs";

interface ProfileSettingsProps {
  isAdmin?: boolean;
}
const tabs = ["profile", "business", "security", "connected"] as const

export function ProfileSettings({ isAdmin }: ProfileSettingsProps) {
  const [tab, setTab] = useQueryState("tab", { defaultValue: "profile" });

  return (
    <div className="flex h-full min-h-fit w-full flex-col items-center">
      <div className="mb-10 flex w-full flex-col gap-2">
        <div className="mb-6 flex items-center gap-4">
          <IoSettingsOutline size={30} />
          <span className="text-2xl font-semibold">Settings</span>
        </div>
        <Tabs defaultValue="profile" className="w-full gap-10 px-4" value={tab} onValueChange={setTab}>
          <TabsList className="bg-background gap-10">
            <TabsTrigger className="settings-tab-trigger" value="profile">
              Profile
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger className="settings-tab-trigger" value="business">
                Business
              </TabsTrigger>
            )}
            <TabsTrigger className="settings-tab-trigger" value="security">
              Security
            </TabsTrigger>
            {isAdmin && (
              <TabsTrigger className="settings-tab-trigger" value="connected">
                Connected Accounts
              </TabsTrigger>
            )}
          </TabsList>
          <TabsContent value="profile">
            <UpdateUserProfile />
            <DeleteUserAccount />
          </TabsContent>
          {isAdmin && (
            <TabsContent value="business">
              <div className="flex flex-col gap-4">
                <UpdateBusiness />
              </div>
            </TabsContent>
          )}

          <TabsContent value="security">
            <div className="flex flex-col gap-4">
              <TwoFactorSettings />
              <ChangeUserPassword />
            </div>
          </TabsContent>
          {isAdmin && (
            <TabsContent value="connected">
              <ConnectedAccounts />
            </TabsContent>
          )}
        </Tabs>
      </div>
    </div>
  );
}
