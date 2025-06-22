import { ManualSwappy } from "../widgets/SwappableWidgetsContainer";
import { CampaignsTable } from "../widgets/marketing/CampaignsTable";
import { TotalGeneratedLeads } from "../widgets/marketing/TotalGeneratedLeads";
import { TotalCampaignWidget } from "../widgets/marketing/TotalCampaignWidget";
import { ConversionRatesWidget } from "../widgets/leads/ConversionRatesWidget";

interface MainMarketingCampaignsProps {}

export function MainMarketingCampaigns({}: MainMarketingCampaignsProps) {
  return (
    <div className="flex min-h-screen w-full flex-col gap-4">
      <ManualSwappy
        sectionKey="MainMarketingCompaignsKeys"
        initialItems={[
          {
            id: "generatedLeads",
            title: "Generated Leads",
            children: <TotalGeneratedLeads />,
          },
          {
            id: "subscribers",
            title: "Subscribers",
            children: <TotalCampaignWidget />,
          },
          {
            id: "conversion-rates",
            title: "Conversion Rates",
            children: <ConversionRatesWidget />,
          },
        ]}
      />
      {/* Marketing compaign table */}
      <div className="flex w-full flex-col gap-4">
        <CampaignsTable />
      </div>
    </div>
  );
}
