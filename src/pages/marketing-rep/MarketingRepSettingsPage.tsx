import { ProfileSettings } from "@/components/profile/ProfileSettings";

interface MarketingRepSettingsPageProps {}

export function MarketingRepSettingsPage({}: MarketingRepSettingsPageProps) {
  return (
    <div className="w-full overflow-scroll">
      <ProfileSettings />
    </div>
  );
}
