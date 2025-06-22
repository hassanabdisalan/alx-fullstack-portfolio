import { SentimentalAnalysisCardWidget } from "@/components/widgets/customers/SentimentalAnalysisCardWidget";
import { ConversionRatesWidget } from "@/components/widgets/leads/ConversionRatesWidget";
import { MarketingPerfomanceCardWidget } from "@/components/widgets/marketing/MarketingPerfomanceCardWidget";
import { SocialMediaPerformanceTable } from "@/components/widgets/marketing/SocialMediaCardPerformance";
import { TotalCampaignWidget } from "@/components/widgets/marketing/TotalCampaignWidget";
import { TotalGeneratedLeads } from "@/components/widgets/marketing/TotalGeneratedLeads";
import { ManualSwappy } from "@/components/widgets/SwappableWidgetsContainer";

interface MarketingRepRepMainPageProps {}

export function MarketingRepRepMainPage({}: MarketingRepRepMainPageProps) {
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
              title: "Conversion Rates",
              children: <ConversionRatesWidget />,
            },
          ]}
        />
        <div className="flex h-full max-h-[480px] w-full gap-4">
          <div className="w-2/3">
            <MarketingPerfomanceCardWidget />
          </div>
          <div className="w-1/3">
            <SentimentalAnalysisCardWidget />
          </div>
        </div>
        <SocialMediaPerformanceTable />
      </div>
    </div>
  );
}
