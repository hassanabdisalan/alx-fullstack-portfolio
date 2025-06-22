import { MainMarketingCampaigns } from "@/components/admin-dashboard/MainMarketingCampaigns";
interface AdminMarketingCompaignsProps {}

export function AdminMarketingCompaigns({}: AdminMarketingCompaignsProps) {
  return (
    <div className="o flex h-full w-full flex-col items-center">
      <MainMarketingCampaigns />
    </div>
  );
}
