import { OpenTicketsTableWidget } from "@/components/widgets/Support/OpenTicketsTableWidget";
import { OpenTicketsWidget } from "@/components/widgets/Support/OpenTicketsWidgets";
import { TicketsResponseTime } from "@/components/widgets/Support/TicketsResponseTime";
import { TicketTypePieChart } from "@/components/widgets/Support/TicketTypePieChart";
import { TotalCustomerSatisfaction } from "@/components/widgets/Support/TotalCustomerSatisfaction";
import { TotalSupportTicketsWidget } from "@/components/widgets/Support/TotalSupportTicketsWidget";
import { ManualSwappy } from "@/components/widgets/SwappableWidgetsContainer";

interface CustomerServiceRepMainPageProps {}

export function CustomerServiceRepMainPage({}: CustomerServiceRepMainPageProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <div className="flex max-h-screen w-full flex-col gap-4 p-4">
        <ManualSwappy
          sectionKey="MainSupportTicketKeys"
          initialItems={[
            {
              id: "total-support",
              title: "Total Support Tickets",
              children: <TotalSupportTicketsWidget />,
            },
            {
              id: "customer_satisfaction",
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
        <div className="flex w-full gap-4">
          <div className="w-2/3">
            <TicketsResponseTime />
          </div>
          <div className="w-1/3">
            <TicketTypePieChart />
          </div>
        </div>
        <OpenTicketsTableWidget />
      </div>
    </div>
  );
}
