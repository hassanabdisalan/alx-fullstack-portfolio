import { MainSupportAnalytics } from "@/components/admin-dashboard/MainSupportAnalytics";
interface AdminSupportAnalyticsProps {}

export function AdminSupportAnalytics({}: AdminSupportAnalyticsProps) {
  return (
    <div className="o flex h-full w-full flex-col items-center">
      <MainSupportAnalytics />
    </div>
  );
}
