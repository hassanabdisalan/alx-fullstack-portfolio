import { CustomerSatisfactionWidget } from "@/components/widgets/customers/CustomerSatisfactionWidget";
import { ConversionRatesWidget } from "@/components/widgets/leads/ConversionRatesWidget";
import { LeadSourcesPieWidget } from "@/components/widgets/leads/LeadSourcesPieWidget";
import { MonthlyLeadTrendsWidget } from "@/components/widgets/leads/MonthlyLeadTrendsWidget";
import { RecentLeadsTableWidget } from "@/components/widgets/leads/RecentLeadsTableWidget";
import { TotalLeadsWidget } from "@/components/widgets/leads/TotalLeadsWidget";
import { TotalSubscriberWidget } from "@/components/widgets/sales/TotalSubscriberWidget";
import { OpenTicketsTableWidget } from "@/components/widgets/Support/OpenTicketsTableWidget";
import { OpenTicketsWidget } from "@/components/widgets/Support/OpenTicketsWidgets";
import { TicketsResponseTime } from "@/components/widgets/Support/TicketsResponseTime";
import { TicketTypePieChart } from "@/components/widgets/Support/TicketTypePieChart";
import { TotalSupportTicketsWidget } from "@/components/widgets/Support/TotalSupportTicketsWidget";
import { ManualSwappy } from "@/components/widgets/SwappableWidgetsContainer";

interface SalesRepRepMainPageProps {}

export function SalesRepRepMainPage({}: SalesRepRepMainPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="flex max-h-screen w-full flex-col gap-4 p-4">
        <ManualSwappy
          sectionKey="MainSupportTicketKeys"
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
        <div className="flex w-full gap-4">
          <div className="w-2/3">
            <MonthlyLeadTrendsWidget />
          </div>
          <div className="w-1/3">
            <LeadSourcesPieWidget />
          </div>
        </div>
        <RecentLeadsTableWidget />
      </div>
    </div>
  );
}
