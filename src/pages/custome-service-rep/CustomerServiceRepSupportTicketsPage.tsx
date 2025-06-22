import { AllTicketsTableWidget } from "@/components/widgets/Support/AllTicketsTableWidget";
import { OpenTicketsWidget } from "@/components/widgets/Support/OpenTicketsWidgets";
import { TotalCustomerSatisfaction } from "@/components/widgets/Support/TotalCustomerSatisfaction";
import { TotalSupportTicketsWidget } from "@/components/widgets/Support/TotalSupportTicketsWidget";
import { ManualSwappy } from "@/components/widgets/SwappableWidgetsContainer";

interface CustomerServiceRepSupportTicketsPageProps {}

export function CustomerServiceRepSupportTicketsPage({}: CustomerServiceRepSupportTicketsPageProps) {
  return (
    <div className="flex h-full w-full flex-col items-center">
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
        <AllTicketsTableWidget />
      </div>
    </div>
  );
}
