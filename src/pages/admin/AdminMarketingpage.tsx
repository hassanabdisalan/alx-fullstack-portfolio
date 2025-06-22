import { MainMarketingAnalytics } from "@/components/admin-dashboard/MainMarketingAnalytics";
interface AdminMarketingpageProps {}

export function AdminMarketingpage({}: AdminMarketingpageProps) {
  return (
    <div className="oflex h-full w-full flex-col items-center justify-center">
      <MainMarketingAnalytics />
    </div>
  );
}
