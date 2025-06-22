import { ConversionRatesWidget } from "@/components/widgets/leads/ConversionRatesWidget";
import { CampaignsTable } from "@/components/widgets/marketing/CampaignsTable";
import { TotalCampaignWidget } from "@/components/widgets/marketing/TotalCampaignWidget";
import { TotalGeneratedLeads } from "@/components/widgets/marketing/TotalGeneratedLeads";
import { ManualSwappy } from "@/components/widgets/SwappableWidgetsContainer";

interface MarketingRepCampaignsPageProps {}

export function MarketingRepCampaignsPage({}: MarketingRepCampaignsPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex max-h-screen w-full flex-col gap-4 p-4">
        <ManualSwappy
          sectionKey="MainSupportTicketKeys"
          initialItems={[
            {
              id: "total-generated-leads",
              title: "Total Generated Leads",
              children: <TotalGeneratedLeads />,
            },
            {
              id: "total-campaigns",
              title: "Total Campaigns",
              children: <TotalCampaignWidget />,
            },
            {
              id: "conversion-rates",
              title: "Conversion rates",
              children: <ConversionRatesWidget />,
            },
          ]}
        />
        <CampaignsTable />
      </div>
    </div>
  );
}
