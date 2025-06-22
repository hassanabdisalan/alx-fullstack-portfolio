import { ManualSwappy } from "../widgets/SwappableWidgetsContainer";
import { TotalLeadsWidget } from "../widgets/leads/TotalLeadsWidget";
import { TotalSubscriberWidget } from "../widgets/sales/TotalSubscriberWidget";
import { ConversionRatesWidget } from "../widgets/leads/ConversionRatesWidget";
import { MonthlyLeadTrendsWidget } from "../widgets/leads/MonthlyLeadTrendsWidget";
import { LeadSourcesPieWidget } from "../widgets/leads/LeadSourcesPieWidget";
import { RecentLeadsTableWidget } from "../widgets/leads/RecentLeadsTableWidget";

interface MainLeadsAnalytyticsProps {}



export function MainLeadsAnalytytics({}: MainLeadsAnalytyticsProps) {
  return (
    <div className="flex h-full w-full flex-col gap-4 ">
      <ManualSwappy
        sectionKey="MainLeadsAnalytyticsKeys"
        initialItems={[
          {
            id: "total-leads",
            title: "Total Leads",
            children: <TotalLeadsWidget />,
          },
          {
            id: "subscribers",
            title: "Subscribers",

            children: <TotalSubscriberWidget />,
          },
          {
            id: "conversion-rates",
            title: "Conversion Rates",
            children: <ConversionRatesWidget />,
          },
        ]}
      />
      {/* Montly leads trends line graph and leads source pie chart */}
      <div className="flex w-full gap-4">
        <div className="w-2/3">
          {/* api is connected */}
          <MonthlyLeadTrendsWidget />
        </div>
        <div className="w-1/3">
          {/* TODO when api is available */}
          <LeadSourcesPieWidget />
        </div>
      </div>

      <div>
        {/* api is connected */}
        <RecentLeadsTableWidget />
      </div>
    </div>
  );
}
