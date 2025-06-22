import { ManualSwappy } from "../widgets/SwappableWidgetsContainer";
import { TotalSupportTicketsWidget } from "../widgets/Support/TotalSupportTicketsWidget";
import { TotalCustomerSatisfaction } from "../widgets/Support/TotalCustomerSatisfaction";
import { OpenTicketsWidget } from "../widgets/Support/OpenTicketsWidgets";
import { AllTicketsTableWidget } from "../widgets/Support/AllTicketsTableWidget";

interface MainSupportTicketProps {}

export function MainSupportTicket({}: MainSupportTicketProps) {
  return (
    <div className="flex max-h-screen w-full flex-col gap-4">
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
            title: "Total Customer Satisfaction",
            children: <TotalCustomerSatisfaction />,
          },
          {
            id: "open-tickets",
            title: "Open Tickets",
            children: <OpenTicketsWidget />,
          },
        ]}
      />
      {/* open tickets table */}
      <div className="flex w-full gap-4">
        <AllTicketsTableWidget />
      </div>
    </div>
  );
}
