import { ManualSwappy } from "../widgets/SwappableWidgetsContainer";

import { TotalCampaignWidget } from "../widgets/marketing/TotalCampaignWidget";
import { TotalGeneratedLeads } from "../widgets/marketing/TotalGeneratedLeads";
import { ConversionRatesWidget } from "../widgets/leads/ConversionRatesWidget";
import { MarketingPerfomanceCardWidget } from "../widgets/marketing/MarketingPerfomanceCardWidget";
import { SentimentalAnalysisCardWidget } from "../widgets/customers/SentimentalAnalysisCardWidget";
import { SocialMediaPerformanceTable } from "../widgets/marketing/SocialMediaCardPerformance";

interface MainMarketingAnalyticsProps {}

export function MainMarketingAnalytics({}: MainMarketingAnalyticsProps) {
  return (
    <div className="flex max-h-screen w-full flex-col gap-4">
      <ManualSwappy
        sectionKey="MainLeadsAnalytyticsKeys"
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

      {/* Marketing perfomance and sentimental analysis */}
      <div className="flex h-full w-full gap-4 max-h-[480px]">
        <div className="flex h-full  w-2/3">
          <MarketingPerfomanceCardWidget />
        </div>
        <div className="flex h-full   w-1/3">
          <SentimentalAnalysisCardWidget />
        </div>
      </div>
      <div className="mb-10">
        <SocialMediaPerformanceTable />
      </div>
    </div>
  );
}
