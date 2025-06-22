import { ProfileSettings } from "@/components/profile/ProfileSettings";

interface CustomerServiceRepSettingsPageProps {}

export function CustomerServiceRepSettingsPage({}: CustomerServiceRepSettingsPageProps) {
  return (
    <div className="w-full overflow-scroll">
      <ProfileSettings />
    </div>
  );
}
