import { ManualSwappy } from "../widgets/SwappableWidgetsContainer";

import { TotalSupportTicketsWidget } from "../widgets/Support/TotalSupportTicketsWidget";
import { TotalCustomerSatisfaction } from "../widgets/Support/TotalCustomerSatisfaction";
import { OpenTicketsWidget } from "../widgets/Support/OpenTicketsWidgets";
import { TicketsResponseTime } from "../widgets/Support/TicketsResponseTime";
import { TicketTypePieChart } from "../widgets/Support/TicketTypePieChart";
import { OpenTicketsTableWidget } from "../widgets/Support/OpenTicketsTableWidget";
interface MainSupportAnalyticsProps {}

export function MainSupportAnalytics({}: MainSupportAnalyticsProps) {
  return (
    <div className="flex min-h-fit w-full flex-col gap-4 overflow-scroll">
      <ManualSwappy
        sectionKey="MainSupportAnalyticsKeys"
        initialItems={[
          {
            id: "total-support-tickets",
            title: "Total Support Tickets",
            children: <TotalSupportTicketsWidget />,
          },
          {
            id: "customer-satisfaction",
            title: "Customer Satisfaction",
            children: <TotalCustomerSatisfaction />,
          },
          {
            id: "open-tickets",
            title: "Open Tickets",
            children: <OpenTicketsWidget />,
          },
        ]}
      />
      {/* Montly leads trends line graph and leads source pie chart */}
      <div className="flex w-full gap-4">
        <div className="w-2/3">
          <TicketsResponseTime />
        </div>
        <div className="w-1/3">
          {/* TODO when api is available */}
          <TicketTypePieChart />
        </div>
      </div>

      <div>
        <OpenTicketsTableWidget />
      </div>
    </div>
  );
}
