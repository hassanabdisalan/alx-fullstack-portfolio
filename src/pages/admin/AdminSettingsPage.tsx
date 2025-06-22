import { ProfileSettings } from "@/components/profile/ProfileSettings";

interface AdminSettingsPageProps {}

export function AdminSettingsPage({}: AdminSettingsPageProps) {
  return (
    <div className="h-full w-full">
      <ProfileSettings isAdmin />
    </div>
  );
}
