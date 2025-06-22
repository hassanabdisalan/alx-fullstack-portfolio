import { ProfileSettings } from "@/components/profile/ProfileSettings";

interface SalesRepSettingsPageProps {}

export function SalesRepSettingsPage({}: SalesRepSettingsPageProps) {
  return (
    <div className="w-full overflow-scroll">
      <ProfileSettings />
    </div>
  );
}
